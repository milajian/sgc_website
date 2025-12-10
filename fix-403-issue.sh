#!/bin/bash
# 修复 403 错误 - 部署修复后的 Nginx 配置

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
echo -e "${BLUE}  修复 403 错误 - 部署 Nginx 配置${NC}"
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

# 上传配置文件
upload_config() {
    local local_file="$1"
    local remote_file="$2"
    
    echo -e "${YELLOW}上传配置文件...${NC}"
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        scp -i "$SSH_KEY_PATH" $SSH_OPTS "$local_file" "${DEPLOY_USER}@${DEPLOY_HOST}:$remote_file"
    elif command -v expect &> /dev/null; then
        expect <<EXPECT_EOF
set timeout 30
spawn scp $SSH_OPTS "$local_file" "${DEPLOY_USER}@${DEPLOY_HOST}:$remote_file"
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
    echo -e "${GREEN}✓ 配置文件已上传${NC}"
}

# 步骤 1: 备份现有配置
echo -e "${YELLOW}步骤 1: 备份现有 Nginx 配置...${NC}"
exec_ssh "if [ -f $NGINX_CONFIG_PATH ]; then cp $NGINX_CONFIG_PATH ${NGINX_CONFIG_PATH}.backup.\$(date +%Y%m%d_%H%M%S) && echo '配置已备份'; else echo '配置文件不存在'; fi"
echo ""

# 步骤 2: 上传新配置
echo -e "${YELLOW}步骤 2: 上传修复后的 Nginx 配置...${NC}"
upload_config "${SCRIPT_DIR}/nginx-main-server.conf" "/tmp/nginx-main-server.conf"
echo ""

# 步骤 3: 移动配置文件到正确位置
echo -e "${YELLOW}步骤 3: 更新服务器上的 Nginx 配置...${NC}"
exec_ssh "cp /tmp/nginx-main-server.conf $NGINX_CONFIG_PATH && echo '配置文件已更新'"
echo ""

# 步骤 4: 创建符号链接（如果不存在）
echo -e "${YELLOW}步骤 4: 确保 Nginx 站点已启用...${NC}"
exec_ssh "ln -sf $NGINX_CONFIG_PATH $NGINX_CONFIG_ENABLED && echo '站点已启用'"
echo ""

# 步骤 5: 测试 Nginx 配置
echo -e "${YELLOW}步骤 5: 测试 Nginx 配置...${NC}"
if exec_ssh "nginx -t"; then
    echo -e "${GREEN}✓ Nginx 配置测试通过${NC}"
else
    echo -e "${RED}✗ Nginx 配置测试失败${NC}"
    echo -e "${YELLOW}正在恢复备份配置...${NC}"
    exec_ssh "if [ -f ${NGINX_CONFIG_PATH}.backup.* ]; then cp \$(ls -t ${NGINX_CONFIG_PATH}.backup.* | head -1) $NGINX_CONFIG_PATH && echo '配置已恢复'; fi"
    exit 1
fi
echo ""

# 步骤 6: 重新加载 Nginx
echo -e "${YELLOW}步骤 6: 重新加载 Nginx 服务...${NC}"
if exec_ssh "systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null || nginx -s reload"; then
    echo -e "${GREEN}✓ Nginx 已重新加载${NC}"
else
    echo -e "${YELLOW}尝试重启 Nginx...${NC}"
    exec_ssh "systemctl restart nginx 2>/dev/null || service nginx restart 2>/dev/null"
    echo -e "${GREEN}✓ Nginx 已重启${NC}"
fi
echo ""

# 步骤 7: 验证修复
echo -e "${YELLOW}步骤 7: 验证修复是否成功...${NC}"
echo -e "测试访问 /glass-substrate/ ..."
TEST_RESULT=$(exec_ssh "curl -s -o /dev/null -w '%{http_code}' http://localhost/glass-substrate/ 2>/dev/null || echo 'FAILED'")
if [ "$TEST_RESULT" = "301" ] || [ "$TEST_RESULT" = "200" ]; then
    echo -e "${GREEN}✓ 修复成功！返回状态码: $TEST_RESULT${NC}"
else
    echo -e "${YELLOW}⚠ 返回状态码: $TEST_RESULT（可能需要进一步检查）${NC}"
fi
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复完成${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请访问以下 URL 验证修复："
echo -e "  http://${DEPLOY_HOST}/glass-substrate/"
echo -e "  http://${DEPLOY_HOST}/glass-substrate"
echo ""

