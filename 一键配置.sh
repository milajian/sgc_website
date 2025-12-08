#!/bin/bash

echo "╔════════════════════════════════════════════════════════╗"
echo "║        Ngrok 一键配置助手 - 让其他人访问管理后台        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 确保 PATH 包含 ~/bin
export PATH="$HOME/bin:$PATH"

# 检查 ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok 未找到，正在安装..."
    ./install-ngrok.sh
    export PATH="$HOME/bin:$PATH"
fi

echo "✅ ngrok 版本: $(ngrok version | head -1)"
echo ""

# 检查服务
echo "📋 检查服务状态..."
FRONTEND_OK=false
BACKEND_OK=false

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ 前端服务: 运行中 (端口 3000)"
    FRONTEND_OK=true
else
    echo "   ⚠️  前端服务: 未运行"
    echo "      请运行: npm run dev"
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ✅ 后端服务: 运行中 (端口 3001)"
    BACKEND_OK=true
else
    echo "   ⚠️  后端服务: 未运行"
    echo "      请运行: cd server && npm run dev"
fi

echo ""

# 检查 authtoken
if ngrok config check &>/dev/null; then
    echo "✅ authtoken 已配置"
    AUTHTOKEN_OK=true
else
    echo "❌ authtoken 未配置"
    AUTHTOKEN_OK=false
    echo ""
    echo "📝 需要配置 authtoken："
    echo ""
    echo "   1. 注册账号: https://dashboard.ngrok.com/signup"
    echo "   2. 获取 token: https://dashboard.ngrok.com/get-started/your-authtoken"
    echo ""
    read -p "   3. 请输入你的 authtoken: " authtoken
    
    if [ -n "$authtoken" ]; then
        echo ""
        echo "正在配置..."
        ngrok config add-authtoken "$authtoken"
        if [ $? -eq 0 ]; then
            echo "✅ authtoken 配置成功！"
            AUTHTOKEN_OK=true
        else
            echo "❌ 配置失败，请检查 token 是否正确"
            exit 1
        fi
    else
        echo "❌ 未输入 authtoken，退出"
        exit 1
    fi
fi

echo ""

# 如果所有检查通过，启动 ngrok
if [ "$FRONTEND_OK" = true ] && [ "$BACKEND_OK" = true ] && [ "$AUTHTOKEN_OK" = true ]; then
    echo "🚀 所有检查通过，准备启动 ngrok..."
    echo ""
    echo "这将创建两个隧道："
    echo "  📡 前端: http://localhost:3000 -> ngrok 地址"
    echo "  📡 后端: http://localhost:3001 -> ngrok 地址"
    echo ""
    read -p "按 Enter 启动，或 Ctrl+C 取消..."
    echo ""
    
    ./start-ngrok-local.sh
    
    echo ""
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║                    ✅ 配置完成！                        ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "📝 下一步操作："
    echo ""
    echo "1. 查看终端输出，找到后端 ngrok 地址（HTTPS）"
    echo "2. 编辑 .env.local 文件，更新："
    echo "   NEXT_PUBLIC_API_URL=https://你的后端ngrok地址"
    echo ""
    echo "3. 重启前端服务（Ctrl+C 然后 npm run dev）"
    echo ""
    echo "4. 分享前端 ngrok 地址给其他人："
    echo "   https://你的前端ngrok地址/admin"
    echo ""
    echo "💡 提示："
    echo "   - 查看隧道状态: http://localhost:4040 (前端)"
    echo "   - 查看隧道状态: http://localhost:4041 (后端)"
    echo "   - 停止 ngrok: pkill ngrok"
else
    echo "⚠️  请先解决上述问题，然后重新运行此脚本"
    exit 1
fi

