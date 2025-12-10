#!/bin/bash
# 检查服务器上 pcb-embedded.html 文件的实际内容

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

echo "1. 检查文件大小..."
exec_ssh "ls -lh /var/www/sgc_website/dist/pcb-embedded.html"

echo ""
echo "2. 检查文件前1000字符..."
exec_ssh "head -c 1000 /var/www/sgc_website/dist/pcb-embedded.html"

echo ""
echo "3. 检查是否包含 '埋嵌工艺产品'..."
exec_ssh "grep -o '埋嵌工艺产品' /var/www/sgc_website/dist/pcb-embedded.html | head -1 || echo '未找到'"

echo ""
echo "4. 检查是否包含 '明阳电路技术中心'..."
exec_ssh "grep -o '明阳电路技术中心' /var/www/sgc_website/dist/pcb-embedded.html | head -1 || echo '未找到'"

echo ""
echo "5. 检查文件的实际路由信息..."
exec_ssh "grep -o '\"c\":\[.*pcb-embedded.*\]' /var/www/sgc_website/dist/pcb-embedded.html | head -1 || echo '未找到路由信息'"

