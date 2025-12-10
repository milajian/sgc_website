#!/bin/bash
# 测试所有路径是否正常工作

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  测试路径访问${NC}"
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

# 测试路径
test_path() {
    local path=$1
    echo -e "${YELLOW}测试: ${path}${NC}"
    result=$(exec_ssh "curl -I http://localhost${path} 2>&1 | grep -E 'HTTP|Location' | head -2")
    echo "$result"
    if echo "$result" | grep -q "200 OK\|301\|302"; then
        echo -e "${GREEN}✓ 通过${NC}"
    else
        echo -e "${RED}✗ 失败${NC}"
    fi
    echo ""
}

test_path "/glass-substrate/"
test_path "/glass-substrate"
test_path "/pcb-embedded/"
test_path "/pcb-embedded"
test_path "/pcb-coil-product-lines/"
test_path "/pcb-coil-product-lines"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  测试完成${NC}"
echo -e "${GREEN}========================================${NC}"

