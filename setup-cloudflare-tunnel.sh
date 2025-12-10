#!/bin/bash
# Cloudflare Tunnel 安装和配置脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Cloudflare Tunnel 安装脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检测操作系统
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo -e "${RED}无法检测操作系统${NC}"
    exit 1
fi

echo -e "${YELLOW}检测到操作系统: $OS${NC}"

# 安装 cloudflared
install_cloudflared() {
    echo -e "${YELLOW}正在安装 cloudflared...${NC}"
    
    ARCH=$(uname -m)
    if [ "$ARCH" = "x86_64" ]; then
        ARCH="amd64"
    elif [ "$ARCH" = "aarch64" ]; then
        ARCH="arm64"
    else
        echo -e "${RED}不支持的架构: $ARCH${NC}"
        exit 1
    fi
    
    # 下载最新版本
    VERSION=$(curl -s https://api.github.com/repos/cloudflare/cloudflared/releases/latest | grep tag_name | cut -d '"' -f 4)
    echo -e "${YELLOW}下载 cloudflared $VERSION...${NC}"
    
    cd /tmp
    wget -q "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-${ARCH}.deb" -O cloudflared.deb
    
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        sudo dpkg -i cloudflared.deb || sudo apt-get install -f -y
    else
        echo -e "${YELLOW}非 Debian/Ubuntu 系统，请手动安装${NC}"
        echo "下载的文件在: /tmp/cloudflared.deb"
    fi
    
    rm -f cloudflared.deb
    
    # 验证安装
    if command -v cloudflared &> /dev/null; then
        echo -e "${GREEN}✓ cloudflared 安装成功${NC}"
        cloudflared --version
    else
        echo -e "${RED}✗ cloudflared 安装失败${NC}"
        exit 1
    fi
}

# 检查是否已安装
if command -v cloudflared &> /dev/null; then
    echo -e "${GREEN}✓ cloudflared 已安装${NC}"
    cloudflared --version
else
    install_cloudflared
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  安装完成${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}下一步：${NC}"
echo "1. 访问 https://one.dash.cloudflare.com/"
echo "2. 登录并创建 Tunnel"
echo "3. 按照 Dashboard 中的说明配置和运行 Tunnel"
echo ""
echo -e "${YELLOW}参考文档：${NC}"
echo "- cloudflare-tunnel-setup.md"

