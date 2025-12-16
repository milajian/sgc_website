#!/bin/bash
# 推送 Docker 镜像到阿里云容器镜像服务

set -e

# 配置（请根据实际情况修改）
REGISTRY="registry.cn-shenzhen.aliyuncs.com"
NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"  # 默认命名空间，可通过环境变量覆盖
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
docker tag sgc-frontend:latest ${FRONTEND_IMAGE}:${VERSION}
docker tag sgc-backend:latest ${BACKEND_IMAGE}:${VERSION}

echo "✅ 镜像标记完成"
echo ""

# 登录阿里云容器镜像服务
echo "🔐 登录阿里云容器镜像服务..."
if [ -z "${ALIYUN_USERNAME}" ] || [ -z "${ALIYUN_PASSWORD}" ]; then
    echo "⚠️  未设置环境变量 ALIYUN_USERNAME 和 ALIYUN_PASSWORD"
    echo "请手动登录："
    echo "   docker login ${REGISTRY} --username=<您的阿里云账号>"
    echo ""
    read -p "是否现在登录？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker login ${REGISTRY}
    else
        echo "❌ 取消推送"
        exit 1
    fi
else
    echo "${ALIYUN_PASSWORD}" | docker login ${REGISTRY} --username="${ALIYUN_USERNAME}" --password-stdin
fi

# 推送镜像
echo ""
echo "📤 推送镜像..."
echo "推送前端镜像: ${FRONTEND_IMAGE}:${VERSION}"
docker push ${FRONTEND_IMAGE}:${VERSION}

echo ""
echo "推送后端镜像: ${BACKEND_IMAGE}:${VERSION}"
docker push ${BACKEND_IMAGE}:${VERSION}

echo ""
echo "✅ 所有镜像已成功推送到阿里云容器镜像服务！"
echo ""
echo "📋 镜像信息："
echo "   前端: ${FRONTEND_IMAGE}:${VERSION}"
echo "   后端: ${BACKEND_IMAGE}:${VERSION}"
echo ""
echo "💡 下一步：在服务器上拉取并部署这些镜像"
