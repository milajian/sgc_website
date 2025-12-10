#!/bin/bash
# 检查服务器上的文件状态

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查服务器文件状态${NC}"
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

echo -e "${YELLOW}1. 检查 pcb-embedded 相关文件...${NC}"
exec_ssh "ls -la /var/www/sgc_website/dist/ | grep pcb-embedded"

echo ""
echo -e "${YELLOW}2. 检查是否存在 pcb-embedded 目录...${NC}"
exec_ssh "test -d /var/www/sgc_website/dist/pcb-embedded && echo '目录存在' || echo '目录不存在'"

echo ""
echo -e "${YELLOW}3. 检查 pcb-embedded.html 文件...${NC}"
exec_ssh "test -f /var/www/sgc_website/dist/pcb-embedded.html && echo '文件存在' || echo '文件不存在'"

echo ""
echo -e "${YELLOW}4. 测试访问不带斜杠的路径...${NC}"
exec_ssh "curl -I http://localhost/pcb-embedded 2>&1 | head -5"

echo ""
echo -e "${YELLOW}5. 测试访问带斜杠的路径...${NC}"
exec_ssh "curl -I http://localhost/pcb-embedded/ 2>&1 | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查完成${NC}"
echo -e "${GREEN}========================================${NC}"

