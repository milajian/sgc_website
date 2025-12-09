#!/bin/bash
# 修复 Nginx 主配置文件

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_MAIN_CONFIG="/etc/nginx/nginx.conf"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复 Nginx 主配置文件${NC}"
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

echo -e "${YELLOW}1. 备份主配置文件...${NC}"
exec_ssh "cp ${NGINX_MAIN_CONFIG} ${NGINX_MAIN_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)"

echo ""
echo -e "${YELLOW}2. 移除根路径重定向规则...${NC}"
exec_ssh "sed -i '/location = \/ {/,/}/d' ${NGINX_MAIN_CONFIG}"

echo ""
echo -e "${YELLOW}3. 修复主 location 块...${NC}"
exec_ssh "sed -i 's|try_files \$uri \$uri/ /sgc_website/index.html;|try_files \$uri \$uri.html /index.html;|g' ${NGINX_MAIN_CONFIG}"

echo ""
echo -e "${YELLOW}4. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t"

echo ""
echo -e "${YELLOW}5. 重启 Nginx...${NC}"
exec_ssh "systemctl restart nginx || service nginx restart"

echo ""
echo -e "${YELLOW}6. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl status nginx | head -5"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 主配置修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试访问: http://${DEPLOY_HOST}"

