#!/bin/bash

echo "🔐 Ngrok Authtoken 配置助手"
echo "============================"
echo ""

# 确保 PATH 包含 ~/bin
export PATH="$HOME/bin:$PATH"

# 检查 ngrok 是否可用
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok 未找到"
    echo "请先运行: ./install-ngrok.sh"
    exit 1
fi

echo "✅ ngrok 已安装: $(ngrok version | head -1)"
echo ""

# 检查是否已配置 authtoken
if ngrok config check &>/dev/null; then
    echo "✅ authtoken 已配置"
    echo ""
    echo "可以直接启动 ngrok："
    echo "  ./start-ngrok-local.sh"
    exit 0
fi

echo "📝 需要配置 authtoken"
echo ""
echo "请按以下步骤操作："
echo ""
echo "1️⃣  注册 ngrok 账号（如果还没有）"
echo "   访问: https://dashboard.ngrok.com/signup"
echo ""
echo "2️⃣  获取 authtoken"
echo "   访问: https://dashboard.ngrok.com/get-started/your-authtoken"
echo "   登录后复制你的 authtoken"
echo ""
read -p "3️⃣  请输入你的 authtoken: " authtoken

if [ -z "$authtoken" ]; then
    echo "❌ authtoken 不能为空"
    exit 1
fi

echo ""
echo "正在配置 authtoken..."
ngrok config add-authtoken "$authtoken"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ authtoken 配置成功！"
    echo ""
    echo "🚀 现在可以启动 ngrok："
    echo "   ./start-ngrok-local.sh"
else
    echo ""
    echo "❌ 配置失败，请检查："
    echo "   1. authtoken 是否正确"
    echo "   2. 网络连接是否正常"
    echo "   3. 手动运行: ngrok config add-authtoken YOUR_AUTHTOKEN"
fi

