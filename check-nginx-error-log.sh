#!/bin/bash
# 检查 Nginx 错误日志

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查 Nginx 错误日志${NC}"
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

echo -e "${YELLOW}1. 检查错误日志（最近50行）...${NC}"
exec_ssh "tail -50 /var/log/nginx/sgc_website_error.log 2>/dev/null || echo '日志文件不存在或无法访问'"

echo ""
echo -e "${YELLOW}2. 检查 pcb-embedded 相关的错误...${NC}"
exec_ssh "grep -i 'pcb-embedded' /var/log/nginx/sgc_website_error.log 2>/dev/null | tail -20 || echo '没有找到相关错误'"

echo ""
echo -e "${YELLOW}3. 检查最近的 403/404/500 错误...${NC}"
exec_ssh "grep -E '(403|404|500)' /var/log/nginx/sgc_website_error.log 2>/dev/null | tail -20 || echo '没有找到相关错误'"

echo ""
echo -e "${YELLOW}4. 检查文件访问错误...${NC}"
exec_ssh "grep -iE '(no such file|directory index|forbidden|open.*failed)' /var/log/nginx/sgc_website_error.log 2>/dev/null | tail -20 || echo '没有找到相关错误'"

echo ""
echo -e "${YELLOW}5. 检查访问日志中 pcb-embedded 的请求...${NC}"
exec_ssh "grep 'pcb-embedded' /var/log/nginx/sgc_website_access.log 2>/dev/null | tail -10 || echo '没有找到相关访问记录'"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查完成${NC}"
echo -e "${GREEN}========================================${NC}"

