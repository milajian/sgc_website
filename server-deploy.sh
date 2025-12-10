#!/bin/bash
# 服务器端部署脚本
# 此脚本将被上传到服务器并执行，用于配置 Nginx 等

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 配置变量（将从环境变量或参数获取）
WEB_DIR="${1:-/var/www/sgc_website/dist}"
NGINX_CONFIG_PATH="${2:-/etc/nginx/sites-available/sgc_website}"
DOMAIN="${3:-sgc-website.com}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  服务器端部署配置${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}错误: 请使用 root 权限运行此脚本${NC}"
    exit 1
fi

# 安装 Nginx（如果未安装）
install_nginx() {
    echo -e "${YELLOW}检查 Nginx 安装...${NC}"
    
    if ! command -v nginx &> /dev/null; then
        echo -e "${YELLOW}安装 Nginx...${NC}"
        
        if command -v apt-get &> /dev/null; then
            apt-get update
            apt-get install -y nginx
        elif command -v yum &> /dev/null; then
            yum install -y nginx
        else
            echo -e "${RED}错误: 无法识别包管理器${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}✓ Nginx 安装完成${NC}"
    else
        echo -e "${GREEN}✓ Nginx 已安装${NC}"
    fi
}

# 创建 Nginx 配置
create_nginx_config() {
    echo -e "${YELLOW}创建 Nginx 配置...${NC}"
    
    cat > "$NGINX_CONFIG_PATH" <<'EOF'
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
EOF
    
    echo -e "${GREEN}✓ Nginx 配置已创建: ${NGINX_CONFIG_PATH}${NC}"
}

# 启用 Nginx 站点
enable_nginx_site() {
    echo -e "${YELLOW}启用 Nginx 站点...${NC}"
    
    local enabled_path="/etc/nginx/sites-enabled/sgc_website"
    
    # 创建符号链接
    if [ ! -L "$enabled_path" ]; then
        ln -s "$NGINX_CONFIG_PATH" "$enabled_path"
        echo -e "${GREEN}✓ 站点已启用${NC}"
    else
        echo -e "${YELLOW}站点已启用${NC}"
    fi
}

# 测试 Nginx 配置
test_nginx_config() {
    echo -e "${YELLOW}测试 Nginx 配置...${NC}"
    
    nginx -t || {
        echo -e "${RED}错误: Nginx 配置测试失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}✓ Nginx 配置测试通过${NC}"
}

# 重启 Nginx
restart_nginx() {
    echo -e "${YELLOW}重启 Nginx...${NC}"
    
    systemctl restart nginx || service nginx restart
    
    # 检查状态
    if systemctl is-active --quiet nginx || pgrep -x nginx > /dev/null; then
        echo -e "${GREEN}✓ Nginx 已重启${NC}"
    else
        echo -e "${RED}警告: Nginx 可能未正常运行${NC}"
    fi
}

# 设置防火墙（可选）
setup_firewall() {
    echo -e "${YELLOW}配置防火墙...${NC}"
    
    # 检查是否有 ufw
    if command -v ufw &> /dev/null; then
        ufw allow 80/tcp
        ufw allow 443/tcp
        echo -e "${GREEN}✓ 防火墙规则已添加${NC}"
    elif command -v firewall-cmd &> /dev/null; then
        firewall-cmd --permanent --add-service=http
        firewall-cmd --permanent --add-service=https
        firewall-cmd --reload
        echo -e "${GREEN}✓ 防火墙规则已添加${NC}"
    else
        echo -e "${YELLOW}未检测到防火墙工具，跳过${NC}"
    fi
}

# 主函数
main() {
    install_nginx
    create_nginx_config
    enable_nginx_site
    test_nginx_config
    restart_nginx
    setup_firewall
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  服务器配置完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "网站目录: ${WEB_DIR}"
    echo -e "Nginx 配置: ${NGINX_CONFIG_PATH}"
    echo -e "域名: ${DOMAIN}"
    echo ""
    echo -e "可以通过以下命令查看 Nginx 状态:"
    echo -e "  systemctl status nginx"
    echo ""
    echo -e "查看访问日志:"
    echo -e "  tail -f /var/log/nginx/sgc_website_access.log"
}

main "$@"


