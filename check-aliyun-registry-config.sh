#!/bin/bash
# 检查服务器上的阿里云容器镜像服务配置

set -e

# 加载配置
source deploy.config.sh

echo "🔍 检查服务器上的阿里云容器镜像服务配置"
echo "=========================================="
echo ""
echo "服务器: ${DEPLOY_USER}@${DEPLOY_HOST}"
echo ""

# 通过 SSH 执行检查
ssh -i ~/.ssh/id_rsa_sgc -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} bash << 'EOF'
set -e

echo "📋 检查结果："
echo ""

# 1. 检查 Docker 登录凭证
echo "1️⃣  Docker 登录凭证:"
if [ -f ~/.docker/config.json ]; then
    echo "   ✅ Docker 配置文件存在"
    echo ""
    echo "   阿里云镜像服务配置:"
    if grep -q "registry.cn-hangzhou.aliyuncs.com" ~/.docker/config.json; then
        # 提取用户名（不显示完整密码）
        cat ~/.docker/config.json | grep -A 10 "registry.cn-hangzhou.aliyuncs.com" | grep -E "auth|username" | head -2 | sed 's/.*"\([^"]*\)".*/   \1/' || echo "   未找到用户名"
        echo "   ✅ 已配置阿里云镜像服务登录"
    else
        echo "   ❌ 未找到阿里云镜像服务配置"
    fi
else
    echo "   ❌ Docker 配置文件不存在"
fi

echo ""

# 2. 检查环境变量
echo "2️⃣  环境变量:"
ALIYUN_VARS=$(env | grep -iE "ALIYUN|NAMESPACE|REGISTRY" || echo "")
if [ -n "$ALIYUN_VARS" ]; then
    echo "$ALIYUN_VARS" | while read line; do
        # 隐藏敏感信息
        if echo "$line" | grep -qi "password\|secret\|token"; then
            key=$(echo "$line" | cut -d'=' -f1)
            echo "   $key=***"
        else
            echo "   $line"
        fi
    done
else
    echo "   ❌ 未找到相关环境变量"
fi

echo ""

# 3. 检查配置文件
echo "3️⃣  配置文件:"
CONFIG_FILES=$(find /root /home -maxdepth 3 -type f \( -name "*aliyun*" -o -name "*registry*" -o -name "*docker*config*" \) 2>/dev/null | head -10)
if [ -n "$CONFIG_FILES" ]; then
    echo "   找到配置文件:"
    echo "$CONFIG_FILES" | while read file; do
        echo "   - $file"
    done
else
    echo "   ❌ 未找到相关配置文件"
fi

echo ""

# 4. 检查 Docker daemon 配置
echo "4️⃣  Docker daemon 配置:"
if [ -f /etc/docker/daemon.json ]; then
    echo "   ✅ Docker daemon 配置文件存在"
    echo ""
    echo "   镜像仓库配置:"
    cat /etc/docker/daemon.json | grep -A 5 "registry-mirrors" | sed 's/^/   /' || echo "   未配置镜像加速器"
else
    echo "   ❌ Docker daemon 配置文件不存在"
fi

echo ""

# 5. 检查已有的阿里云镜像
echo "5️⃣  已有的阿里云镜像:"
ALIYUN_IMAGES=$(docker images 2>/dev/null | grep "registry.cn-hangzhou.aliyuncs.com" | head -10 || echo "")
if [ -n "$ALIYUN_IMAGES" ]; then
    echo "   找到以下镜像:"
    echo "$ALIYUN_IMAGES" | while read line; do
        # 提取命名空间信息
        namespace=$(echo "$line" | awk '{print $1}' | cut -d'/' -f2)
        if [ -n "$namespace" ]; then
            echo "   - 命名空间: $namespace"
            echo "     镜像: $line"
        fi
    done | head -20
else
    echo "   ❌ 未找到阿里云镜像"
fi

echo ""

# 6. 检查阿里云 ECS 元数据
echo "6️⃣  阿里云 ECS 元数据:"
INSTANCE_ID=$(curl -s --connect-timeout 3 http://100.100.100.200/latest/meta-data/instance-id 2>/dev/null || echo "")
if [ -n "$INSTANCE_ID" ]; then
    echo "   ✅ 可以访问元数据服务"
    echo "   实例 ID: $INSTANCE_ID"
    
    REGION=$(curl -s --connect-timeout 3 http://100.100.100.200/latest/meta-data/region-id 2>/dev/null || echo "")
    if [ -n "$REGION" ]; then
        echo "   区域: $REGION"
    fi
    
    ZONE=$(curl -s --connect-timeout 3 http://100.100.100.200/latest/meta-data/zone-id 2>/dev/null || echo "")
    if [ -n "$ZONE" ]; then
        echo "   可用区: $ZONE"
    fi
    
    # 尝试获取账号 ID（通常不可用，但可以试试）
    OWNER_ID=$(curl -s --connect-timeout 3 http://100.100.100.200/latest/meta-data/owner-account-id 2>/dev/null || echo "")
    if [ -n "$OWNER_ID" ]; then
        echo "   账号 ID: $OWNER_ID"
    fi
else
    echo "   ❌ 无法访问元数据服务"
fi

echo ""

# 7. 检查是否有 docker-compose 配置文件
echo "7️⃣  Docker Compose 配置:"
COMPOSE_FILES=$(find /root /home /tmp -maxdepth 3 -name "docker-compose*.yml" -o -name "docker-compose*.yaml" 2>/dev/null | head -5)
if [ -n "$COMPOSE_FILES" ]; then
    echo "   找到 Docker Compose 文件:"
    echo "$COMPOSE_FILES" | while read file; do
        echo "   - $file"
        # 检查是否包含阿里云镜像配置
        if grep -q "registry.cn-hangzhou.aliyuncs.com" "$file" 2>/dev/null; then
            echo "     ✅ 包含阿里云镜像配置"
            # 提取命名空间
            namespace=$(grep "registry.cn-hangzhou.aliyuncs.com" "$file" | head -1 | sed 's/.*\/\([^/]*\)\/.*/\1/' | head -1)
            if [ -n "$namespace" ]; then
                echo "     命名空间: $namespace"
            fi
        fi
    done
else
    echo "   ❌ 未找到 Docker Compose 文件"
fi

echo ""
echo "=========================================="
echo "📋 总结:"
echo ""

# 汇总找到的信息
FOUND_NAMESPACE=""
FOUND_USERNAME=""

# 从镜像中提取命名空间
if docker images 2>/dev/null | grep -q "registry.cn-hangzhou.aliyuncs.com"; then
    FOUND_NAMESPACE=$(docker images 2>/dev/null | grep "registry.cn-hangzhou.aliyuncs.com" | head -1 | awk '{print $1}' | cut -d'/' -f2)
fi

# 从 docker-compose 文件中提取命名空间
if [ -z "$FOUND_NAMESPACE" ]; then
    for file in $COMPOSE_FILES; do
        if [ -f "$file" ] && grep -q "registry.cn-hangzhou.aliyuncs.com" "$file"; then
            FOUND_NAMESPACE=$(grep "registry.cn-hangzhou.aliyuncs.com" "$file" | head -1 | sed 's/.*\/\([^/]*\)\/.*/\1/' | head -1)
            break
        fi
    done
fi

if [ -n "$FOUND_NAMESPACE" ]; then
    echo "✅ 找到命名空间: $FOUND_NAMESPACE"
else
    echo "❌ 未找到命名空间"
    echo "💡 建议："
    echo "   1. 登录阿里云控制台 -> 容器镜像服务 -> 命名空间"
    echo "   2. 创建或查看现有命名空间"
    echo "   3. 或使用默认命名空间 'sgc-website'"
fi

echo ""
echo "💡 下一步操作:"
echo "   1. 如果找到命名空间，可以使用该命名空间推送镜像"
echo "   2. 如果未找到，需要："
echo "      - 登录阿里云控制台创建命名空间"
echo "      - 或使用默认命名空间进行测试"
echo "   3. 推送镜像需要阿里云账号和密码/访问令牌"
EOF

echo ""
echo "✅ 检查完成！"
