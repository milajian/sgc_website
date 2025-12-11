#!/bin/bash
# SGC 网站自动化部署脚本
# 支持 sshpass 或 expect 进行自动化部署

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 加载配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/deploy.config.sh" ]; then
    source "${SCRIPT_DIR}/deploy.config.sh"
else
    echo -e "${RED}错误: 找不到配置文件 deploy.config.sh${NC}"
    exit 1
fi

# 检测可用的认证方式
USE_SSHPASS=false
USE_EXPECT=false

# 检查依赖
check_dependencies() {
    echo -e "${YELLOW}检查依赖...${NC}"
    
    # 检查 rsync
    if ! command -v rsync &> /dev/null; then
        echo -e "${RED}错误: 未安装 rsync${NC}"
        exit 1
    fi
    
    # 如果使用SSH密钥且密钥存在，则不需要sshpass或expect
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        echo -e "${YELLOW}使用 SSH 密钥认证，跳过 sshpass/expect 检查${NC}"
        USE_SSHPASS=false
        USE_EXPECT=false
    # 检查 sshpass 或 expect
    elif command -v sshpass &> /dev/null; then
        USE_SSHPASS=true
        echo -e "${GREEN}✓ 使用 sshpass 进行认证${NC}"
    elif command -v expect &> /dev/null; then
        USE_EXPECT=true
        echo -e "${GREEN}✓ 使用 expect 进行认证${NC}"
    else
        echo -e "${RED}错误: 未安装 sshpass 或 expect，且未配置 SSH 密钥${NC}"
        echo "请安装其中一个工具:"
        echo "  macOS: brew install hudochenkov/sshpass/sshpass"
        echo "  Ubuntu/Debian: sudo apt-get install sshpass"
        echo "  或 expect (macOS 通常已预装)"
        echo "  或配置 SSH 密钥认证"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 依赖检查通过${NC}"
}

# 执行 SSH 命令（自动选择认证方式）
exec_ssh() {
    local cmd="$1"
    
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        ssh -i "$SSH_KEY_PATH" $SSH_OPTS "${DEPLOY_USER}@${DEPLOY_HOST}" "$cmd"
    elif [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "${DEPLOY_USER}@${DEPLOY_HOST}" "$cmd"
    elif [ "$USE_EXPECT" = true ]; then
        # 将命令用单引号包裹以避免 expect 解析问题
        local safe_cmd=$(echo "$cmd" | sed "s/'/'\\\\''/g")
        # 使用 expect 的 send 命令直接发送密码，避免转义问题
        expect <<EOF
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
EOF
    fi
}

# 执行 rsync 同步
exec_rsync() {
    local src="$1"
    local dst="$2"
    local rsync_opts="-avz --delete --exclude='.git'"
    
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        rsync $rsync_opts -e "ssh -i $SSH_KEY_PATH $SSH_OPTS" "$src" "$dst"
    elif [ "$USE_SSHPASS" = true ]; then
        rsync $rsync_opts -e "sshpass -p '$DEPLOY_PASSWORD' ssh $SSH_OPTS" "$src" "$dst"
    elif [ "$USE_EXPECT" = true ]; then
        # 使用 expect 包装 rsync
        expect <<EOF
set timeout 300
spawn rsync $rsync_opts -e "ssh $SSH_OPTS" "$src" "$dst"
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
EOF
    fi
}

# 构建项目
build_project() {
    echo -e "${YELLOW}开始构建项目...${NC}"
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}错误: 找不到 package.json${NC}"
        exit 1
    fi
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}安装依赖...${NC}"
        npm install
    fi
    
    # 构建项目 - 部署到IP地址时不使用basePath
    echo -e "${YELLOW}执行构建（IP地址部署，不使用basePath）...${NC}"
    BASE_PATH= NEXT_PUBLIC_BASE_PATH= NODE_ENV=production npm run build
    
    if [ ! -d "${LOCAL_BUILD_DIR}" ]; then
        echo -e "${RED}错误: 构建输出目录不存在: ${LOCAL_BUILD_DIR}${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 构建完成${NC}"
}

# 测试服务器连接
test_connection() {
    echo -e "${YELLOW}测试服务器连接...${NC}"
    
    if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
        echo "使用 SSH 密钥认证"
    else
        echo "使用密码认证"
    fi
    
    exec_ssh "echo '连接成功'" || {
        echo -e "${RED}错误: 服务器连接失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}✓ 服务器连接成功${NC}"
}

# 创建服务器目录结构
setup_remote_dirs() {
    echo -e "${YELLOW}创建服务器目录结构...${NC}"
    
    local cmd="mkdir -p ${REMOTE_WEB_DIR} ${REMOTE_BACKUP_DIR}"
    exec_ssh "$cmd"
    
    echo -e "${GREEN}✓ 目录结构创建完成${NC}"
}

# 备份现有文件
backup_remote() {
    echo -e "${YELLOW}备份现有文件...${NC}"
    
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="${REMOTE_BACKUP_DIR}/backup_${timestamp}"
    
    # 使用多个简单命令避免 expect 解析复杂命令的问题
    local check_cmd="test -d ${REMOTE_WEB_DIR}"
    local has_files_cmd="ls -A ${REMOTE_WEB_DIR} 2>/dev/null | head -1"
    local backup_cmd="cp -r ${REMOTE_WEB_DIR} ${backup_path} && echo backup_success_${backup_path} || echo backup_failed"
    
    # 先检查目录是否存在
    if exec_ssh "$check_cmd" >/dev/null 2>&1; then
        # 检查目录是否有文件
        if exec_ssh "$has_files_cmd" >/dev/null 2>&1; then
            # 执行备份
            exec_ssh "$backup_cmd"
            echo -e "${GREEN}✓ 备份完成${NC}"
        else
            echo -e "${YELLOW}无需备份（目录为空）${NC}"
        fi
    else
        echo -e "${YELLOW}无需备份（目录不存在）${NC}"
    fi
}

# 清理旧备份
cleanup_old_backups() {
    echo -e "${YELLOW}清理旧备份...${NC}"
    
    local cmd="find ${REMOTE_BACKUP_DIR} -type d -name 'backup_*' -mtime +${BACKUP_RETENTION_DAYS} -exec rm -rf {} + 2>/dev/null || true"
    
    exec_ssh "$cmd"
    
    echo -e "${GREEN}✓ 旧备份清理完成${NC}"
}

# 同步文件到服务器
sync_files() {
    echo -e "${YELLOW}同步文件到服务器...${NC}"
    
    exec_rsync "${LOCAL_BUILD_DIR}/" "${DEPLOY_USER}@${DEPLOY_HOST}:${REMOTE_WEB_DIR}/"
    
    echo -e "${GREEN}✓ 文件同步完成${NC}"
}

# 设置文件权限
set_permissions() {
    echo -e "${YELLOW}设置文件权限...${NC}"
    
    # 设置基本权限
    exec_ssh "chmod -R 755 ${REMOTE_WEB_DIR}"
    
    # 尝试设置文件所有者（如果用户存在）
    exec_ssh "chown -R www-data:www-data ${REMOTE_WEB_DIR} 2>/dev/null || chown -R nginx:nginx ${REMOTE_WEB_DIR} 2>/dev/null || chown -R apache:apache ${REMOTE_WEB_DIR} 2>/dev/null || true"
    
    echo -e "${GREEN}✓ 权限设置完成${NC}"
}

# 主函数
main() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  SGC 网站自动化部署${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    
    check_dependencies
    build_project
    test_connection
    setup_remote_dirs
    backup_remote
    cleanup_old_backups
    sync_files
    set_permissions
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  部署完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "网站地址: http://${DEPLOY_HOST}"
    echo -e "部署路径: ${REMOTE_WEB_DIR}"
}

# 运行主函数
main "$@"

