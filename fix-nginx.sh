#!/bin/bash
# 修复 Nginx 配置脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/sgc_website"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复 Nginx 配置${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 使用 expect 执行 SSH 命令
exec_ssh() {
    expect <<EOF
set timeout 10
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "$1"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EOF
}

echo -e "${YELLOW}1. 检查当前 Nginx 配置...${NC}"
exec_ssh "cat ${NGINX_CONFIG_PATH} 2>/dev/null || echo '配置文件不存在'"

echo ""
echo -e "${YELLOW}2. 创建正确的 Nginx 配置...${NC}"
exec_ssh "cat > ${NGINX_CONFIG_PATH} <<'NGINXEOF'
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
        add_header Cache-Control \"public, immutable\";
    }
    
    # 主页面 - 直接返回 index.html，不重定向
    location / {
        try_files \$uri \$uri.html /index.html;
    }
    
    # 处理 HTML 文件
    location ~ \.html$ {
        add_header Cache-Control \"no-cache, no-store, must-revalidate\";
    }
    
    # 404 处理
    error_page 404 /404.html;
    
    # 安全头
    add_header X-Frame-Options \"SAMEORIGIN\" always;
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-XSS-Protection \"1; mode=block\" always;
    
    # 日志
    access_log /var/log/nginx/sgc_website_access.log;
    error_log /var/log/nginx/sgc_website_error.log;
}
NGINXEOF
"

echo ""
echo -e "${YELLOW}3. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t"

echo ""
echo -e "${YELLOW}4. 重启 Nginx...${NC}"
exec_ssh "systemctl restart nginx || service nginx restart"

echo ""
echo -e "${YELLOW}5. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl status nginx | head -10 || service nginx status | head -10"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "请测试访问: http://${DEPLOY_HOST}"

