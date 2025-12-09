#!/bin/bash
# 检查 Nginx 配置脚本

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

echo "检查 Nginx 主配置文件中的 server 块..."
exec_ssh "cat ${NGINX_MAIN_CONFIG}"

