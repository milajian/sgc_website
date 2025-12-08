#!/bin/bash

echo "🔄 重启 Ngrok 隧道"
echo "=================="
echo ""

export PATH="$HOME/bin:$PATH"

# 检查前端服务
if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "❌ 前端服务未运行"
    echo "请先启动前端服务: npm run dev"
    exit 1
fi

# 停止旧的 ngrok
echo "停止旧的 ngrok 进程..."
pkill ngrok
sleep 2

# 启动新的 ngrok
echo "启动新的 ngrok 隧道..."
cd /Users/jianjian/main/sgc_website
nohup ngrok http 3000 > /tmp/ngrok.log 2>&1 &
sleep 6

# 获取新地址
echo ""
echo "获取新的 ngrok 地址..."
NEW_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "import sys, json; data = json.load(sys.stdin); tunnels = [t for t in data.get('tunnels', []) if '3000' in str(t.get('config', {}).get('addr', ''))]; print(tunnels[0]['public_url'] if tunnels else '')" 2>/dev/null)

if [ -n "$NEW_URL" ]; then
    echo ""
    echo "✅ Ngrok 隧道已重启！"
    echo ""
    echo "📋 新的访问地址："
    echo "   前端: $NEW_URL"
    echo "   管理后台: $NEW_URL/admin"
    echo ""
    echo "💡 提示："
    echo "   - 查看日志: tail -f /tmp/ngrok.log"
    echo "   - 查看状态: http://localhost:4040"
    echo "   - 停止 ngrok: pkill ngrok"
else
    echo ""
    echo "⚠️  无法获取 ngrok 地址，请检查："
    echo "   1. ngrok 是否正常启动"
    echo "   2. 查看日志: tail -f /tmp/ngrok.log"
fi

