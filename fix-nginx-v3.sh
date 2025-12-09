#!/bin/bash
# 修复 Nginx 配置脚本 v3

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
NGINX_MAIN_CONFIG="/etc/nginx/nginx.conf"

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

echo -e "${YELLOW}1. 创建必要的目录...${NC}"
exec_ssh "mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled"

echo ""
echo -e "${YELLOW}2. 检查 Nginx 主配置文件...${NC}"
exec_ssh "grep -n 'sgc_website' ${NGINX_MAIN_CONFIG} || echo '未找到 sgc_website 配置'"

echo ""
echo -e "${YELLOW}3. 备份主配置文件...${NC}"
exec_ssh "cp ${NGINX_MAIN_CONFIG} ${NGINX_MAIN_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)"

echo ""
echo -e "${YELLOW}4. 移除主配置文件中的 sgc_website 相关配置...${NC}"
exec_ssh "sed -i '/location.*sgc_website/,/}/d' ${NGINX_MAIN_CONFIG}"

echo ""
echo -e "${YELLOW}5. 上传站点配置文件...${NC}"
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
echo -e "${YELLOW}6. 创建符号链接...${NC}"
exec_ssh "ln -sf ${NGINX_CONFIG_PATH} ${NGINX_ENABLED_PATH}"

echo ""
echo -e "${YELLOW}7. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t"

echo ""
echo -e "${YELLOW}8. 重启 Nginx...${NC}"
exec_ssh "systemctl restart nginx || service nginx restart"

echo ""
echo -e "${YELLOW}9. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl status nginx | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试访问: http://${DEPLOY_HOST}"

