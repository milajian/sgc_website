#!/bin/bash
# 部署更新后的 Nginx 配置到服务器

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_HOST="47.106.73.160"
DEPLOY_USER="root"
DEPLOY_PASSWORD="Botool=300739"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/sgc_website"
CONFIG_FILE="nginx-main-server.conf"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署 Nginx 配置${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}错误: 找不到配置文件 $CONFIG_FILE${NC}"
    exit 1
fi

# 上传配置文件
echo -e "${YELLOW}1. 上传配置文件到服务器...${NC}"
expect <<EXPECT_EOF
set timeout 30
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$CONFIG_FILE" ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/nginx_sgc_config
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

# 备份并更新配置
echo -e "${YELLOW}2. 备份并更新服务器配置...${NC}"
DEPLOY_SCRIPT=$(cat <<'SCRIPT_EOF'
#!/bin/bash
NGINX_CONFIG_PATH="/etc/nginx/sites-available/sgc_website"
cp "$NGINX_CONFIG_PATH" "${NGINX_CONFIG_PATH}.backup.$(date +%Y%m%d_%H%M%S)" 2>/dev/null || true
cp /tmp/nginx_sgc_config "$NGINX_CONFIG_PATH"
nginx -t
SCRIPT_EOF
)

TEMP_SCRIPT="/tmp/deploy_nginx_$$.sh"
echo "$DEPLOY_SCRIPT" > "$TEMP_SCRIPT"

expect <<EXPECT_EOF
set timeout 30
spawn scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$TEMP_SCRIPT" ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/deploy_nginx.sh
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

expect <<EXPECT_EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "bash /tmp/deploy_nginx.sh"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

rm -f "$TEMP_SCRIPT"

# 重新加载 Nginx
echo -e "${YELLOW}3. 重新加载 Nginx...${NC}"
expect <<EXPECT_EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${DEPLOY_USER}@${DEPLOY_HOST} "systemctl reload nginx"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    eof
}
EXPECT_EOF

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}测试访问以下路径：${NC}"
echo "  - http://47.106.73.160/glass-substrate/"
echo "  - http://47.106.73.160/pcb-embedded/"
echo "  - http://47.106.73.160/pcb-coil-product-lines/"

