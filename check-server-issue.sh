#!/bin/bash
# 检查服务器上的问题

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查服务器问题${NC}"
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

echo -e "${YELLOW}1. 检查文件是否存在...${NC}"
exec_ssh "ls -la /var/www/sgc_website/dist/ | grep -E '(pcb-coil|index)' | head -10"

echo ""
echo -e "${YELLOW}2. 检查目录权限...${NC}"
exec_ssh "ls -ld /var/www/sgc_website/dist && ls -ld /var/www/sgc_website"

echo ""
echo -e "${YELLOW}3. 检查 Nginx 错误日志（最近20行）...${NC}"
exec_ssh "tail -20 /var/log/nginx/sgc_website_error.log 2>/dev/null || echo '日志文件不存在或无法访问'"

echo ""
echo -e "${YELLOW}4. 检查 Nginx 访问日志（最近5行）...${NC}"
exec_ssh "tail -5 /var/log/nginx/sgc_website_access.log 2>/dev/null || echo '日志文件不存在或无法访问'"

echo ""
echo -e "${YELLOW}5. 检查实际加载的 Nginx 配置...${NC}"
exec_ssh "cat /etc/nginx/sites-available/sgc_website | grep -A 30 '处理尾部斜杠' || cat /etc/nginx/sites-available/sgc_website | head -60"

echo ""
echo -e "${YELLOW}6. 测试访问带尾部斜杠的路径...${NC}"
exec_ssh "curl -I http://localhost/pcb-coil-product-lines/ 2>&1 | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查完成${NC}"
echo -e "${GREEN}========================================${NC}"

