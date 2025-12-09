#!/bin/bash
# 手动修复 Nginx 配置

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

echo "1. 查看当前配置中的 location 块..."
exec_ssh "grep -n 'location' ${NGINX_MAIN_CONFIG}"

echo ""
echo "2. 使用 awk 移除重定向规则..."
exec_ssh "awk '
/^[[:space:]]*location[[:space:]]*=[[:space:]]*\/[[:space:]]*\{/ {
    skip = 1
    next
}
skip && /^[[:space:]]*\}/ {
    skip = 0
    next
}
!skip { print }
' ${NGINX_MAIN_CONFIG} > /tmp/nginx.conf.new && mv /tmp/nginx.conf.new ${NGINX_MAIN_CONFIG}"

echo ""
echo "3. 测试配置..."
exec_ssh "nginx -t"

echo ""
echo "4. 重启 Nginx..."
exec_ssh "systemctl restart nginx"

echo ""
echo "5. 检查状态..."
exec_ssh "systemctl status nginx | head -3"

echo ""
echo "完成！"

