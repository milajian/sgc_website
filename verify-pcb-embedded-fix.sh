#!/bin/bash
# 验证 PCB埋嵌页面修复

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  验证 PCB埋嵌页面修复${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

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

echo -e "${YELLOW}1. 检查文件更新时间...${NC}"
exec_ssh "stat -c '%y' /var/www/sgc_website/dist/pcb-embedded.html"

echo ""
echo -e "${YELLOW}2. 检查文件内容（应该包含'埋嵌工艺产品'）...${NC}"
if exec_ssh "grep -q '埋嵌工艺产品' /var/www/sgc_website/dist/pcb-embedded.html" 2>&1 | grep -q "埋嵌工艺产品"; then
    echo -e "${GREEN}✓ 文件包含'埋嵌工艺产品'${NC}"
else
    exec_ssh "grep '埋嵌工艺产品' /var/www/sgc_website/dist/pcb-embedded.html | head -1"
fi

echo ""
echo -e "${YELLOW}3. 测试访问（不带斜杠）...${NC}"
exec_ssh "curl -s -o /dev/null -w 'HTTP状态码: %{http_code}\n' http://localhost/pcb-embedded"

echo ""
echo -e "${YELLOW}4. 测试访问（带斜杠，应该重定向）...${NC}"
exec_ssh "curl -s -o /dev/null -w 'HTTP状态码: %{http_code}\nLocation: %{redirect_url}\n' http://localhost/pcb-embedded/"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  验证完成${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}请在浏览器中访问以下地址测试：${NC}"
echo "  http://47.106.73.160/pcb-embedded"
echo ""
echo -e "${YELLOW}如果仍然有问题，请：${NC}"
echo "  1. 清除浏览器缓存（Ctrl+Shift+Delete 或 Cmd+Shift+Delete）"
echo "  2. 使用无痕模式访问"
echo "  3. 检查浏览器控制台的错误信息"

