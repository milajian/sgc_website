#!/bin/bash
# 获取阿里云容器镜像服务信息并生成推送配置

set -e

source deploy.config.sh

echo "🔍 获取阿里云容器镜像服务信息"
echo "=============================="
echo ""

# 从服务器获取信息
REGISTRY_INFO=$(ssh -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} bash << 'EOF'
# 获取账号 ID
ACCOUNT_ID=$(curl -s --connect-timeout 3 http://100.100.100.200/latest/meta-data/owner-account-id 2>/dev/null || echo "")

# 使用默认命名空间（从 docker-compose.prod.yml 中的默认值）
NAMESPACE="sgc-website"

echo "ACCOUNT_ID=$ACCOUNT_ID"
echo "NAMESPACE=$NAMESPACE"
EOF
)

# 解析结果
ACCOUNT_ID=$(echo "$REGISTRY_INFO" | grep "ACCOUNT_ID=" | cut -d'=' -f2)
NAMESPACE=$(echo "$REGISTRY_INFO" | grep "NAMESPACE=" | cut -d'=' -f2)

echo "📋 获取到的信息:"
echo "   账号 ID: ${ACCOUNT_ID:-未知}"
echo "   命名空间: ${NAMESPACE:-sgc-website}"
echo "   镜像仓库: registry.cn-shenzhen.aliyuncs.com"
echo ""

# 生成配置文件
CONFIG_FILE=".aliyun-registry.env"
cat > "$CONFIG_FILE" << EOF
# 阿里云容器镜像服务配置
# 生成时间: $(date)

# 账号信息
ALIYUN_ACCOUNT_ID=${ACCOUNT_ID:-}
ALIYUN_REGISTRY=registry.cn-shenzhen.aliyuncs.com
ALIYUN_NAMESPACE=${NAMESPACE:-sgc-website}

# 镜像名称
FRONTEND_IMAGE=\${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-frontend:latest
BACKEND_IMAGE=\${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-backend:latest

# 使用说明:
# 1. 设置您的阿里云账号用户名和密码:
#    export ALIYUN_USERNAME=your-username
#    export ALIYUN_PASSWORD=your-password
#
# 2. 加载配置:
#    source $CONFIG_FILE
#
# 3. 推送镜像:
#    ./push-images.sh
EOF

echo "✅ 配置文件已生成: $CONFIG_FILE"
echo ""
echo "📝 配置内容:"
cat "$CONFIG_FILE"
echo ""
echo "💡 下一步:"
echo "   1. 设置阿里云账号信息:"
echo "      export ALIYUN_USERNAME=your-username"
echo "      export ALIYUN_PASSWORD=your-password"
echo ""
echo "   2. 加载配置并推送镜像:"
echo "      source $CONFIG_FILE"
echo "      ./push-images.sh"
echo ""
echo "   或者手动推送:"
echo "      docker tag sgc-frontend:latest \${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-frontend:latest"
echo "      docker tag sgc-backend:latest \${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-backend:latest"
echo "      docker login \${ALIYUN_REGISTRY} --username=\${ALIYUN_USERNAME}"
echo "      docker push \${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-frontend:latest"
echo "      docker push \${ALIYUN_REGISTRY}/\${ALIYUN_NAMESPACE}/sgc-backend:latest"
