#!/bin/bash
# 诊断 403 错误的根本原因

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 加载部署配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/deploy.config.sh"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  诊断 403 错误根本原因${NC}"
echo -e "${BLUE}========================================${NC}"
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
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "Password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "(yes/no)" {
        send "yes\r"
        exp_continue
    }
    eof
}
EXPECT_EOF
    else
        echo -e "${RED}错误: 需要安装 expect 或配置 SSH 密钥${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}1. 检查服务器上实际加载的 Nginx 配置（location / 部分）...${NC}"
exec_ssh "grep -A 10 'location /' /etc/nginx/sites-available/sgc_website | head -15"
echo ""

echo -e "${YELLOW}2. 检查文件是否存在和类型...${NC}"
exec_ssh "ls -la /var/www/sgc_website/dist/glass-substrate* 2>/dev/null || echo '文件不存在'"
exec_ssh "test -d /var/www/sgc_website/dist/glass-substrate && echo 'glass-substrate 是目录' || echo 'glass-substrate 不是目录'"
exec_ssh "test -f /var/www/sgc_website/dist/glass-substrate.html && echo 'glass-substrate.html 文件存在' || echo 'glass-substrate.html 文件不存在'"
echo ""

echo -e "${YELLOW}3. 检查目录权限...${NC}"
exec_ssh "ls -ld /var/www/sgc_website/dist/glass-substrate 2>/dev/null || echo '目录不存在'"
exec_ssh "ls -ld /var/www/sgc_website/dist"
exec_ssh "stat -c '%a %U:%G' /var/www/sgc_website/dist/glass-substrate 2>/dev/null || echo '无法获取权限信息'"
echo ""

echo -e "${YELLOW}4. 检查 Nginx 错误日志（最近50行，包含403或glass-substrate）...${NC}"
exec_ssh "tail -50 /var/log/nginx/sgc_website_error.log 2>/dev/null | grep -E '(403|glass-substrate|pcb-embedded)' | tail -20 || echo '没有找到相关错误'"
echo ""

echo -e "${YELLOW}5. 检查访问日志（最近50行，包含403）...${NC}"
exec_ssh "tail -50 /var/log/nginx/sgc_website_access.log 2>/dev/null | grep -E '(403|glass-substrate|pcb-embedded)' | tail -10 || echo '没有找到相关访问记录'"
echo ""

echo -e "${YELLOW}6. 测试服务器内部访问（不带斜杠）...${NC}"
exec_ssh "curl -I http://localhost/glass-substrate 2>&1 | head -15"
echo ""

echo -e "${YELLOW}7. 测试服务器内部访问（带斜杠）...${NC}"
exec_ssh "curl -I http://localhost/glass-substrate/ 2>&1 | head -15"
echo ""

echo -e "${YELLOW}8. 检查 Nginx 配置中的 try_files 指令...${NC}"
exec_ssh "grep -n 'try_files' /etc/nginx/sites-available/sgc_website"
echo ""

echo -e "${YELLOW}9. 检查是否有其他 location 块可能干扰...${NC}"
exec_ssh "grep -n 'location' /etc/nginx/sites-available/sgc_website | head -20"
echo ""

echo -e "${YELLOW}10. 检查 autoindex 设置...${NC}"
exec_ssh "grep -n 'autoindex' /etc/nginx/sites-available/sgc_website"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  诊断完成${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请查看上面的输出，特别关注："
echo -e "  - 错误日志中的具体错误信息"
echo -e "  - 文件权限是否正确"
echo -e "  - try_files 配置是否正确"
echo -e "  - 是否有其他 location 块干扰"
echo ""

