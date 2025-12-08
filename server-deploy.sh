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
    
    cat > "$NGINX_CONFIG_PATH" <<EOF
server {
    listen 80;
    server_name ${DOMAIN} ${DOMAIN}.*;
    
    root ${WEB_DIR};
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
    
    # 主页面
    location / {
        try_files \$uri \$uri/ /index.html;
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


