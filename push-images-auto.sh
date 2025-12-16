#!/bin/bash
# 自动推送 Docker 镜像到阿里云容器镜像服务（非交互式）

set -e

# 加载配置
if [ -f .aliyun-registry.env ]; then
    source .aliyun-registry.env
fi

REGISTRY="${ALIYUN_REGISTRY:-registry.cn-shenzhen.aliyuncs.com}"
NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"
FRONTEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-frontend"
BACKEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-backend"
VERSION="latest"

echo "🚀 推送 Docker 镜像到阿里云容器镜像服务"
echo "=========================================="
echo ""
echo "镜像仓库: ${REGISTRY}"
echo "命名空间: ${NAMESPACE}"
echo ""

# 检查镜像是否存在
if ! docker images | grep -q "sgc-frontend.*latest"; then
    echo "❌ 前端镜像不存在，请先构建"
    exit 1
fi

if ! docker images | grep -q "sgc-backend.*latest"; then
    echo "❌ 后端镜像不存在，请先构建"
    exit 1
fi

# 标记镜像
echo "📦 标记镜像..."
docker tag sgc-frontend:latest ${FRONTEND_IMAGE}:${VERSION} || echo "前端镜像标记失败或已存在"
docker tag sgc-backend:latest ${BACKEND_IMAGE}:${VERSION} || echo "后端镜像标记失败或已存在"

echo "✅ 镜像标记完成"
echo ""

# 检查登录状态
echo "🔐 检查登录状态..."
if docker info 2>/dev/null | grep -q "${REGISTRY}"; then
    echo "✅ 已登录"
else
    echo "⚠️  需要登录阿里云容器镜像服务"
    if [ -z "${ALIYUN_USERNAME}" ] || [ -z "${ALIYUN_PASSWORD}" ]; then
        echo ""
        echo "❌ 未设置环境变量 ALIYUN_USERNAME 和 ALIYUN_PASSWORD"
        echo ""
        echo "请设置环境变量后重试："
        echo "   export ALIYUN_USERNAME=your-username"
        echo "   export ALIYUN_PASSWORD=your-password"
        echo "   ./push-images-auto.sh"
        echo ""
        echo "或者手动登录："
        echo "   docker login ${REGISTRY} --username=<您的阿里云账号>"
        echo "   然后再次运行此脚本"
        exit 1
    else
        echo "使用环境变量登录..."
        echo "${ALIYUN_PASSWORD}" | docker login ${REGISTRY} --username="${ALIYUN_USERNAME}" --password-stdin
    fi
fi

# 推送镜像
echo ""
echo "📤 推送镜像..."
echo "推送前端镜像: ${FRONTEND_IMAGE}:${VERSION}"
docker push ${FRONTEND_IMAGE}:${VERSION} || {
    echo "❌ 前端镜像推送失败"
    exit 1
}

echo ""
echo "推送后端镜像: ${BACKEND_IMAGE}:${VERSION}"
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
echo "💡 下一步：在服务器上拉取并部署这些镜像"

