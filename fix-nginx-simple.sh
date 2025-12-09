#!/bin/bash
# 简单修复 Nginx 配置脚本

set -e

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_MAIN_CONFIG="/etc/nginx/nginx.conf"

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

echo "1. 备份主配置文件..."
exec_ssh "cp ${NGINX_MAIN_CONFIG} ${NGINX_MAIN_CONFIG}.backup.simple.$(date +%Y%m%d_%H%M%S)"

echo ""
echo "2. 移除根路径重定向..."
exec_ssh "sed -i '/location = \\/ {/,/return 301 \\/sgc_website\\/;/d' ${NGINX_MAIN_CONFIG}"

echo ""
echo "3. 修复 try_files 配置..."
exec_ssh "sed -i 's|/sgc_website/index.html|/index.html|g' ${NGINX_MAIN_CONFIG}"

echo ""
echo "4. 测试配置..."
exec_ssh "nginx -t"

echo ""
echo "5. 重启 Nginx..."
exec_ssh "systemctl restart nginx"

echo ""
echo "6. 检查状态..."
exec_ssh "systemctl status nginx | head -5"

echo ""
echo "完成！请测试访问: http://${DEPLOY_HOST}"

