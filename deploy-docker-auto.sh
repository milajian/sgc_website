#!/bin/bash
# Docker 自动部署脚本（使用 expect）

set -e

# 加载配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/deploy.config.sh"

# 检查 expect
if ! command -v expect &> /dev/null; then
    echo "❌ 错误: 未安装 expect，请先安装: brew install expect"
    exit 1
fi

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

# 使用 expect 上传文件
expect <<EOF
set timeout 300
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /tmp/sgc-docker-deploy.tar.gz $DEPLOY_USER@$DEPLOY_HOST:/tmp/
expect {
    "password:" {
        send -- "$DEPLOY_PASSWORD\r"
        exp_continue
    }
    "Password:" {
        send -- "$DEPLOY_PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF

echo "🔨 在服务器上执行部署..."

# 使用 expect 执行部署命令
expect <<'DEPLOY_EXPECT'
set timeout 600
set DEPLOY_USER $env(DEPLOY_USER)
set DEPLOY_HOST $env(DEPLOY_HOST)
set DEPLOY_PASSWORD $env(DEPLOY_PASSWORD)

spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $DEPLOY_USER@$DEPLOY_HOST bash
expect {
    "password:" {
        send -- "$DEPLOY_PASSWORD\r"
        exp_continue
    }
    "Password:" {
        send -- "$DEPLOY_PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    "$ " {
        send "set -e\r"
        expect "$ "
        send "REMOTE_DIR=\"/var/www/sgc_website/docker\"\r"
        expect "$ "
        send "mkdir -p \"\$REMOTE_DIR\"\r"
        expect "$ "
        send "cd \"\$REMOTE_DIR\"\r"
        expect "$ "
        send "tar xzf /tmp/sgc-docker-deploy.tar.gz\r"
        expect "$ "
        send "rm /tmp/sgc-docker-deploy.tar.gz\r"
        expect "$ "
        send "if ! command -v docker >/dev/null 2>&1; then curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && systemctl start docker && systemctl enable docker && rm get-docker.sh; fi\r"
        expect "$ "
        send "if ! docker compose version >/dev/null 2>&1; then curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose && ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose; fi\r"
        expect "$ "
        send "docker compose down 2>/dev/null || true\r"
        expect "$ "
        send "docker compose up -d --build\r"
        expect "$ "
        send "sleep 5\r"
        expect "$ "
        send "docker compose ps\r"
        expect "$ "
        send "docker compose logs --tail=30\r"
        expect "$ "
        send "exit\r"
        expect eof
    }
    eof
}
DEPLOY_EXPECT

rm -f /tmp/sgc-docker-deploy.tar.gz

echo ""
echo "✅ 部署完成！"
echo "🌐 前端访问: http://$DEPLOY_HOST"
echo "🔧 后端 API: http://$DEPLOY_HOST:3001"
