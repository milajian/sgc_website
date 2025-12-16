#!/bin/bash
# 在服务器上构建并推送 Docker 镜像到阿里云容器镜像服务

set -e

# 配置
REGISTRY="registry.cn-shenzhen.aliyuncs.com"
NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"  # 默认命名空间，可通过环境变量覆盖
FRONTEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-frontend"
BACKEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-backend"
VERSION="latest"

echo "🚀 开始构建 Docker 镜像..."
echo "镜像仓库: ${REGISTRY}"
echo "命名空间: ${NAMESPACE}"
echo ""

# 检查 Docker 是否运行
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker 未运行，请先启动 Docker"
    exit 1
fi

# 1. 构建前端镜像
echo "📦 构建前端镜像..."
docker build \
    -t ${FRONTEND_IMAGE}:${VERSION} \
    -f Dockerfile \
    --build-arg BASE_PATH="${BASE_PATH:-}" \
    .

echo "✅ 前端镜像构建完成: ${FRONTEND_IMAGE}:${VERSION}"

# 2. 构建后端镜像
echo ""
echo "📦 构建后端镜像..."
docker build \
    -t ${BACKEND_IMAGE}:${VERSION} \
    -f Dockerfile.backend \
    .

echo "✅ 后端镜像构建完成: ${BACKEND_IMAGE}:${VERSION}"

# 3. 登录阿里云容器镜像服务（如果需要）
echo ""
echo "🔐 检查阿里云镜像服务登录状态..."
if ! docker login ${REGISTRY} --username="${ALIYUN_USERNAME}" --password="${ALIYUN_PASSWORD}" 2>/dev/null; then
    echo "⚠️  登录失败，请手动登录："
    echo "   docker login ${REGISTRY} --username=<您的阿里云账号>"
    echo ""
    echo "或者设置环境变量："
    echo "   export ALIYUN_USERNAME=<您的阿里云账号>"
    echo "   export ALIYUN_PASSWORD=<您的密码或访问令牌>"
    echo ""
    read -p "是否跳过登录，仅构建镜像？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 4. 推送镜像
echo ""
echo "📤 推送镜像到阿里云容器镜像服务..."

echo "推送前端镜像..."
docker push ${FRONTEND_IMAGE}:${VERSION} || {
    echo "❌ 前端镜像推送失败"
    exit 1
}

echo "推送后端镜像..."
docker push ${BACKEND_IMAGE}:${VERSION} || {
    echo "❌ 后端镜像推送失败"
    exit 1
}

echo ""
echo "✅ 所有镜像已成功推送到阿里云容器镜像服务！"
echo ""
echo "📋 镜像信息："
echo "   前端: ${FRONTEND_IMAGE}:${VERSION}"
echo "   后端: ${BACKEND_IMAGE}:${VERSION}"
echo ""
echo "💡 下一步：更新 docker-compose.yml 使用这些镜像"
