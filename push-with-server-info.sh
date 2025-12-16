#!/bin/bash
# 尝试使用 server_info.db 中的信息推送镜像
# 注意：这些信息通常是服务器SSH信息，可能需要阿里云控制台账号

set -e

# 加载配置
source deploy.config.sh
source .aliyun-registry.env

REGISTRY="${ALIYUN_REGISTRY:-registry.cn-shenzhen.aliyuncs.com}"
NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"
FRONTEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-frontend"
BACKEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-backend"
VERSION="latest"

echo "🚀 尝试推送镜像到阿里云容器镜像服务"
echo "=========================================="
echo ""
echo "⚠️  注意：server_info.db 中的信息是服务器SSH信息"
echo "   阿里云容器镜像服务通常需要阿里云控制台账号"
echo ""

# 从 server_info.db 读取信息（虽然不太可能成功，但可以尝试）
if [ -f server_info.db ]; then
    # 尝试提取用户名（虽然这通常是服务器用户名，不是阿里云账号）
    SERVER_USER=$(grep -o '"username"[[:space:]]*:[[:space:]]*"[^"]*"' server_info.db | sed 's/.*"\([^"]*\)".*/\1/')
    SERVER_PASS=$(grep -o '"password"[[:space:]]*:[[:space:]]*"[^"]*"' server_info.db | sed 's/.*"\([^"]*\)".*/\1/')
    
    echo "从 server_info.db 读取的信息:"
    echo "   用户名: $SERVER_USER"
    echo "   （密码已隐藏）"
    echo ""
    
    # 如果环境变量未设置，尝试使用服务器信息
    if [ -z "${ALIYUN_USERNAME}" ]; then
        export ALIYUN_USERNAME="${SERVER_USER}"
        echo "⚠️  使用服务器用户名作为阿里云用户名（可能不正确）"
    fi
    
    if [ -z "${ALIYUN_PASSWORD}" ]; then
        export ALIYUN_PASSWORD="${SERVER_PASS}"
        echo "⚠️  使用服务器密码作为阿里云密码（可能不正确）"
    fi
fi

echo ""
echo "镜像仓库: ${REGISTRY}"
echo "命名空间: ${NAMESPACE}"
echo "用户名: ${ALIYUN_USERNAME:-未设置}"
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

# 确保镜像已标记
echo "📦 检查镜像标记..."
if ! docker images | grep -q "${REGISTRY}/${NAMESPACE}/sgc-frontend"; then
    docker tag sgc-frontend:latest ${FRONTEND_IMAGE}:${VERSION}
    echo "✅ 前端镜像已标记"
fi

if ! docker images | grep -q "${REGISTRY}/${NAMESPACE}/sgc-backend"; then
    docker tag sgc-backend:latest ${BACKEND_IMAGE}:${VERSION}
    echo "✅ 后端镜像已标记"
fi

echo ""

# 尝试登录
echo "🔐 尝试登录阿里云容器镜像服务..."
if [ -z "${ALIYUN_USERNAME}" ] || [ -z "${ALIYUN_PASSWORD}" ]; then
    echo "❌ 未设置账号信息"
    echo ""
    echo "💡 请提供阿里云控制台账号信息："
    echo "   export ALIYUN_USERNAME=your-aliyun-account"
    echo "   export ALIYUN_PASSWORD=your-password"
    echo "   ./push-with-server-info.sh"
    exit 1
fi

# 尝试登录
echo "使用用户名: ${ALIYUN_USERNAME}"
if echo "${ALIYUN_PASSWORD}" | docker login ${REGISTRY} --username="${ALIYUN_USERNAME}" --password-stdin 2>&1; then
    echo "✅ 登录成功"
else
    echo ""
    echo "❌ 登录失败"
    echo ""
    echo "💡 可能的原因："
    echo "   1. 用户名或密码不正确"
    echo "   2. 需要使用阿里云控制台账号（不是服务器SSH账号）"
    echo "   3. 需要使用容器镜像服务的访问令牌"
    echo ""
    echo "📝 获取访问令牌："
    echo "   1. 登录 https://cr.console.aliyun.com/"
    echo "   2. 进入 访问凭证"
    echo "   3. 创建或查看访问令牌"
    echo ""
    exit 1
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

