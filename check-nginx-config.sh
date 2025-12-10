#!/bin/bash
# 检查服务器上的 Nginx 配置

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
echo -e "${GREEN}  检查服务器上的 Nginx 配置${NC}"
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

echo -e "${YELLOW}1. 检查服务器上的 Nginx 配置文件...${NC}"
exec_ssh "cat /etc/nginx/sites-available/sgc_website"

echo ""
echo -e "${YELLOW}2. 检查 Nginx 错误日志（最近20行）...${NC}"
exec_ssh "tail -20 /var/log/nginx/sgc_website_error.log 2>/dev/null || tail -20 /var/log/nginx/error.log 2>/dev/null || echo '日志文件不存在'"

echo ""
echo -e "${YELLOW}3. 检查访问日志（最近10行，包含 pcb-embedded）...${NC}"
exec_ssh "tail -100 /var/log/nginx/sgc_website_access.log 2>/dev/null | grep -i 'pcb-embedded' | tail -10 || echo '没有找到相关访问记录'"

echo ""
echo -e "${YELLOW}4. 测试访问 pcb-embedded/ 路径...${NC}"
exec_ssh "curl -I http://localhost/pcb-embedded/ 2>&1 | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  检查完成${NC}"
echo -e "${GREEN}========================================${NC}"
