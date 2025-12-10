#!/bin/bash
# 检查服务器上的文件结构

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 加载部署配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/deploy.config.sh"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查服务器上的文件结构${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 执行 SSH 命令的函数
exec_ssh() {
    local cmd="$1"
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd"
    else
        # 使用 expect 进行密码认证
        expect <<EOF
set timeout 30
spawn ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF
    fi
}

echo -e "${YELLOW}1. 检查 pcb-embedded 相关文件...${NC}"
exec_ssh "ls -la /var/www/sgc_website/dist/ | grep pcb-embedded"

echo ""
echo -e "${YELLOW}2. 检查是否存在 pcb-embedded 目录...${NC}"
exec_ssh "test -d /var/www/sgc_website/dist/pcb-embedded && echo '目录存在' || echo '目录不存在'"

echo ""
echo -e "${YELLOW}3. 检查是否存在 pcb-embedded.html 文件...${NC}"
exec_ssh "test -f /var/www/sgc_website/dist/pcb-embedded.html && echo '文件存在' || echo '文件不存在'"

echo ""
echo -e "${YELLOW}4. 列出 dist 目录下的所有 .html 文件...${NC}"
exec_ssh "ls -1 /var/www/sgc_website/dist/*.html | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查完成${NC}"
echo -e "${GREEN}========================================${NC}"

