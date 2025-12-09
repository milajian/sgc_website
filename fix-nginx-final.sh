#!/bin/bash
# 最终修复 Nginx 配置脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_MAIN_CONFIG="/etc/nginx/nginx.conf"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  最终修复 Nginx 配置${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

exec_ssh() {
    expect <<EOF
set timeout 30
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

echo -e "${YELLOW}1. 备份主配置文件...${NC}"
exec_ssh "cp ${NGINX_MAIN_CONFIG} ${NGINX_MAIN_CONFIG}.backup.final.$(date +%Y%m%d_%H%M%S)"

echo ""
echo -e "${YELLOW}2. 查找并替换 server 块...${NC}"
# 先上传新的 server 块配置
expect <<EOF
set timeout 30
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null nginx-main-server.conf ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/nginx-server-block.conf
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EOF

echo ""
echo -e "${YELLOW}3. 替换主配置文件中的 server 块...${NC}"
exec_ssh "python3 << 'PYTHONEOF'
import re

# 读取配置文件
with open('${NGINX_MAIN_CONFIG}', 'r') as f:
    content = f.read()

# 读取新的 server 块
with open('/tmp/nginx-server-block.conf', 'r') as f:
    new_server_block = f.read()

# 替换 server 块（匹配从 server { 开始到对应的 } 结束）
# 使用正则表达式匹配整个 server 块
pattern = r'server\s*\{[^}]*\{[^}]*\}[^}]*\}'  # 简单匹配
# 更精确的匹配：找到 server { 到对应的 }
server_pattern = r'server\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'

# 查找所有 server 块
matches = list(re.finditer(server_pattern, content, re.DOTALL))
if matches:
    # 找到第一个 server 块（通常是我们要替换的）
    first_match = matches[0]
    # 替换
    content = content[:first_match.start()] + new_server_block + content[first_match.end():]
    
    # 写回文件
    with open('${NGINX_MAIN_CONFIG}', 'w') as f:
        f.write(content)
    print('Server block replaced successfully')
else:
    print('No server block found')
PYTHONEOF
"

echo ""
echo -e "${YELLOW}4. 如果 Python 不可用，使用 sed 方法...${NC}"
exec_ssh "sed -i '/^server {/,/^}/c\
server {\
    listen       80;\
    listen       [::]:80;\
    server_name  47.106.73.160;\
    root /var/www/sgc_website/dist;\
    index index.html;\
    gzip on;\
    gzip_vary on;\
    gzip_min_length 1024;\
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;\
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|pdf|svg)$ {\
        expires 30d;\
        add_header Cache-Control \"public, immutable\";\
    }\
    location / {\
        try_files \$uri \$uri.html /index.html;\
    }\
    location ~ \\.html$ {\
        add_header Cache-Control \"no-cache, no-store, must-revalidate\";\
    }\
    error_page 404 /404.html;\
    add_header X-Frame-Options \"SAMEORIGIN\" always;\
    add_header X-Content-Type-Options \"nosniff\" always;\
    add_header X-XSS-Protection \"1; mode=block\" always;\
    access_log /var/log/nginx/sgc_website_access.log;\
    error_log /var/log/nginx/sgc_website_error.log;\
}' ${NGINX_MAIN_CONFIG}"

echo ""
echo -e "${YELLOW}5. 测试 Nginx 配置...${NC}"
exec_ssh "nginx -t"

echo ""
echo -e "${YELLOW}6. 重启 Nginx...${NC}"
exec_ssh "systemctl restart nginx || service nginx restart"

echo ""
echo -e "${YELLOW}7. 检查 Nginx 状态...${NC}"
exec_ssh "systemctl status nginx | head -5"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx 配置修复完成！${NC}"
echo -e "${GREEN}========================================${NC}"

