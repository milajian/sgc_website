#!/bin/bash

echo "🔧 Ngrok 安装脚本"
echo "=================="
echo ""

# 检查是否已安装
if command -v ngrok &> /dev/null; then
    echo "✅ ngrok 已安装"
    ngrok version
    exit 0
fi

echo "📥 开始安装 ngrok..."
echo ""

# 检测系统架构
ARCH=$(uname -m)
if [ "$ARCH" == "arm64" ]; then
    NGROK_URL="https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-arm64.zip"
    echo "检测到 Apple Silicon (ARM64)"
else
    NGROK_URL="https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-amd64.zip"
    echo "检测到 Intel (AMD64)"
fi

# 创建临时目录
TMP_DIR=$(mktemp -d)
cd "$TMP_DIR"

echo "下载 ngrok..."
curl -L -o ngrok.zip "$NGROK_URL"

if [ $? -ne 0 ]; then
    echo "❌ 下载失败，请手动下载："
    echo "   访问: https://ngrok.com/download"
    exit 1
fi

echo "解压文件..."
unzip -q ngrok.zip

if [ $? -ne 0 ]; then
    echo "❌ 解压失败"
    exit 1
fi

echo "安装到 /usr/local/bin/..."
sudo mv ngrok /usr/local/bin/

if [ $? -ne 0 ]; then
    echo "⚠️  需要管理员权限，请手动执行："
    echo "   sudo mv $TMP_DIR/ngrok /usr/local/bin/"
    rm -rf "$TMP_DIR"
    exit 1
fi

# 清理
rm -rf "$TMP_DIR"

echo ""
echo "✅ ngrok 安装成功！"
echo ""
echo "📝 下一步："
echo "   1. 注册账号: https://dashboard.ngrok.com/signup"
echo "   2. 获取 authtoken: https://dashboard.ngrok.com/get-started/your-authtoken"
echo "   3. 配置: ngrok config add-authtoken YOUR_AUTHTOKEN"
echo ""
echo "🚀 然后运行: ./start-ngrok.sh"

