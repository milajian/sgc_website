#!/bin/bash
# 修复目录导致的 403 错误：删除多余的目录，只保留 HTML 文件

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
DIST_DIR="/var/www/sgc_website/dist"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复目录导致的 403 错误${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 使用 expect 执行 SSH 命令
exec_ssh() {
    expect <<EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} {$1}
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EOF
}

echo -e "${YELLOW}1. 查找所有既有目录又有 HTML 文件的路径...${NC}"
CMD1="cd ${DIST_DIR} && for dir in */; do [ -d \\\$dir ] && dirname=\\\$(basename \\\$dir) && [ -f \\\${dirname}.html ] && echo 找到: \\\${dirname}/ 目录 和 \\\${dirname}.html 文件; done"
exec_ssh "$CMD1"

echo ""
echo -e "${YELLOW}2. 删除多余的目录（保留 HTML 文件）...${NC}"
CMD2="cd ${DIST_DIR} && for dir in */; do [ -d \\\$dir ] && dirname=\\\$(basename \\\$dir) && [ -f \\\${dirname}.html ] && echo 删除目录: \\\${dirname}/ && rm -rf \\\${dirname}; done"
exec_ssh "$CMD2"

echo ""
echo -e "${YELLOW}3. 验证清理结果...${NC}"
exec_ssh "cd ${DIST_DIR} && echo '检查 pcb-coil-product-lines:' && ls -la pcb-coil-product-lines* 2>&1 | head -5"

echo ""
echo -e "${YELLOW}4. 测试访问...${NC}"
exec_ssh "curl -I http://localhost/pcb-coil-product-lines/ 2>&1 | head -8"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
