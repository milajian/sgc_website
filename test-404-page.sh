#!/bin/bash
# 测试404页面功能脚本
# 验证404页面是否正确显示和链接是否工作

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
    DEPLOY_HOST="${DEPLOY_HOST:-47.106.73.160}"
fi

BASE_URL="http://${DEPLOY_HOST}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}404页面功能测试${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "测试服务器: ${BASE_URL}"
echo ""

# 测试函数
test_404_page() {
    local test_path="$1"
    local test_url="${BASE_URL}${test_path}"
    local description="$2"
    
    echo -e "${YELLOW}测试: ${description}${NC}"
    echo -e "   URL: ${test_url}"
    
    # 获取HTTP状态码
    HTTP_CODE=$(curl -s -o /tmp/test_404_response.html -w "%{http_code}" "${test_url}" 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "404" ]; then
        echo -e "   ${GREEN}✓ HTTP状态码: 404 (正确)${NC}"
        
        # 检查响应内容
        if grep -q "404" /tmp/test_404_response.html 2>/dev/null; then
            echo -e "   ${GREEN}✓ 页面包含404信息${NC}"
        else
            echo -e "   ${YELLOW}⚠ 页面可能不包含404信息${NC}"
        fi
        
        # 检查返回首页链接
        if grep -q "Return to Home\|返回首页\|href.*/" /tmp/test_404_response.html 2>/dev/null; then
            echo -e "   ${GREEN}✓ 页面包含返回首页链接${NC}"
            
            # 提取链接并测试
            LINK_HREF=$(grep -o 'href="[^"]*"' /tmp/test_404_response.html 2>/dev/null | head -1 | sed 's/href="//;s/"//')
            if [ -n "$LINK_HREF" ]; then
                echo -e "   链接地址: ${LINK_HREF}"
                
                # 测试链接是否可访问
                if [ "${LINK_HREF:0:1}" = "/" ]; then
                    LINK_URL="${BASE_URL}${LINK_HREF}"
                elif [ "${LINK_HREF:0:4}" = "http" ]; then
                    LINK_URL="${LINK_HREF}"
                else
                    LINK_URL="${BASE_URL}/${LINK_HREF}"
                fi
                
                LINK_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${LINK_URL}" 2>/dev/null || echo "000")
                if [ "$LINK_CODE" = "200" ]; then
                    echo -e "   ${GREEN}✓ 返回首页链接可访问${NC}"
                else
                    echo -e "   ${YELLOW}⚠ 返回首页链接返回状态码: ${LINK_CODE}${NC}"
                fi
            fi
        else
            echo -e "   ${RED}✗ 页面缺少返回首页链接${NC}"
        fi
        
    elif [ "$HTTP_CODE" = "200" ]; then
        echo -e "   ${YELLOW}⚠ HTTP状态码: 200 (可能返回了index.html)${NC}"
        echo -e "   这可能是正常的，如果使用了客户端路由处理404"
        
        # 检查内容是否是404页面
        if grep -q "404\|Page not found\|页面未找到" /tmp/test_404_response.html 2>/dev/null; then
            echo -e "   ${GREEN}✓ 内容显示404页面${NC}"
        else
            echo -e "   ${YELLOW}⚠ 内容可能不是404页面${NC}"
        fi
    else
        echo -e "   ${RED}✗ HTTP状态码: ${HTTP_CODE} (异常)${NC}"
    fi
    
    echo ""
}

# 测试1: 完全不存在的路径
test_404_page "/nonexistent-page-$(date +%s)" "不存在的页面路径"

# 测试2: 带特殊字符的路径
test_404_page "/test-404-$(date +%s)/subpath" "嵌套的不存在路径"

# 测试3: 看起来像真实路径但不存在的
test_404_page "/pcb-coil-nonexistent" "类似真实路径但不存在的页面"

# 测试4: 带查询参数的404
test_404_page "/nonexistent?test=1&param=2" "带查询参数的不存在路径"

# 清理临时文件
rm -f /tmp/test_404_response.html

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}测试完成${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}提示:${NC}"
echo -e "如果404页面显示不正确，请："
echo -e "1. 运行 ./check-404-issue.sh 检查配置"
echo -e "2. 重新构建项目: BASE_PATH= npm run build"
echo -e "3. 重新部署到服务器"
