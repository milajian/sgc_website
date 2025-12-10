#!/bin/bash
# 更新 Nginx 配置脚本

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
echo -e "${GREEN}  更新 Nginx 配置${NC}"
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

# 上传配置文件
echo -e "${YELLOW}1. 上传 Nginx 配置文件...${NC}"
if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
    scp -i "$SSH_KEY_PATH" $SSH_OPTS "${SCRIPT_DIR}/nginx-main-server.conf" "$DEPLOY_USER@$DEPLOY_HOST:/tmp/nginx-main-server.conf"
else
    expect <<EOF
set timeout 30
spawn scp $SSH_OPTS "${SCRIPT_DIR}/nginx-main-server.conf" "$DEPLOY_USER@$DEPLOY_HOST:/tmp/nginx-main-server.conf"
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

echo -e "${GREEN}✓ 配置文件上传完成${NC}"

# 更新服务器上的配置文件
echo -e "${YELLOW}2. 更新服务器上的 Nginx 配置...${NC}"
exec_ssh "cp /tmp/nginx-main-server.conf /etc/nginx/sites-available/sgc_website && echo '配置文件已更新'"

# 创建符号链接（如果不存在）
echo -e "${YELLOW}3. 确保 Nginx 站点已启用...${NC}"
exec_ssh "ln -sf /etc/nginx/sites-available/sgc_website /etc/nginx/sites-enabled/sgc_website 2>/dev/null || true"

# 测试 Nginx 配置
echo -e "${YELLOW}4. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t" || {
    echo -e "${RED}错误: Nginx 配置测试失败${NC}"
    exit 1
}

# 重启 Nginx
echo -e "${YELLOW}5. 重启 Nginx...${NC}"
exec_ssh "systemctl reload nginx || service nginx reload" || {
    echo -e "${RED}错误: Nginx 重启失败${NC}"
    exit 1
}

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置更新完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "网站地址: http://${DEPLOY_HOST}"
echo -e "配置路径: /etc/nginx/sites-available/sgc_website"

