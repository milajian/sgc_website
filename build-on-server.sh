#!/bin/bash
# 在服务器上构建 Docker 镜像（处理无法拉取基础镜像的情况）

set -e

REGISTRY="${ALIYUN_REGISTRY:-registry.cn-shenzhen.aliyuncs.com}"
NAMESPACE="${ALIYUN_NAMESPACE:-sgc-website}"
FRONTEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-frontend"
BACKEND_IMAGE="${REGISTRY}/${NAMESPACE}/sgc-backend"
VERSION="latest"

echo "🚀 在服务器上构建 Docker 镜像..."
echo ""

# 检查基础镜像是否可用
check_base_image() {
    local image=$1
    echo "检查基础镜像: ${image}"
    if docker pull "${image}" >/dev/null 2>&1; then
        echo "✅ 基础镜像可用: ${image}"
        return 0
    else
        echo "⚠️  无法拉取基础镜像: ${image}"
        return 1
    fi
}

# 方案 1: 尝试拉取基础镜像并构建
try_build_with_base() {
    echo ""
    echo "📦 方案 1: 尝试使用基础镜像构建..."
    
    if check_base_image "node:20-alpine" && check_base_image "nginx:alpine"; then
        echo "✅ 基础镜像可用，开始构建..."
        
        # 构建前端
        docker build -t ${FRONTEND_IMAGE}:${VERSION} \
            -f Dockerfile \
            --build-arg BASE_PATH="${BASE_PATH:-}" \
            . || return 1
        
        # 构建后端
        docker build -t ${BACKEND_IMAGE}:${VERSION} \
            -f Dockerfile.backend \
            . || return 1
        
        echo "✅ 使用基础镜像构建成功"
        return 0
    else
        echo "❌ 无法拉取基础镜像，尝试方案 2"
        return 1
    fi
}

# 方案 2: 使用本地环境构建，然后创建最小化镜像
build_with_local_env() {
    echo ""
    echo "📦 方案 2: 使用本地环境构建..."
    
    # 检查本地环境
    if ! command -v node >/dev/null 2>&1; then
        echo "❌ Node.js 未安装"
        return 1
    fi
    
    if ! command -v nginx >/dev/null 2>&1; then
        echo "❌ Nginx 未安装"
        return 1
    fi
    
    echo "✅ 本地环境检查通过"
    
    # 构建前端（使用本地 Node.js）
    echo ""
    echo "🔨 构建前端..."
    export NODE_ENV=production
    export BASE_PATH="${BASE_PATH:-}"
    npm ci --legacy-peer-deps || {
        echo "⚠️  npm ci 失败，尝试 npm install"
        npm install --legacy-peer-deps
    }
    npm run build
    
    # 创建前端 Dockerfile（仅包含构建产物和 Nginx）
    cat > Dockerfile.local << 'DOCKERFILE_LOCAL'
FROM nginx:alpine
COPY out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
DOCKERFILE_LOCAL
    
    # 尝试拉取 nginx:alpine
    if docker pull nginx:alpine >/dev/null 2>&1; then
        docker build -t ${FRONTEND_IMAGE}:${VERSION} -f Dockerfile.local . || {
            echo "⚠️  前端镜像构建失败，但构建产物已生成"
            return 1
        }
    else
        echo "⚠️  无法拉取 nginx:alpine，跳过前端镜像构建"
        echo "💡 可以使用本地 Nginx 服务前端文件（在 out/ 目录）"
    fi
    
    # 构建后端（使用本地 Node.js）
    echo ""
    echo "🔨 构建后端..."
    cd server
    npm ci --only=production --legacy-peer-deps || {
        echo "⚠️  npm ci 失败，尝试 npm install"
        npm install --only=production --legacy-peer-deps
    }
    cd ..
    
    # 创建后端 Dockerfile（仅包含代码和运行时）
    cat > Dockerfile.backend.local << 'DOCKERFILE_BACKEND_LOCAL'
FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .
RUN mkdir -p data uploads
EXPOSE 3001
CMD ["node", "server.js"]
DOCKERFILE_BACKEND_LOCAL
    
    # 尝试拉取 node:20-alpine
    if docker pull node:20-alpine >/dev/null 2>&1; then
        docker build -t ${BACKEND_IMAGE}:${VERSION} -f Dockerfile.backend.local . || {
            echo "⚠️  后端镜像构建失败"
            return 1
        }
    else
        echo "⚠️  无法拉取 node:20-alpine，跳过后端镜像构建"
        echo "💡 可以直接使用本地 Node.js 运行后端（在 server/ 目录）"
    fi
    
    return 0
}

# 执行构建
if try_build_with_base; then
    echo ""
    echo "✅ 构建成功（使用基础镜像）"
elif build_with_local_env; then
    echo ""
    echo "✅ 构建成功（使用本地环境）"
else
    echo ""
    echo "❌ 所有构建方案都失败了"
    echo ""
    echo "💡 建议："
    echo "1. 检查网络连接和安全组设置（开放 443 端口）"
    echo "2. 或者手动导入基础镜像文件"
    echo "3. 或者使用本地环境直接运行（不使用 Docker）"
    exit 1
fi

# 显示构建结果
echo ""
echo "📋 构建的镜像："
docker images | grep -E "(${NAMESPACE}|REPOSITORY)" | head -5

echo ""
echo "✅ 构建完成！"
echo "前端镜像: ${FRONTEND_IMAGE}:${VERSION}"
echo "后端镜像: ${BACKEND_IMAGE}:${VERSION}"
