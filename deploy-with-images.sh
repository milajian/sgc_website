#!/bin/bash
# 部署脚本：上传文件到服务器，构建镜像，推送到阿里云，然后部署

set -e

# 加载配置
source deploy.config.sh

# 配置
ALIYUN_REGISTRY="${ALIYUN_REGISTRY:-registry.cn-shenzhen.aliyuncs.com}"
ALIYUN_NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"
DEPLOY_DIR="/tmp/sgc_deploy_$(date +%s)"

echo "🚀 开始部署流程..."
echo "服务器: ${DEPLOY_USER}@${DEPLOY_HOST}"
echo "镜像仓库: ${ALIYUN_REGISTRY}/${ALIYUN_NAMESPACE}"
echo ""

# 1. 创建部署包
echo "📦 创建部署包..."
TEMP_DIR=$(mktemp -d)
cd "$(dirname "$0")"

# 复制必要文件
cp -r . "$TEMP_DIR/sgc_website" 2>/dev/null || {
    echo "❌ 无法复制文件，请检查权限"
    exit 1
}

cd "$TEMP_DIR"
tar czf sgc_deploy.tar.gz sgc_website/

# 2. 上传到服务器
echo "📤 上传文件到服务器..."
scp -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no \
    sgc_deploy.tar.gz \
    ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/

# 3. 在服务器上执行构建和部署
echo "🔧 在服务器上构建和部署..."
ssh -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no \
    ${DEPLOY_USER}@${DEPLOY_HOST} bash << EOF
set -e

# 解压文件
cd /tmp
rm -rf ${DEPLOY_DIR}
mkdir -p ${DEPLOY_DIR}
tar xzf sgc_deploy.tar.gz -C ${DEPLOY_DIR} --strip-components=1
cd ${DEPLOY_DIR}

# 检查 Docker
if ! command -v docker >/dev/null 2>&1; then
    echo "❌ Docker 未安装"
    exit 1
fi

# 设置环境变量
export ALIYUN_REGISTRY="${ALIYUN_REGISTRY}"
export ALIYUN_NAMESPACE="${ALIYUN_NAMESPACE}"
export BASE_PATH="${BASE_PATH:-}"

# 构建镜像
echo "📦 构建 Docker 镜像..."
chmod +x build-and-push.sh

# 如果设置了阿里云凭证，使用它们
if [ -n "${ALIYUN_USERNAME}" ] && [ -n "${ALIYUN_PASSWORD}" ]; then
    export ALIYUN_USERNAME="${ALIYUN_USERNAME}"
    export ALIYUN_PASSWORD="${ALIYUN_PASSWORD}"
fi

# 执行构建脚本（如果登录失败，会提示手动登录）
./build-and-push.sh || {
    echo "⚠️  构建或推送失败，请检查错误信息"
    echo "如果需要手动登录，请执行："
    echo "   docker login ${ALIYUN_REGISTRY}"
    exit 1
}

# 停止旧服务
echo "🛑 停止旧服务..."
cd ${DEPLOY_DIR}
if [ -f docker-compose.yml ]; then
    docker-compose down 2>/dev/null || true
fi

# 使用生产配置启动
echo "🚀 启动新服务..."
cp docker-compose.prod.yml docker-compose.yml
export ALIYUN_REGISTRY="${ALIYUN_REGISTRY}"
export ALIYUN_NAMESPACE="${ALIYUN_NAMESPACE}"
docker-compose pull
docker-compose up -d

# 检查服务状态
echo ""
echo "📋 服务状态："
docker-compose ps

echo ""
echo "✅ 部署完成！"
echo "前端访问: http://${DEPLOY_HOST}"
echo "后端 API: http://${DEPLOY_HOST}:3001"
EOF

# 清理临时文件
rm -rf "$TEMP_DIR"

echo ""
echo "✅ 部署流程完成！"
