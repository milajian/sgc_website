#!/bin/bash
# 检查 Nginx try_files 配置

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

echo "检查 Nginx location / 配置..."
exec_ssh "grep -A 10 'location / {' /etc/nginx/sites-available/sgc_website | head -15"

