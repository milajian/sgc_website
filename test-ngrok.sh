#!/bin/bash

echo "🧪 Ngrok 连接测试"
echo "=================="
echo ""

# 确保 PATH 包含 ~/bin
export PATH="$HOME/bin:$PATH"

# 检查 ngrok 是否可用
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok 未找到"
    exit 1
fi

# 检查 authtoken 是否配置
if ! ngrok config check &>/dev/null; then
    echo "❌ authtoken 未配置"
    echo ""
    echo "请先运行: ./setup-ngrok-auth.sh"
    exit 1
fi

echo "✅ ngrok 已安装: $(ngrok version | head -1)"
echo "✅ authtoken 已配置"
echo ""

# 检查服务是否运行
echo "📋 检查服务状态..."
FRONTEND_RUNNING=false
BACKEND_RUNNING=false

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ 前端服务: 运行中 (端口 3000)"
    FRONTEND_RUNNING=true
else
    echo "   ❌ 前端服务: 未运行"
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ 后端服务: 运行中 (端口 3001)"
    BACKEND_RUNNING=true
else
    echo "   ❌ 后端服务: 未运行"
fi

echo ""

if [ "$FRONTEND_RUNNING" = false ] || [ "$BACKEND_RUNNING" = false ]; then
    echo "⚠️  请先启动服务："
    [ "$FRONTEND_RUNNING" = false ] && echo "   前端: npm run dev"
    [ "$BACKEND_RUNNING" = false ] && echo "   后端: cd server && npm run dev"
    exit 1
fi

echo "🚀 准备启动 ngrok..."
echo ""
echo "这将启动两个 ngrok 隧道："
echo "  - 前端: http://localhost:3000 -> ngrok 地址"
echo "  - 后端: http://localhost:3001 -> ngrok 地址"
echo ""
read -p "按 Enter 继续，或 Ctrl+C 取消..."

./start-ngrok-local.sh

echo ""
echo "📝 下一步："
echo "   1. 查看终端输出，复制后端 ngrok 地址"
echo "   2. 更新 .env.local: NEXT_PUBLIC_API_URL=https://后端ngrok地址"
echo "   3. 重启前端服务"
echo "   4. 分享前端 ngrok 地址给其他人"

