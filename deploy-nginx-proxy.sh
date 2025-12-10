#!/bin/bash
# Nginx 反向代理部署脚本
# 用于更新服务器上的 Nginx 配置，添加 API 反向代理

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
echo -e "${BLUE}  Nginx 反向代理配置部署${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查配置文件是否存在
if [ ! -f "${SCRIPT_DIR}/nginx-main-server.conf" ]; then
    echo -e "${RED}错误: 找不到 nginx-main-server.conf 配置文件${NC}"
    exit 1
fi

# 测试服务器连接
echo -e "${YELLOW}步骤 1: 测试服务器连接...${NC}"
if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
    SSH_CMD="ssh -i $SSH_KEY_PATH $SSH_OPTS $DEPLOY_USER@$DEPLOY_HOST"
else
    if ! command -v sshpass &> /dev/null; then
        echo -e "${RED}错误: 需要安装 sshpass${NC}"
        echo "macOS: brew install hudochenkov/sshpass/sshpass"
        exit 1
    fi
    SSH_CMD="sshpass -p '$DEPLOY_PASSWORD' ssh $SSH_OPTS $DEPLOY_USER@$DEPLOY_HOST"
fi

$SSH_CMD "echo '连接成功'" || {
    echo -e "${RED}错误: 服务器连接失败${NC}"
    exit 1
}
echo -e "${GREEN}✓ 服务器连接成功${NC}"
echo ""

# 备份现有配置
echo -e "${YELLOW}步骤 2: 备份现有 Nginx 配置...${NC}"
$SSH_CMD "if [ -f $NGINX_CONFIG_PATH ]; then cp $NGINX_CONFIG_PATH ${NGINX_CONFIG_PATH}.backup.\$(date +%Y%m%d_%H%M%S) && echo '配置已备份'; else echo '配置文件不存在，将创建新配置'; fi"
echo -e "${GREEN}✓ 备份完成${NC}"
echo ""

# 上传新配置
echo -e "${YELLOW}步骤 3: 上传新的 Nginx 配置...${NC}"
if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
    scp -i "$SSH_KEY_PATH" $SSH_OPTS "${SCRIPT_DIR}/nginx-main-server.conf" "$DEPLOY_USER@$DEPLOY_HOST:$NGINX_CONFIG_PATH"
else
    sshpass -p "$DEPLOY_PASSWORD" scp $SSH_OPTS "${SCRIPT_DIR}/nginx-main-server.conf" "$DEPLOY_USER@$DEPLOY_HOST:$NGINX_CONFIG_PATH"
fi
echo -e "${GREEN}✓ 配置已上传${NC}"
echo ""

# 创建符号链接（如果不存在）
echo -e "${YELLOW}步骤 4: 启用 Nginx 站点...${NC}"
$SSH_CMD "if [ ! -L $NGINX_CONFIG_ENABLED ]; then ln -s $NGINX_CONFIG_PATH $NGINX_CONFIG_ENABLED && echo '站点已启用'; else echo '站点已启用'; fi"
echo -e "${GREEN}✓ 站点已启用${NC}"
echo ""

# 测试 Nginx 配置
echo -e "${YELLOW}步骤 5: 测试 Nginx 配置...${NC}"
$SSH_CMD "nginx -t" || {
    echo -e "${RED}错误: Nginx 配置测试失败${NC}"
    echo -e "${YELLOW}正在恢复备份配置...${NC}"
    $SSH_CMD "if [ -f ${NGINX_CONFIG_PATH}.backup.* ]; then cp \$(ls -t ${NGINX_CONFIG_PATH}.backup.* | head -1) $NGINX_CONFIG_PATH && echo '配置已恢复'; fi"
    exit 1
}
echo -e "${GREEN}✓ Nginx 配置测试通过${NC}"
echo ""

# 重启 Nginx
echo -e "${YELLOW}步骤 6: 重启 Nginx 服务...${NC}"
$SSH_CMD "systemctl reload nginx || systemctl restart nginx" || {
    echo -e "${RED}错误: Nginx 重启失败${NC}"
    exit 1
}
echo -e "${GREEN}✓ Nginx 已重启${NC}"
echo ""

# 检查后端服务
echo -e "${YELLOW}步骤 7: 检查后端服务状态...${NC}"
BACKEND_STATUS=$($SSH_CMD "curl -s http://localhost:3001/health 2>/dev/null || echo 'FAILED'")
if [ "$BACKEND_STATUS" != "FAILED" ]; then
    echo -e "${GREEN}✓ 后端服务运行正常${NC}"
    echo "  响应: $BACKEND_STATUS"
else
    echo -e "${YELLOW}⚠️  后端服务未运行或无法访问${NC}"
    echo "  请确保后端服务在服务器上运行:"
    echo "    cd /path/to/server && npm start"
    echo "  或使用 PM2:"
    echo "    pm2 start server.js --name sgc-backend"
fi
echo ""

# 测试 API 代理
echo -e "${YELLOW}步骤 8: 测试 API 反向代理...${NC}"
API_TEST=$($SSH_CMD "curl -s http://localhost/api/experts 2>/dev/null | head -c 100 || echo 'FAILED'")
if [ "$API_TEST" != "FAILED" ] && [ -n "$API_TEST" ]; then
    echo -e "${GREEN}✓ API 反向代理工作正常${NC}"
    echo "  响应预览: ${API_TEST}..."
else
    echo -e "${YELLOW}⚠️  API 代理测试失败${NC}"
    echo "  可能原因:"
    echo "    1. 后端服务未运行"
    echo "    2. Nginx 配置未生效（请检查日志）"
    echo "  检查日志: tail -f /var/log/nginx/sgc_website_error.log"
fi
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📋 配置信息:${NC}"
echo "  服务器: $DEPLOY_HOST"
echo "  Nginx 配置: $NGINX_CONFIG_PATH"
echo "  前端地址: http://$DEPLOY_HOST/"
echo "  管理后台: http://$DEPLOY_HOST/admin"
echo "  API 代理: http://$DEPLOY_HOST/api/* -> http://localhost:3001/api/*"
echo ""
echo -e "${BLUE}🔍 验证步骤:${NC}"
echo "  1. 访问管理后台: http://$DEPLOY_HOST/admin"
echo "  2. 尝试修改专家信息并保存"
echo "  3. 检查浏览器控制台是否有错误"
echo ""
echo -e "${BLUE}📝 查看日志:${NC}"
echo "  Nginx 访问日志: tail -f /var/log/nginx/sgc_website_access.log"
echo "  Nginx 错误日志: tail -f /var/log/nginx/sgc_website_error.log"
echo ""

