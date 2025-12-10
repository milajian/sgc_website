#!/bin/bash
# 清理服务器上与 HTML 文件同名的目录

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
echo -e "${GREEN}  清理服务器上的多余目录${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 创建临时清理脚本
CLEANUP_SCRIPT=$(cat <<'SCRIPT_EOF'
#!/bin/bash
cd /var/www/sgc_website/dist
for html in *.html; do
    name=${html%.html}
    if [ -d "$name" ]; then
        echo "删除目录: $name/"
        rm -rf "$name"
    fi
done
echo "清理完成"
ls -la | grep -E "(glass-substrate|pcb-embedded|pcb-coil-product-lines)" | head -10
SCRIPT_EOF
)

# 上传脚本到服务器
echo -e "${YELLOW}上传清理脚本到服务器...${NC}"
TEMP_SCRIPT="/tmp/cleanup_dirs_$$.sh"
echo "$CLEANUP_SCRIPT" > "$TEMP_SCRIPT"

expect <<EXPECT_EOF
set timeout 30
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$TEMP_SCRIPT" ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/cleanup_dirs.sh
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

# 执行脚本
echo -e "${YELLOW}执行清理脚本...${NC}"
expect <<EXPECT_EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "bash /tmp/cleanup_dirs.sh"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

# 清理本地临时文件
rm -f "$TEMP_SCRIPT"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  清理完成！${NC}"
echo -e "${GREEN}========================================${NC}"
