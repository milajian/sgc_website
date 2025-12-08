#!/bin/bash
# 测试服务器连接脚本

set -e

source ./deploy.config.sh

echo "=========================================="
echo "测试服务器连接"
echo "=========================================="
echo ""
echo "服务器: ${DEPLOY_USER}@${DEPLOY_HOST}"
echo "密码: ${DEPLOY_PASSWORD}"
echo ""

# 方法1: 使用 expect
echo "方法1: 使用 expect 测试..."
expect <<EOF
set timeout 10
set password "${DEPLOY_PASSWORD}"
spawn ssh -v -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "echo '连接成功'"
expect {
    -re "(password|Password):" {
        puts "发送密码..."
        send "\$password\r"
        exp_continue
    }
    "(yes/no)" {
        send "yes\r"
        exp_continue
    }
    "连接成功" {
        puts "连接成功！"
        exp_continue
    }
    eof
}
catch wait result
set exit_code [lindex \$result 3]
puts "退出代码: \$exit_code"
exit \$exit_code
EOF

echo ""
echo "=========================================="
echo "如果连接失败，请检查："
echo "1. 密码是否正确（包含特殊字符 =）"
echo "2. 服务器是否允许密码认证"
echo "3. 服务器防火墙是否开放端口 22"
echo "=========================================="
