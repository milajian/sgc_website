#!/bin/bash
# 修复404页面问题脚本
# 重新构建并部署404页面

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}修复404页面问题${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 从 deploy.config.sh 读取配置（如果存在）
if [ -f "./deploy.config.sh" ]; then
    source ./deploy.config.sh
else
    DEPLOY_USER="${DEPLOY_USER:-root}"
    DEPLOY_HOST="${DEPLOY_HOST:-47.106.73.160}"
    DEPLOY_PASSWORD="${DEPLOY_PASSWORD:-}"
fi

REMOTE_DIST_DIR="/var/www/sgc_website/dist"
LOCAL_BUILD_DIR="./out"

# SSH执行函数
exec_ssh() {
    if [ -n "$DEPLOY_PASSWORD" ]; then
        sshpass -p "$DEPLOY_PASSWORD" ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
    else
        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
    fi
}

# SCP复制函数
exec_scp() {
    local src="$1"
    local dest="$2"
    if [ -n "$DEPLOY_PASSWORD" ]; then
        sshpass -p "$DEPLOY_PASSWORD" scp -o StrictHostKeyChecking=no "$src" ${DEPLOY_USER}@${DEPLOY_HOST}:"$dest"
    else
        scp -o StrictHostKeyChecking=no "$src" ${DEPLOY_USER}@${DEPLOY_HOST}:"$dest"
    fi
}

# 1. 检查本地文件
echo -e "${YELLOW}步骤 1: 检查本地文件...${NC}"
if [ ! -f "app/not-found.tsx" ]; then
    echo -e "${RED}✗ app/not-found.tsx 不存在${NC}"
    exit 1
fi

# 检查not-found.tsx是否使用了Link组件
if grep -q "from 'next/link'" app/not-found.tsx || grep -q 'from "next/link"' app/not-found.tsx; then
    echo -e "${GREEN}✓ not-found.tsx 使用了Link组件${NC}"
else
    echo -e "${RED}✗ not-found.tsx 未使用Link组件，需要修复${NC}"
    exit 1
fi

# 检查是否有硬编码路径
if grep -q "/sgc_website/" app/not-found.tsx; then
    echo -e "${RED}✗ not-found.tsx 包含硬编码路径，需要修复${NC}"
    exit 1
else
    echo -e "${GREEN}✓ not-found.tsx 没有硬编码路径${NC}"
fi

echo ""

# 2. 清理旧的构建
echo -e "${YELLOW}步骤 2: 清理旧的构建...${NC}"
if [ -d "$LOCAL_BUILD_DIR" ]; then
    rm -rf "$LOCAL_BUILD_DIR"
    echo -e "${GREEN}✓ 已清理旧的构建输出${NC}"
fi

if [ -d ".next" ]; then
    rm -rf .next
    echo -e "${GREEN}✓ 已清理.next目录${NC}"
fi

echo ""

# 3. 重新构建
echo -e "${YELLOW}步骤 3: 重新构建项目...${NC}"
echo -e "   使用 BASE_PATH= 确保IP地址部署时路径正确"
echo ""

# 检查是否有node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}安装依赖...${NC}"
    npm install
fi

# 构建项目
BASE_PATH= NEXT_PUBLIC_BASE_PATH= NODE_ENV=production npm run build

if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    echo -e "${RED}✗ 构建失败: 输出目录不存在${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 构建完成${NC}"

# 检查404.html是否生成
if [ ! -f "${LOCAL_BUILD_DIR}/404.html" ]; then
    echo -e "${RED}✗ 404.html 未生成${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 404.html 已生成${NC}"

# 验证404.html内容
if grep -q "Return to Home" "${LOCAL_BUILD_DIR}/404.html"; then
    echo -e "${GREEN}✓ 404.html 包含返回首页链接${NC}"
else
    echo -e "${RED}✗ 404.html 缺少返回首页链接${NC}"
    exit 1
fi

# 检查是否有硬编码路径
if grep -q "/sgc_website/" "${LOCAL_BUILD_DIR}/404.html"; then
    echo -e "${RED}✗ 警告: 404.html 仍然包含硬编码路径${NC}"
    echo -e "${YELLOW}  请检查 app/not-found.tsx 文件${NC}"
else
    echo -e "${GREEN}✓ 404.html 没有硬编码路径${NC}"
fi

echo ""

# 4. 部署到服务器
echo -e "${YELLOW}步骤 4: 部署404.html到服务器...${NC}"
echo -e "   服务器: ${DEPLOY_USER}@${DEPLOY_HOST}"
echo -e "   目标目录: ${REMOTE_DIST_DIR}"
echo ""

# 检查服务器连接
if ! exec_ssh "echo '连接测试'" > /dev/null 2>&1; then
    echo -e "${RED}✗ 无法连接到服务器${NC}"
    exit 1
fi

# 确保目标目录存在
if ! exec_ssh "test -d ${REMOTE_DIST_DIR}" 2>/dev/null; then
    echo -e "${YELLOW}创建目标目录...${NC}"
    exec_ssh "mkdir -p ${REMOTE_DIST_DIR}"
fi

# 备份旧的404.html（如果存在）
if exec_ssh "test -f ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
    echo -e "${YELLOW}备份旧的404.html...${NC}"
    exec_ssh "cp ${REMOTE_DIST_DIR}/404.html ${REMOTE_DIST_DIR}/404.html.backup.$(date +%Y%m%d_%H%M%S)"
fi

# 复制404.html到服务器
echo -e "${YELLOW}复制404.html到服务器...${NC}"
exec_scp "${LOCAL_BUILD_DIR}/404.html" "${REMOTE_DIST_DIR}/404.html"

# 验证文件已复制
if exec_ssh "test -f ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
    echo -e "${GREEN}✓ 404.html 已成功部署${NC}"
    
    # 显示文件信息
    FILE_INFO=$(exec_ssh "ls -lh ${REMOTE_DIST_DIR}/404.html" 2>/dev/null)
    echo -e "   文件信息: $FILE_INFO"
else
    echo -e "${RED}✗ 404.html 部署失败${NC}"
    exit 1
fi

echo ""

# 5. 测试404页面
echo -e "${YELLOW}步骤 5: 测试404页面...${NC}"
TEST_URL="http://${DEPLOY_HOST}/nonexistent-test-$(date +%s)"
echo -e "   测试URL: ${TEST_URL}"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TEST_URL}" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${GREEN}✓ 服务器正确返回404状态码${NC}"
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${YELLOW}⚠ 服务器返回200（可能使用了客户端路由）${NC}"
else
    echo -e "${YELLOW}⚠ HTTP状态码: ${HTTP_CODE}${NC}"
fi

echo ""

# 6. 完成
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}修复完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}下一步:${NC}"
echo -e "1. 运行 ./test-404-page.sh 进行完整测试"
echo -e "2. 访问不存在的页面验证404页面显示"
echo -e "3. 检查返回首页链接是否正常工作"
