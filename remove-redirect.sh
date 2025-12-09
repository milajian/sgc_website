#!/bin/bash
# 移除重定向规则

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

echo "1. 备份配置文件..."
exec_ssh "cp ${NGINX_MAIN_CONFIG} ${NGINX_MAIN_CONFIG}.backup.remove.$(date +%Y%m%d_%H%M%S)"

echo ""
echo "2. 删除重定向规则（第51-53行）..."
exec_ssh "sed -i '51,53d' ${NGINX_MAIN_CONFIG}"

echo ""
echo "3. 验证删除结果..."
exec_ssh "grep -n 'location = /' ${NGINX_MAIN_CONFIG} || echo '重定向规则已删除'"

echo ""
echo "4. 测试配置..."
exec_ssh "nginx -t"

echo ""
echo "5. 重启 Nginx..."
exec_ssh "systemctl restart nginx"

echo ""
echo "6. 检查状态..."
exec_ssh "systemctl status nginx | head -3"

echo ""
echo "完成！请测试: http://${DEPLOY_HOST}"

