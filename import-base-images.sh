#!/bin/bash
# 导入基础镜像到服务器的辅助脚本
# 使用方法：
# 1. 在有 Docker 的环境中运行此脚本下载和导出镜像
# 2. 脚本会自动上传到服务器并导入

set -e

# 加载配置
if [ -f deploy.config.sh ]; then
    source deploy.config.sh
else
    echo "❌ 未找到 deploy.config.sh，请先配置服务器信息"
    exit 1
fi

echo "🚀 基础镜像导入脚本"
echo "===================="
echo ""

# 检查 Docker
if ! command -v docker >/dev/null 2>&1; then
    echo "❌ Docker 未安装，无法下载镜像"
    echo ""
    echo "💡 替代方案："
    echo "1. 在其他有 Docker 的机器上下载镜像"
    echo "2. 手动执行以下命令："
    echo "   docker pull node:20-alpine"
    echo "   docker pull nginx:alpine"
    echo "   docker save node:20-alpine -o node-20-alpine.tar"
    echo "   docker save nginx:alpine -o nginx-alpine.tar"
    echo "3. 然后上传到服务器："
    echo "   scp -i ~/.ssh/id_rsa_sgc node-20-alpine.tar nginx-alpine.tar ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/"
    exit 1
fi

# 1. 下载基础镜像
echo "📥 下载基础镜像..."
docker pull node:20-alpine || {
    echo "❌ 无法下载 node:20-alpine"
    exit 1
}

docker pull nginx:alpine || {
    echo "❌ 无法下载 nginx:alpine"
    exit 1
}

echo "✅ 基础镜像下载完成"
echo ""

# 2. 导出镜像
echo "📦 导出镜像为 tar 文件..."
docker save node:20-alpine -o node-20-alpine.tar
docker save nginx:alpine -o nginx-alpine.tar

echo "✅ 镜像导出完成"
echo "文件大小:"
ls -lh node-20-alpine.tar nginx-alpine.tar
echo ""

# 3. 上传到服务器
echo "📤 上传镜像到服务器..."
scp -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no \
    node-20-alpine.tar nginx-alpine.tar \
    ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/ || {
    echo "❌ 上传失败"
    exit 1
}

echo "✅ 镜像上传完成"
echo ""

# 4. 在服务器上导入镜像
echo "🔧 在服务器上导入镜像..."
ssh -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no \
    ${DEPLOY_USER}@${DEPLOY_HOST} bash << 'EOF'
set -e

echo "导入 node:20-alpine..."
docker load -i /tmp/node-20-alpine.tar

echo "导入 nginx:alpine..."
docker load -i /tmp/nginx-alpine.tar

echo ""
echo "✅ 镜像导入完成"
echo ""
echo "📋 已导入的镜像:"
docker images | grep -E "(node|nginx|REPOSITORY)" | head -5

# 清理临时文件
rm -f /tmp/node-20-alpine.tar /tmp/nginx-alpine.tar
EOF

# 5. 清理本地临时文件
echo ""
echo "🧹 清理本地临时文件..."
rm -f node-20-alpine.tar nginx-alpine.tar

echo ""
echo "✅ 基础镜像导入完成！"
echo ""
echo "💡 下一步："
echo "1. 在服务器上执行构建："
echo "   cd /tmp/sgc_build_*"
echo "   export BASE_PATH=\"\""
echo "   export ALIYUN_REGISTRY=\"registry.cn-shenzhen.aliyuncs.com\""
echo "   export ALIYUN_NAMESPACE=\"sgc-website\""
echo "   ./build-on-server.sh"
echo ""
echo "2. 构建完成后推送到阿里云并部署"
