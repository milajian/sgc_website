#!/bin/bash
# 部署配置文件
# 请根据实际情况修改以下配置

# 获取脚本目录（用于定位 server_info.db）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 从 server_info.db 读取服务器配置的函数
load_server_info() {
    local db_file="${SCRIPT_DIR}/server_info.db"
    
    if [ -f "$db_file" ]; then
        # 使用纯 bash 解析 JSON（避免依赖外部工具）
        # 提取 server_ip
        local server_ip=$(grep -o '"server_ip"[[:space:]]*:[[:space:]]*"[^"]*"' "$db_file" | sed 's/.*"\([^"]*\)".*/\1/')
        # 提取 username
        local username=$(grep -o '"username"[[:space:]]*:[[:space:]]*"[^"]*"' "$db_file" | sed 's/.*"\([^"]*\)".*/\1/')
        # 提取 password（需要处理特殊字符）
        local password=$(grep -o '"password"[[:space:]]*:[[:space:]]*"[^"]*"' "$db_file" | sed 's/.*"\([^"]*\)".*/\1/')
        # 提取 connection_method
        local connection_method=$(grep -o '"connection_method"[[:space:]]*:[[:space:]]*"[^"]*"' "$db_file" | sed 's/.*"\([^"]*\)".*/\1/')
        
        # 如果成功解析，则使用解析的值
        if [ -n "$server_ip" ]; then
            export DEPLOY_HOST="$server_ip"
        fi
        if [ -n "$username" ]; then
            export DEPLOY_USER="$username"
        fi
        if [ -n "$password" ]; then
            export DEPLOY_PASSWORD="$password"
        fi
        if [ -n "$connection_method" ]; then
            export CONNECTION_METHOD="$connection_method"
        fi
        
        return 0
    else
        return 1
    fi
}

# 默认服务器信息（如果 server_info.db 不存在则使用）
DEPLOY_HOST_DEFAULT="47.106.73.160"
DEPLOY_USER_DEFAULT="root"
DEPLOY_PASSWORD_DEFAULT="Botool=300739"

# 尝试从 server_info.db 加载配置
if ! load_server_info; then
    # 如果加载失败，使用默认值
    export DEPLOY_HOST="$DEPLOY_HOST_DEFAULT"
    export DEPLOY_USER="$DEPLOY_USER_DEFAULT"
    export DEPLOY_PASSWORD="$DEPLOY_PASSWORD_DEFAULT"
fi

# 部署路径配置
export REMOTE_BASE_DIR="/var/www/sgc_website"
export REMOTE_WEB_DIR="${REMOTE_BASE_DIR}/dist"
export REMOTE_BACKUP_DIR="${REMOTE_BASE_DIR}/backups"

# 本地构建输出目录
export LOCAL_BUILD_DIR="./out"

# Nginx 配置（如果需要）
export NGINX_CONFIG_PATH="/etc/nginx/sites-available/sgc_website"
export NGINX_CONFIG_ENABLED="/etc/nginx/sites-enabled/sgc_website"

# 备份保留天数
export BACKUP_RETENTION_DAYS=7

# SSH 选项
export SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

# 是否使用 SSH 密钥（如果设置为 true，将优先使用密钥认证）
export USE_SSH_KEY=false
export SSH_KEY_PATH="$HOME/.ssh/id_rsa_sgc"

