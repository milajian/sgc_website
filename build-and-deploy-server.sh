#!/bin/bash
# 构建和部署 IP Server（后端服务）
# 此脚本会构建后端代码并部署到服务器

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 加载部署配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/deploy.config.sh" ]; then
    source "${SCRIPT_DIR}/deploy.config.sh"
else
    echo -e "${RED}错误: 找不到 deploy.config.sh 配置文件${NC}"
    exit 1
fi

# 配置变量
LOCAL_SERVER_DIR="${SCRIPT_DIR}/server"
REMOTE_SERVER_DIR="${REMOTE_BASE_DIR}/server"
SERVICE_NAME="sgc-backend"
PORT=3001

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  构建和部署 IP Server${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查本地 server 目录
check_local_server() {
    echo -e "${BLUE}步骤 1: 检查本地服务器代码...${NC}"
    
    if [ ! -d "$LOCAL_SERVER_DIR" ]; then
        echo -e "${RED}错误: 找不到本地 server 目录: $LOCAL_SERVER_DIR${NC}"
        exit 1
    fi
    
    if [ ! -f "$LOCAL_SERVER_DIR/server.js" ]; then
        echo -e "${RED}错误: 找不到 server.js 文件${NC}"
        exit 1
    fi
    
    if [ ! -f "$LOCAL_SERVER_DIR/package.json" ]; then
        echo -e "${RED}错误: 找不到 package.json 文件${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 本地服务器代码检查通过${NC}"
    echo ""
}

# 检查依赖工具
check_dependencies() {
    echo -e "${BLUE}步骤 2: 检查依赖工具...${NC}"
    
    local missing_tools=()
    
    if ! command -v sshpass &> /dev/null; then
        missing_tools+=("sshpass")
    fi
    
    if ! command -v rsync &> /dev/null; then
        missing_tools+=("rsync")
    fi
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${YELLOW}警告: 缺少以下工具: ${missing_tools[*]}${NC}"
        echo -e "${YELLOW}请安装缺失的工具:${NC}"
        echo -e "  macOS: brew install hudochenkov/sshpass/sshpass"
        echo -e "  Ubuntu: sudo apt-get install sshpass rsync"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 依赖工具检查通过${NC}"
    echo ""
}

# 测试服务器连接
test_connection() {
    echo -e "${BLUE}步骤 3: 测试服务器连接...${NC}"
    
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        echo -e "${YELLOW}使用 SSH 密钥认证...${NC}"
        if ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "echo '连接成功'" &> /dev/null; then
            echo -e "${GREEN}✓ 服务器连接成功（SSH 密钥）${NC}"
            USE_SSH_KEY_AUTH=true
        else
            echo -e "${YELLOW}SSH 密钥连接失败，尝试密码认证...${NC}"
            USE_SSH_KEY_AUTH=false
        fi
    else
        USE_SSH_KEY_AUTH=false
    fi
    
    if [ "$USE_SSH_KEY_AUTH" = false ]; then
        if sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "echo '连接成功'" &> /dev/null; then
            echo -e "${GREEN}✓ 服务器连接成功（密码认证）${NC}"
        else
            echo -e "${RED}错误: 无法连接到服务器${NC}"
            exit 1
        fi
    fi
    
    echo ""
}

# 创建服务器目录
create_remote_directories() {
    echo -e "${BLUE}步骤 4: 创建服务器目录...${NC}"
    
    local cmd="mkdir -p $REMOTE_SERVER_DIR/{api,data,uploads} && echo '目录已创建'"
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd" &> /dev/null
    else
        sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd" &> /dev/null
    fi
    
    echo -e "${GREEN}✓ 服务器目录已创建${NC}"
    echo ""
}

# 上传后端文件
upload_server_files() {
    echo -e "${BLUE}步骤 5: 上传后端文件...${NC}"
    
    # 使用 rsync 上传文件（排除 node_modules）
    local rsync_opts="-avz --delete --exclude='node_modules' --exclude='*.log'"
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        rsync $rsync_opts -e "ssh -i $SSH_KEY_PATH $SSH_OPTS" \
            "$LOCAL_SERVER_DIR/" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_SERVER_DIR/"
    else
        rsync $rsync_opts -e "sshpass -p '$DEPLOY_PASSWORD' ssh $SSH_OPTS" \
            "$LOCAL_SERVER_DIR/" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_SERVER_DIR/"
    fi
    
    echo -e "${GREEN}✓ 后端文件已上传${NC}"
    echo ""
}

# 安装依赖
install_dependencies() {
    echo -e "${BLUE}步骤 6: 安装后端依赖...${NC}"
    
    local cmd="cd $REMOTE_SERVER_DIR && npm install --production"
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd"
    else
        sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd"
    fi
    
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
    echo ""
}

# 检查并安装 PM2
check_pm2() {
    echo -e "${BLUE}步骤 7: 检查 PM2...${NC}"
    
    local cmd="which pm2 >/dev/null 2>&1 && echo 'INSTALLED' || echo 'NOT_INSTALLED'"
    local result
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        result=$(ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd")
    else
        result=$(sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$cmd")
    fi
    
    if [ "$result" = "NOT_INSTALLED" ]; then
        echo -e "${YELLOW}PM2 未安装，正在安装...${NC}"
        local install_cmd="npm install -g pm2"
        
        if [ "$USE_SSH_KEY_AUTH" = true ]; then
            ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$install_cmd"
        else
            sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$install_cmd"
        fi
        
        echo -e "${GREEN}✓ PM2 安装完成${NC}"
    else
        echo -e "${GREEN}✓ PM2 已安装${NC}"
    fi
    
    echo ""
}

# 启动或重启服务
start_or_restart_service() {
    echo -e "${BLUE}步骤 8: 启动/重启后端服务...${NC}"
    
    local check_cmd="pm2 list | grep -q '$SERVICE_NAME' && echo 'RUNNING' || echo 'NOT_RUNNING'"
    local status
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        status=$(ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$check_cmd")
    else
        status=$(sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$check_cmd")
    fi
    
    if [ "$status" = "RUNNING" ]; then
        echo -e "${YELLOW}服务已在运行，重启服务...${NC}"
        local restart_cmd="cd $REMOTE_SERVER_DIR && pm2 restart $SERVICE_NAME"
        
        if [ "$USE_SSH_KEY_AUTH" = true ]; then
            ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$restart_cmd"
        else
            sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$restart_cmd"
        fi
        
        echo -e "${GREEN}✓ 服务已重启${NC}"
    else
        echo -e "${YELLOW}启动新服务...${NC}"
        local start_cmd="cd $REMOTE_SERVER_DIR && pm2 start server.js --name $SERVICE_NAME && pm2 save"
        
        if [ "$USE_SSH_KEY_AUTH" = true ]; then
            ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$start_cmd"
        else
            sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$start_cmd"
        fi
        
        echo -e "${GREEN}✓ 服务已启动${NC}"
    fi
    
    echo ""
}

# 验证服务
verify_service() {
    echo -e "${BLUE}步骤 9: 验证服务状态...${NC}"
    
    # 等待服务启动
    sleep 3
    
    local health_cmd="curl -s http://localhost:$PORT/health"
    local health_result
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        health_result=$(ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$health_cmd")
    else
        health_result=$(sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$health_cmd")
    fi
    
    if echo "$health_result" | grep -q "ok"; then
        echo -e "${GREEN}✓ 健康检查通过${NC}"
    else
        echo -e "${YELLOW}⚠️  健康检查未通过，服务可能还在启动中${NC}"
    fi
    
    # 测试 API
    local api_cmd="curl -s http://localhost:$PORT/api/experts | head -c 50"
    local api_result
    
    if [ "$USE_SSH_KEY_AUTH" = true ]; then
        api_result=$(ssh -i "$SSH_KEY_PATH" $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$api_cmd")
    else
        api_result=$(sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "$DEPLOY_USER@$DEPLOY_HOST" "$api_cmd")
    fi
    
    if [ -n "$api_result" ]; then
        echo -e "${GREEN}✓ API 端点响应正常${NC}"
    else
        echo -e "${YELLOW}⚠️  API 端点可能还在初始化${NC}"
    fi
    
    echo ""
}

# 显示服务信息
show_service_info() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  部署完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}📋 服务信息:${NC}"
    echo -e "  服务器: ${DEPLOY_HOST}"
    echo -e "  后端目录: ${REMOTE_SERVER_DIR}"
    echo -e "  服务名称: ${SERVICE_NAME}"
    echo -e "  端口: ${PORT}"
    echo ""
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo -e "  后端地址: http://${DEPLOY_HOST}:${PORT}"
    echo -e "  健康检查: http://${DEPLOY_HOST}:${PORT}/health"
    echo -e "  API 端点: http://${DEPLOY_HOST}:${PORT}/api/experts"
    echo -e "  前端代理: http://${DEPLOY_HOST}/api/experts"
    echo ""
    echo -e "${BLUE}📝 PM2 管理命令:${NC}"
    echo -e "  pm2 list                    - 查看服务列表"
    echo -e "  pm2 logs ${SERVICE_NAME}   - 查看日志"
    echo -e "  pm2 restart ${SERVICE_NAME} - 重启服务"
    echo -e "  pm2 stop ${SERVICE_NAME}    - 停止服务"
    echo -e "  pm2 monit                   - 监控服务"
    echo ""
}

# 主函数
main() {
    check_local_server
    check_dependencies
    test_connection
    create_remote_directories
    upload_server_files
    install_dependencies
    check_pm2
    start_or_restart_service
    verify_service
    show_service_info
}

# 运行主函数
main "$@"

