#!/bin/bash
# 修复 Nginx 配置脚本 v2

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/sgc_website"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/sgc_website"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复 Nginx 配置${NC}"
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

echo -e "${YELLOW}1. 上传 Nginx 配置文件...${NC}"
expect <<EOF
set timeout 30
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null nginx-sgc-website.conf ${DEPLOY_USER}@${DEPLOY_HOST}:${NGINX_CONFIG_PATH}
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EOF

echo ""
echo -e "${YELLOW}2. 创建符号链接...${NC}"
exec_ssh "ln -sf ${NGINX_CONFIG_PATH} ${NGINX_ENABLED_PATH}"

echo ""
echo -e "${YELLOW}3. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t"

echo ""
echo -e "${YELLOW}4. 重启 Nginx...${NC}"
exec_ssh "systemctl restart nginx || service nginx restart"

echo ""
echo -e "${YELLOW}5. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl status nginx | head -5 || service nginx status | head -5"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试访问: http://${DEPLOY_HOST}"

