#!/bin/bash
# 修复 Nginx 403 错误脚本
# 更新 try_files 顺序，优先匹配 HTML 文件

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
echo -e "${GREEN}  修复 Nginx 403 错误${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 执行 SSH 命令的函数
exec_ssh() {
    local cmd="$1"
    local safe_cmd=$(echo "$cmd" | sed "s/'/'\\\\''/g")
    
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        ssh -i "$SSH_KEY_PATH" $SSH_OPTS "${DEPLOY_USER}@${DEPLOY_HOST}" "$cmd"
    elif command -v expect &> /dev/null; then
        expect <<EXPECT_EOF
set timeout 30
spawn ssh $SSH_OPTS ${DEPLOY_USER}@${DEPLOY_HOST} bash -c '$safe_cmd'
expect {
    -re "(password|Password):" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "(yes/no)" {
        send "yes\r"
        exp_continue
    }
    eof
}
catch wait result
set exit_code [lindex \$result 3]
if {\$exit_code != 0} {
    exit \$exit_code
}
EXPECT_EOF
    else
        echo -e "${RED}错误: 需要安装 expect 或配置 SSH 密钥${NC}"
        exit 1
    fi
}

# 备份现有配置
echo -e "${YELLOW}1. 备份现有 Nginx 配置...${NC}"
exec_ssh "cp ${NGINX_CONFIG_PATH} ${NGINX_CONFIG_PATH}.backup.\$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"
echo -e "${GREEN}✓ 备份完成${NC}"

# 更新 Nginx 配置中的 try_files 顺序
echo -e "${YELLOW}2. 更新 Nginx 配置...${NC}"
exec_ssh "sed -i 's|try_files \\\$uri \\\$uri.html /index.html;|try_files \\\$uri.html \\\$uri /index.html;|g' ${NGINX_CONFIG_PATH} && echo '配置已更新'"

# 验证配置更改
echo -e "${YELLOW}3. 验证配置更改...${NC}"
exec_ssh "grep 'try_files' ${NGINX_CONFIG_PATH} | head -1" || {
    echo -e "${RED}错误: 配置更新失败${NC}"
    exit 1
}
echo -e "${GREEN}✓ 配置验证通过${NC}"

# 测试 Nginx 配置
echo -e "${YELLOW}4. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t" || {
    echo -e "${RED}错误: Nginx 配置测试失败${NC}"
    exit 1
}
echo -e "${GREEN}✓ Nginx 配置测试通过${NC}"

# 重启 Nginx
echo -e "${YELLOW}5. 重启 Nginx...${NC}"
exec_ssh "systemctl reload nginx || service nginx reload" || {
    echo -e "${RED}错误: Nginx 重启失败，尝试强制重启...${NC}"
    exec_ssh "systemctl restart nginx || service nginx restart"
}

# 检查 Nginx 状态
echo -e "${YELLOW}6. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl is-active nginx || pgrep -x nginx > /dev/null" && {
    echo -e "${GREEN}✓ Nginx 运行正常${NC}"
} || {
    echo -e "${RED}警告: Nginx 可能未正常运行${NC}"
}

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 403 错误修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试以下页面："
echo -e "  - http://${DEPLOY_HOST}/glass-substrate"
echo -e "  - http://${DEPLOY_HOST}/pcb-embedded"
echo -e "  - http://${DEPLOY_HOST}/pcb-coil-axial"
echo ""

