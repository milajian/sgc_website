#!/bin/bash
# 简单更新 Nginx 配置脚本
# 直接使用 server-deploy.sh 中的配置更新服务器

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
echo -e "${GREEN}  更新 Nginx 配置（修复 403 错误）${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 执行 SSH 命令的函数（使用 expect）
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

# 读取 server-deploy.sh 中的配置并更新
echo -e "${YELLOW}1. 读取修复后的 Nginx 配置...${NC}"
NGINX_CONFIG=$(cat <<'NGINX_EOF'
server {
    listen 80;
    server_name _;
    
    root /var/www/sgc_website/dist;
    index index.html;
    
    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # API 反向代理到后端服务
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 增加超时时间，用于文件上传
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 支持大文件上传
        client_max_body_size 10M;
    }
    
    # 禁用目录索引，避免403错误
    autoindex off;
    
    # 处理尾部斜杠：重定向到不带斜杠的路径（除了根路径）
    # 使用精确匹配的 location，优先级高于 location /
    location ~ ^(.+)/$ {
        # 排除 API 路径
        if ($1 !~ ^/api) {
            return 301 $1;
        }
    }
    
    # 主页面 - 改进路径处理，避免403错误
    location / {
        # 如果请求路径是目录，直接尝试对应的 HTML 文件，避免自动添加斜杠
        if (-d $request_filename) {
            try_files $uri.html =404;
        }
        # 直接尝试 HTML 文件，避免匹配到目录导致403错误
        # 顺序：$uri.html（HTML文件） -> $uri（文件） -> /index.html（默认）
        try_files $uri.html $uri /index.html;
    }
    
    # 处理 HTML 文件 - 确保不会干扰主 location，只添加缓存头
    location ~ \.html$ {
        # 确保文件存在，如果不存在返回404而不是继续处理
        try_files $uri =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # 404 处理
    error_page 404 /404.html;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 日志
    access_log /var/log/nginx/sgc_website_access.log;
    error_log /var/log/nginx/sgc_website_error.log;
}
NGINX_EOF
)

# 将配置写入临时文件
TEMP_CONFIG="/tmp/nginx_sgc_config_$$"
echo "$NGINX_CONFIG" > "$TEMP_CONFIG"

# 上传配置文件
echo -e "${YELLOW}2. 上传 Nginx 配置到服务器...${NC}"
if [ "$USE_SSH_KEY" = true ] && [ -f "$SSH_KEY_PATH" ]; then
    scp -i "$SSH_KEY_PATH" $SSH_OPTS "$TEMP_CONFIG" "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/nginx_sgc_config"
else
    expect <<EXPECT_EOF
set timeout 30
spawn scp $SSH_OPTS "$TEMP_CONFIG" "${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/nginx_sgc_config"
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
EXPECT_EOF
fi

# 清理本地临时文件
rm -f "$TEMP_CONFIG"

# 备份并更新配置
echo -e "${YELLOW}3. 备份并更新服务器配置...${NC}"
exec_ssh "cp ${NGINX_CONFIG_PATH} ${NGINX_CONFIG_PATH}.backup.before_fix_403 2>/dev/null || true"
exec_ssh "cp /tmp/nginx_sgc_config ${NGINX_CONFIG_PATH}"

# 创建符号链接
echo -e "${YELLOW}4. 确保 Nginx 站点已启用...${NC}"
exec_ssh "ln -sf ${NGINX_CONFIG_PATH} ${NGINX_CONFIG_ENABLED}"

# 测试 Nginx 配置
echo -e "${YELLOW}5. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t" || {
    echo -e "${RED}错误: Nginx 配置测试失败${NC}"
    exit 1
}
echo -e "${GREEN}✓ Nginx 配置测试通过${NC}"

# 重启 Nginx
echo -e "${YELLOW}6. 重启 Nginx...${NC}"
exec_ssh "systemctl reload nginx || service nginx reload" || {
    echo -e "${YELLOW}尝试强制重启...${NC}"
    exec_ssh "systemctl restart nginx || service nginx restart"
}

# 检查 Nginx 状态
echo -e "${YELLOW}7. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl is-active nginx || pgrep -x nginx > /dev/null" && {
    echo -e "${GREEN}✓ Nginx 运行正常${NC}"
} || {
    echo -e "${RED}警告: Nginx 可能未正常运行${NC}"
}

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置更新完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试以下页面："
echo -e "  - http://${DEPLOY_HOST}/glass-substrate"
echo -e "  - http://${DEPLOY_HOST}/pcb-embedded"
echo -e "  - http://${DEPLOY_HOST}/pcb-coil-axial"
echo ""

