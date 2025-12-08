#!/bin/bash

echo "🔍 检查 Ngrok 状态"
echo "=================="
echo ""

export PATH="$HOME/bin:$PATH"

# 检查 ngrok 进程
if pgrep -f "ngrok http" > /dev/null; then
    echo "✅ ngrok 进程: 运行中"
    NGROK_PID=$(pgrep -f "ngrok http" | head -1)
    echo "   进程 ID: $NGROK_PID"
else
    echo "❌ ngrok 进程: 未运行"
    echo "   运行: ./restart-ngrok.sh"
    exit 1
fi

echo ""

# 检查前端服务
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ 前端服务: 运行中 (端口 3000)"
else
    echo "❌ 前端服务: 未运行"
    echo "   请启动: npm run dev"
fi

# 检查后端服务
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ 后端服务: 运行中 (端口 3001)"
else
    echo "❌ 后端服务: 未运行"
    echo "   请启动: cd server && npm run dev"
fi

echo ""

# 检查 ngrok API
if curl -s http://localhost:4040/api/tunnels > /dev/null 2>&1; then
    echo "✅ ngrok API: 可访问"
    
    # 获取隧道信息
    TUNNEL_INFO=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    tunnels = [t for t in data.get('tunnels', []) if '3000' in str(t.get('config', {}).get('addr', ''))]
    if tunnels:
        t = tunnels[0]
        print(f\"地址: {t['public_url']}\")
        print(f\"指向: {t.get('config', {}).get('addr', 'N/A')}\")
        print(f\"协议: {t.get('proto', 'N/A')}\")
    else:
        print('未找到前端隧道')
except:
    print('无法解析隧道信息')
" 2>/dev/null)
    
    echo ""
    echo "📋 隧道信息:"
    echo "$TUNNEL_INFO"
    
    # 获取地址
    URL=$(echo "$TUNNEL_INFO" | grep "地址:" | cut -d' ' -f2)
    if [ -n "$URL" ]; then
        echo ""
        echo "🌐 访问地址:"
        echo "   管理后台: $URL/admin"
        echo "   Web 界面: http://localhost:4040"
    fi
else
    echo "❌ ngrok API: 无法访问"
    echo "   ngrok 可能未完全启动，等待几秒后重试"
fi

echo ""
echo "💡 提示:"
echo "   - 重启 ngrok: ./restart-ngrok.sh"
echo "   - 查看日志: tail -f /tmp/ngrok.log"

