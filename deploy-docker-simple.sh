#!/bin/bash
# Docker 部署脚本（简化版）

set -e

# 加载配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/deploy.config.sh"

echo "🚀 开始 Docker 部署到生产服务器..."
echo "服务器: $DEPLOY_USER@$DEPLOY_HOST"
echo ""

# 检查必要文件
for file in Dockerfile Dockerfile.backend docker-compose.yml nginx.conf; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误: 找不到文件 $file"
        exit 1
    fi
done

# 创建临时目录
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo "📦 准备部署文件..."

# 复制必要文件
cp Dockerfile Dockerfile.backend docker-compose.yml nginx.conf .dockerignore "$TEMP_DIR/"
cp package*.json "$TEMP_DIR/"
cp -r server "$TEMP_DIR/"
cp -r app components lib public "$TEMP_DIR/"
cp -r hooks scripts 2>/dev/null || true
cp next.config.js tsconfig.json tailwind.config.ts "$TEMP_DIR/"
cp postcss.config.js components.json eslint.config.js 2>/dev/null || true
cp clean-build-output.sh "$TEMP_DIR/"
chmod +x "$TEMP_DIR/clean-build-output.sh"

# 创建部署包
cd "$TEMP_DIR"
tar czf /tmp/sgc-docker-deploy.tar.gz .

echo "⬆️  上传文件到服务器..."
echo "请输入服务器密码:"

# 上传文件
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    /tmp/sgc-docker-deploy.tar.gz \
    $DEPLOY_USER@$DEPLOY_HOST:/tmp/

# 执行部署命令
echo "🔨 在服务器上执行部署..."
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    $DEPLOY_USER@$DEPLOY_HOST << 'DEPLOY_SCRIPT'
    set -e
    
    REMOTE_DIR="/var/www/sgc_website/docker"
    mkdir -p "$REMOTE_DIR"
    cd "$REMOTE_DIR"
    
    # 解压文件
    tar xzf /tmp/sgc-docker-deploy.tar.gz
    rm /tmp/sgc-docker-deploy.tar.gz
    
    # 检查并安装 Docker
    if ! command -v docker >/dev/null 2>&1; then
        echo "📥 安装 Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl start docker
        systemctl enable docker
        rm get-docker.sh
    fi
    
    # 检查 Docker Compose
    if ! docker compose version >/dev/null 2>&1; then
        echo "📥 安装 Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
        ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    fi
    
    # 停止旧服务
    echo "🛑 停止旧服务..."
    docker compose down 2>/dev/null || true
    
    # 构建并启动
    echo "🔨 构建并启动服务..."
    docker compose up -d --build
    
    # 等待服务启动
    sleep 5
    
    # 显示状态
    echo ""
    echo "📊 服务状态:"
    docker compose ps
    
    echo ""
    echo "📝 最近日志:"
    docker compose logs --tail=30
DEPLOY_SCRIPT

rm -f /tmp/sgc-docker-deploy.tar.gz

echo ""
echo "✅ 部署完成！"
echo "🌐 前端访问: http://$DEPLOY_HOST"
echo "🔧 后端 API: http://$DEPLOY_HOST:3001"
echo ""
echo "查看日志: ssh $DEPLOY_USER@$DEPLOY_HOST 'cd /var/www/sgc_website/docker && docker compose logs -f'"
