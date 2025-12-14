#!/bin/bash
# 404问题诊断脚本
# 检查服务器上的404页面配置和文件

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 从 deploy.config.sh 读取配置（如果存在）
if [ -f "./deploy.config.sh" ]; then
    source ./deploy.config.sh
else
    # 默认配置
    DEPLOY_USER="${DEPLOY_USER:-root}"
    DEPLOY_HOST="${DEPLOY_HOST:-47.106.73.160}"
    DEPLOY_PASSWORD="${DEPLOY_PASSWORD:-}"
fi

REMOTE_DIST_DIR="/var/www/sgc_website/dist"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}404问题诊断脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# SSH执行函数
exec_ssh() {
    if [ -n "$DEPLOY_PASSWORD" ]; then
        sshpass -p "$DEPLOY_PASSWORD" ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
    else
        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
    fi
}

# 1. 检查本地构建输出
echo -e "${YELLOW}1. 检查本地构建输出...${NC}"
if [ -d "out" ]; then
    echo -e "${GREEN}✓ 构建输出目录存在: out/${NC}"
    
    if [ -f "out/404.html" ]; then
        echo -e "${GREEN}✓ 404.html 文件存在${NC}"
        echo -e "   文件大小: $(ls -lh out/404.html | awk '{print $5}')"
        echo -e "   修改时间: $(stat -f "%Sm" out/404.html 2>/dev/null || stat -c "%y" out/404.html 2>/dev/null | cut -d' ' -f1-2)"
        
        # 检查404.html内容
        if grep -q "Return to Home" out/404.html; then
            echo -e "${GREEN}✓ 404.html 包含返回首页链接${NC}"
        else
            echo -e "${RED}✗ 404.html 缺少返回首页链接${NC}"
        fi
        
        # 检查是否有硬编码路径
        if grep -q "/sgc_website/" out/404.html; then
            echo -e "${RED}✗ 警告: 404.html 包含硬编码路径 /sgc_website/${NC}"
        else
            echo -e "${GREEN}✓ 404.html 没有硬编码路径${NC}"
        fi
    else
        echo -e "${RED}✗ 404.html 文件不存在${NC}"
        echo -e "${YELLOW}  提示: 需要运行 npm run build 生成404.html${NC}"
    fi
    
    # 列出所有HTML文件
    echo ""
    echo -e "${BLUE}   构建输出中的HTML文件:${NC}"
    ls -1 out/*.html 2>/dev/null | head -10 | while read file; do
        echo -e "   - $(basename $file)"
    done
else
    echo -e "${RED}✗ 构建输出目录不存在${NC}"
    echo -e "${YELLOW}  提示: 需要先运行 npm run build${NC}"
fi

echo ""

# 2. 检查服务器上的文件
echo -e "${YELLOW}2. 检查服务器上的文件...${NC}"
echo -e "   服务器: ${DEPLOY_USER}@${DEPLOY_HOST}"
echo -e "   目录: ${REMOTE_DIST_DIR}"
echo ""

# 检查目录是否存在
if exec_ssh "test -d ${REMOTE_DIST_DIR}" 2>/dev/null; then
    echo -e "${GREEN}✓ 服务器目录存在${NC}"
    
    # 检查404.html是否存在
    if exec_ssh "test -f ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
        echo -e "${GREEN}✓ 服务器上 404.html 文件存在${NC}"
        
        # 获取文件信息
        FILE_INFO=$(exec_ssh "ls -lh ${REMOTE_DIST_DIR}/404.html" 2>/dev/null)
        echo -e "   文件信息: $FILE_INFO"
        
        # 检查文件内容
        if exec_ssh "grep -q 'Return to Home' ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
            echo -e "${GREEN}✓ 404.html 包含返回首页链接${NC}"
        else
            echo -e "${RED}✗ 404.html 缺少返回首页链接${NC}"
        fi
        
        # 检查是否有硬编码路径
        if exec_ssh "grep -q '/sgc_website/' ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
            echo -e "${RED}✗ 警告: 404.html 包含硬编码路径 /sgc_website/${NC}"
            echo -e "${YELLOW}  需要重新构建并部署${NC}"
        else
            echo -e "${GREEN}✓ 404.html 没有硬编码路径${NC}"
        fi
    else
        echo -e "${RED}✗ 服务器上 404.html 文件不存在${NC}"
        echo -e "${YELLOW}  需要部署404.html文件${NC}"
    fi
    
    # 列出服务器上的HTML文件
    echo ""
    echo -e "${BLUE}   服务器上的HTML文件:${NC}"
    exec_ssh "ls -1 ${REMOTE_DIST_DIR}/*.html 2>/dev/null | head -10" 2>/dev/null | while read file; do
        echo -e "   - $(basename $file)"
    done || echo -e "${RED}   无法列出文件${NC}"
else
    echo -e "${RED}✗ 服务器目录不存在${NC}"
fi

echo ""

# 3. 检查nginx配置
echo -e "${YELLOW}3. 检查nginx配置...${NC}"
if exec_ssh "test -f /etc/nginx/sites-available/sgc_website" 2>/dev/null; then
    echo -e "${GREEN}✓ Nginx配置文件存在${NC}"
    
    # 检查404处理配置
    if exec_ssh "grep -q 'error_page 404' /etc/nginx/sites-available/sgc_website" 2>/dev/null; then
        echo -e "${GREEN}✓ 找到404错误页面配置${NC}"
        exec_ssh "grep 'error_page 404' /etc/nginx/sites-available/sgc_website" 2>/dev/null | head -1
    else
        echo -e "${RED}✗ 未找到404错误页面配置${NC}"
    fi
    
    # 检查try_files配置
    if exec_ssh "grep -q 'try_files' /etc/nginx/sites-available/sgc_website" 2>/dev/null; then
        echo -e "${GREEN}✓ 找到try_files配置${NC}"
        exec_ssh "grep 'try_files' /etc/nginx/sites-available/sgc_website" 2>/dev/null | head -3
    else
        echo -e "${YELLOW}⚠ 未找到try_files配置${NC}"
    fi
else
    echo -e "${YELLOW}⚠ 无法检查nginx配置（可能需要root权限）${NC}"
fi

echo ""

# 4. 测试404页面访问
echo -e "${YELLOW}4. 测试404页面访问...${NC}"
TEST_URL="http://${DEPLOY_HOST}/nonexistent-page-$(date +%s)"

echo -e "   测试URL: ${TEST_URL}"
echo -e "   正在测试..."

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TEST_URL}" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${GREEN}✓ 服务器正确返回404状态码${NC}"
    
    # 检查返回的内容
    RESPONSE=$(curl -s "${TEST_URL}" 2>/dev/null || echo "")
    if echo "$RESPONSE" | grep -q "404"; then
        echo -e "${GREEN}✓ 404页面内容正确${NC}"
    else
        echo -e "${YELLOW}⚠ 404页面内容可能不正确${NC}"
    fi
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${RED}✗ 服务器返回200而不是404（可能返回了index.html）${NC}"
    echo -e "${YELLOW}  这可能是正常的，如果使用了客户端路由${NC}"
else
    echo -e "${YELLOW}⚠ 无法访问测试URL (HTTP状态码: ${HTTP_CODE})${NC}"
fi

echo ""

# 5. 检查basePath配置
echo -e "${YELLOW}5. 检查basePath配置...${NC}"
if [ -f "next.config.js" ]; then
    echo -e "${GREEN}✓ next.config.js 存在${NC}"
    
    # 检查basePath配置
    BASE_PATH_CONFIG=$(grep -A 1 "basePath:" next.config.js | head -2)
    echo -e "   配置:"
    echo -e "   ${BASE_PATH_CONFIG}" | sed 's/^/   /'
    
    # 检查环境变量
    echo ""
    echo -e "   当前环境变量:"
    echo -e "   BASE_PATH=${BASE_PATH:-未设置}"
    echo -e "   NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH:-未设置}"
    echo -e "   NODE_ENV=${NODE_ENV:-未设置}"
else
    echo -e "${RED}✗ next.config.js 不存在${NC}"
fi

echo ""

# 6. 生成修复建议
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}修复建议${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查是否需要重新构建
NEEDS_REBUILD=false

if [ ! -f "out/404.html" ]; then
    echo -e "${YELLOW}1. 需要重新构建项目:${NC}"
    echo -e "   BASE_PATH= npm run build"
    NEEDS_REBUILD=true
elif grep -q "/sgc_website/" out/404.html 2>/dev/null; then
    echo -e "${YELLOW}1. 需要重新构建项目（修复硬编码路径）:${NC}"
    echo -e "   BASE_PATH= npm run build"
    NEEDS_REBUILD=true
fi

if [ "$NEEDS_REBUILD" = false ]; then
    echo -e "${GREEN}✓ 本地构建文件正常${NC}"
fi

# 检查是否需要部署
if exec_ssh "test ! -f ${REMOTE_DIST_DIR}/404.html" 2>/dev/null; then
    echo ""
    echo -e "${YELLOW}2. 需要部署404.html到服务器:${NC}"
    echo -e "   运行部署脚本或手动复制文件"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}诊断完成${NC}"
echo -e "${BLUE}========================================${NC}"
