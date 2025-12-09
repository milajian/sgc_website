#!/bin/bash

echo "🚀 启动前端和后端 Ngrok 隧道"
echo "=============================="
echo ""

export PATH="$HOME/bin:$PATH"

# 检查服务
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "❌ 前端服务未运行，请先启动: npm run dev"
    exit 1
fi

if ! lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
    echo "❌ 后端服务未运行，请先启动: cd server && npm run dev"
    exit 1
fi

# 停止所有 ngrok
pkill ngrok
sleep 2

echo "📡 步骤1: 启动后端 ngrok 并获取地址..."
ngrok http 3001 > /tmp/ngrok-backend.log 2>&1 &
sleep 8

BACKEND_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "import sys, json; data = json.load(sys.stdin); tunnels = [t for t in data.get('tunnels', []) if '3001' in str(t.get('config', {}).get('addr', ''))]; print(tunnels[0]['public_url'] if tunnels else '')" 2>/dev/null)

if [ -z "$BACKEND_URL" ]; then
    echo "❌ 无法获取后端地址，请检查日志: tail -f /tmp/ngrok-backend.log"
    exit 1
fi

echo "✅ 后端地址: $BACKEND_URL"
echo ""

# 更新 .env.local
echo "📝 更新 .env.local..."
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > /Users/jianjian/main/sgc_website/.env.local
echo "✅ 已更新 .env.local: NEXT_PUBLIC_API_URL=$BACKEND_URL"
echo ""

# 停止后端 ngrok
echo "🛑 停止后端 ngrok，准备启动前端..."
pkill ngrok
sleep 2

# 启动前端 ngrok
echo "📡 步骤2: 启动前端 ngrok..."
nohup ngrok http 3000 > /tmp/ngrok-frontend.log 2>&1 &
sleep 6

FRONTEND_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "import sys, json; data = json.load(sys.stdin); tunnels = [t for t in data.get('tunnels', []) if '3000' in str(t.get('config', {}).get('addr', ''))]; print(tunnels[0]['public_url'] if tunnels else '')" 2>/dev/null)

if [ -z "$FRONTEND_URL" ]; then
    echo "⚠️  无法获取前端地址，请检查日志: tail -f /tmp/ngrok-frontend.log"
else
    echo "✅ 前端地址: $FRONTEND_URL"
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║                    ✅ 配置完成！                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "📋 配置信息："
echo "   后端 API: $BACKEND_URL"
echo "   前端地址: ${FRONTEND_URL:-等待中...}"
echo ""
echo "🌐 管理后台访问地址："
echo "   ${FRONTEND_URL:-等待中...}/admin"
echo ""
echo "📝 重要："
echo "   1. .env.local 已更新为后端 ngrok 地址"
echo "   2. 请重启前端服务: npm run dev"
echo "   3. 然后就可以通过前端地址访问并修改内容了"
echo ""
echo "💡 提示："
echo "   - 查看日志: tail -f /tmp/ngrok-frontend.log"
echo "   - 查看状态: http://localhost:4040"
echo "   - 停止 ngrok: pkill ngrok"



