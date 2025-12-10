#!/bin/bash
# 测试 pcb-embedded 的实际响应

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  测试 pcb-embedded 响应${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 使用 expect 执行 SSH 命令
exec_ssh() {
    expect <<EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EOF
}

echo -e "${YELLOW}1. 获取 pcb-embedded 的 HTML 内容（前500字符）...${NC}"
exec_ssh "curl -s http://localhost/pcb-embedded | head -c 500"

echo ""
echo ""
echo -e "${YELLOW}2. 检查 HTML 中是否包含 '埋嵌工艺产品'...${NC}"
exec_ssh "curl -s http://localhost/pcb-embedded | grep -o '埋嵌工艺产品' | head -1 || echo '未找到'"

echo ""
echo -e "${YELLOW}3. 检查 HTML 中是否包含 '明阳电路技术中心'...${NC}"
exec_ssh "curl -s http://localhost/pcb-embedded | grep -o '明阳电路技术中心' | head -1 || echo '未找到'"

echo ""
echo -e "${YELLOW}4. 检查实际加载的 Nginx 配置中的重定向规则...${NC}"
exec_ssh "grep -A 5 '处理尾部斜杠' /etc/nginx/sites-available/sgc_website | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  测试完成${NC}"
echo -e "${GREEN}========================================${NC}"

