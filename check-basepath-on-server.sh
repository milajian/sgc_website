#!/bin/bash
# 检查服务器上 HTML 文件中的 basePath 配置

set -e

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

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

echo "检查 pcb-embedded.html 中的路由信息..."
exec_ssh "grep -o 'B8Z4DJSvvRff3nx1z8qh4' /var/www/sgc_website/dist/pcb-embedded.html | head -1"

echo ""
echo "检查路由数据中的路径信息..."
exec_ssh "grep -o '\"c\":\[.*\]' /var/www/sgc_website/dist/pcb-embedded.html | head -1"

echo ""
echo "检查是否有 basePath 相关的配置..."
exec_ssh "grep -i 'basepath\|base-path\|NEXT_PUBLIC_BASE_PATH' /var/www/sgc_website/dist/pcb-embedded.html | head -3 || echo '未找到'"

