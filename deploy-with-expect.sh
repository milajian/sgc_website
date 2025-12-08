#!/bin/bash
# 使用 expect 的部署脚本（不需要 sshpass）

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 加载配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/deploy.config.sh" ]; then
    source "${SCRIPT_DIR}/deploy.config.sh"
else
    echo -e "${RED}错误: 找不到配置文件 deploy.config.sh${NC}"
    exit 1
fi

# 检查 expect
if ! command -v expect &> /dev/null; then
    echo -e "${RED}错误: 未安装 expect${NC}"
    exit 1
fi

# 使用 expect 执行 SSH 命令
ssh_with_expect() {
    local cmd="$1"
    expect <<EOF
set timeout 60
spawn ssh $SSH_OPTS ${DEPLOY_USER}@${DEPLOY_HOST} "$cmd"
expect {
    "password:" {
        send -- "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "Password:" {
        send -- "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    timeout {
        exit 1
    }
    eof {
        catch wait result
        exit [lindex \$result 3]
    }
}
EOF
}

# 使用 expect 执行 rsync
rsync_with_expect() {
    local source="$1"
    local dest="$2"
    expect <<EOF
set timeout 600
spawn rsync -avz --delete --exclude='.git' -e "ssh $SSH_OPTS" "$source" "${DEPLOY_USER}@${DEPLOY_HOST}:$dest"
expect {
    "password:" {
        send -- "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "Password:" {
        send -- "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    timeout {
        exit 1
    }
    eof {
        catch wait result
        exit [lindex \$result 3]
    }
}
EOF
}

# 测试连接
test_connection() {
    echo -e "${YELLOW}测试服务器连接...${NC}"
    if ssh_with_expect "echo '连接成功'" > /tmp/ssh_test.log 2>&1; then
        echo -e "${GREEN}✓ 服务器连接成功${NC}"
        return 0
    else
        echo -e "${RED}错误: 服务器连接失败${NC}"
        cat /tmp/ssh_test.log 2>/dev/null || true
        return 1
    fi
}

# 创建服务器目录
setup_remote_dirs() {
    echo -e "${YELLOW}创建服务器目录结构...${NC}"
    ssh_with_expect "mkdir -p ${REMOTE_WEB_DIR} ${REMOTE_BACKUP_DIR}" > /dev/null 2>&1
    echo -e "${GREEN}✓ 目录结构创建完成${NC}"
}

# 备份现有文件
backup_remote() {
    echo -e "${YELLOW}备份现有文件...${NC}"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="${REMOTE_BACKUP_DIR}/backup_${timestamp}"
    
    ssh_with_expect "if [ -d '${REMOTE_WEB_DIR}' ] && [ \"\$(ls -A ${REMOTE_WEB_DIR})\" ]; then cp -r ${REMOTE_WEB_DIR} ${backup_path} && echo '备份完成' || echo '备份失败'; else echo '无需备份'; fi" > /dev/null 2>&1
    echo -e "${GREEN}✓ 备份完成${NC}"
}

# 同步文件
sync_files() {
    echo -e "${YELLOW}同步文件到服务器...${NC}"
    rsync_with_expect "${LOCAL_BUILD_DIR}/" "${REMOTE_WEB_DIR}/"
    echo -e "${GREEN}✓ 文件同步完成${NC}"
}

# 设置权限
set_permissions() {
    echo -e "${YELLOW}设置文件权限...${NC}"
    ssh_with_expect "chown -R www-data:www-data ${REMOTE_WEB_DIR} && chmod -R 755 ${REMOTE_WEB_DIR}" > /dev/null 2>&1
    echo -e "${GREEN}✓ 权限设置完成${NC}"
}

# 构建项目
build_project() {
    echo -e "${YELLOW}开始构建项目...${NC}"
    if [ ! -f "package.json" ]; then
        echo -e "${RED}错误: 找不到 package.json${NC}"
        exit 1
    fi
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}安装依赖...${NC}"
        npm install
    fi
    
    echo -e "${YELLOW}执行构建...${NC}"
    npm run build
    
    if [ ! -d "${LOCAL_BUILD_DIR}" ]; then
        echo -e "${RED}错误: 构建输出目录不存在: ${LOCAL_BUILD_DIR}${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 构建完成${NC}"
}

# 主函数
main() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  SGC 网站自动化部署 (使用 expect)${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    
    build_project
    test_connection || exit 1
    setup_remote_dirs
    backup_remote
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

main "$@"

