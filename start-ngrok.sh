#!/bin/bash

echo "🚀 启动 ngrok 内网穿透..."

# 检查 ngrok 是否安装
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok 未安装"
    echo ""
    echo "请先安装 ngrok："
    echo "  macOS: brew install ngrok"
    echo "  或访问: https://ngrok.com/download"
    echo ""
    echo "然后配置 authtoken："
    echo "  ngrok config add-authtoken YOUR_AUTHTOKEN"
    echo "  获取 token: https://dashboard.ngrok.com/get-started/your-authtoken"
    exit 1
fi

# 检查后端服务是否运行
if ! lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  后端服务未运行在 3001 端口"
    echo "请先启动后端服务: cd server && npm run dev"
    exit 1
fi

# 检查前端服务是否运行
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  前端服务未运行在 3000 端口"
    echo "请先启动前端服务: npm run dev"
    exit 1
fi

# 启动后端 ngrok（后台运行）
echo "📡 启动后端 ngrok 隧道 (端口 3001)..."
ngrok http 3001 > /tmp/ngrok-backend.log 2>&1 &
BACKEND_NGROK_PID=$!

# 等待一下让 ngrok 启动
sleep 3

# 启动前端 ngrok（后台运行）
echo "📡 启动前端 ngrok 隧道 (端口 3000)..."
ngrok http 3000 > /tmp/ngrok-frontend.log 2>&1 &
FRONTEND_NGROK_PID=$!

sleep 2

echo ""
echo "✅ Ngrok 隧道已启动！"
echo ""
echo "📋 查看隧道信息："
echo "   后端: tail -f /tmp/ngrok-backend.log"
echo "   前端: tail -f /tmp/ngrok-frontend.log"
echo ""
echo "🌐 获取访问地址："
echo "   访问 http://localhost:4040 查看前端隧道"
echo "   访问 http://localhost:4041 查看后端隧道（如果可用）"
echo ""
echo "📝 重要步骤："
echo "   1. 复制后端 ngrok 的 HTTPS 地址"
echo "   2. 更新 .env.local 文件: NEXT_PUBLIC_API_URL=https://你的后端ngrok地址"
echo "   3. 重启前端服务"
echo ""
echo "🛑 停止隧道: kill $BACKEND_NGROK_PID $FRONTEND_NGROK_PID"
echo "   或运行: pkill ngrok"

