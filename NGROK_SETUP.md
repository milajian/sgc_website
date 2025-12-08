# Ngrok 内网穿透设置指南

本指南将帮助你使用 ngrok 让其他人访问你的后端管理页面。

## 第一步：安装 ngrok

### macOS（推荐使用 Homebrew）
```bash
brew install ngrok
```

### 手动安装
1. 访问 https://ngrok.com/download
2. 下载 macOS 版本
3. 解压后将 `ngrok` 移动到 `/usr/local/bin/` 或添加到 PATH

### 注册账号（免费）
1. 访问 https://dashboard.ngrok.com/signup
2. 注册免费账号
3. 获取 authtoken：https://dashboard.ngrok.com/get-started/your-authtoken

### 配置 authtoken
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```

## 第二步：启动服务

### 1. 启动后端服务
```bash
cd server
npm run dev
```
后端将在 `http://localhost:3001` 运行

### 2. 启动前端服务（新终端）
```bash
npm run dev
```
前端将在 `http://localhost:3000` 运行

### 3. 启动 ngrok 隧道（需要两个终端）

**终端1 - 前端隧道：**
```bash
ngrok http 3000
```

**终端2 - 后端隧道：**
```bash
ngrok http 3001
```

## 第三步：配置前端 API 地址

ngrok 启动后会显示类似这样的信息：
```
Forwarding  https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:3001
```

1. 复制后端 ngrok 的 HTTPS 地址（例如：`https://xxxx-xx-xx-xx-xx.ngrok-free.app`）

2. 创建或更新 `.env.local` 文件（项目根目录）：
```bash
NEXT_PUBLIC_API_URL=https://你的后端ngrok地址
```

3. 重启前端服务（Ctrl+C 然后重新运行 `npm run dev`）

## 第四步：分享访问地址

前端 ngrok 会显示类似这样的地址：
```
Forwarding  https://yyyy-yy-yy-yy-yy.ngrok-free.app -> http://localhost:3000
```

**分享给其他人的地址：**
- 管理后台首页：`https://你的前端ngrok地址/admin`
- 专家列表管理：`https://你的前端ngrok地址/admin/expert-list`
- 研发架构管理：`https://你的前端ngrok地址/admin/research-structure`

## 快速启动脚本

为了方便使用，你可以创建以下脚本：

### macOS/Linux - 启动脚本

创建 `start-ngrok.sh`：
```bash
#!/bin/bash

echo "🚀 启动 ngrok 内网穿透..."

# 检查 ngrok 是否安装
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok 未安装，请先安装：brew install ngrok"
    exit 1
fi

# 启动后端 ngrok（后台运行）
echo "📡 启动后端 ngrok 隧道..."
ngrok http 3001 > /tmp/ngrok-backend.log 2>&1 &
BACKEND_NGROK_PID=$!

# 等待一下让 ngrok 启动
sleep 2

# 启动前端 ngrok（后台运行）
echo "📡 启动前端 ngrok 隧道..."
ngrok http 3000 > /tmp/ngrok-frontend.log 2>&1 &
FRONTEND_NGROK_PID=$!

echo "✅ Ngrok 隧道已启动！"
echo ""
echo "📋 查看隧道信息："
echo "   后端: tail -f /tmp/ngrok-backend.log"
echo "   前端: tail -f /tmp/ngrok-frontend.log"
echo ""
echo "🛑 停止隧道: kill $BACKEND_NGROK_PID $FRONTEND_NGROK_PID"
```

## 注意事项

1. **免费版限制**：
   - 每次启动 ngrok 地址会变化
   - 有连接数限制
   - 需要更新 `.env.local` 中的地址

2. **安全提醒**：
   - 当前管理页面没有身份验证
   - 不要将 ngrok 地址公开分享
   - 测试完成后及时关闭 ngrok

3. **性能**：
   - ngrok 免费版有带宽限制
   - 仅适用于测试和小规模使用

4. **生产环境**：
   - 建议使用云服务器部署
   - 配置域名和 SSL 证书
   - 添加身份验证机制

## 故障排查

### ngrok 无法启动
```bash
# 检查 authtoken 是否配置
ngrok config check

# 重新配置 authtoken
ngrok config add-authtoken YOUR_AUTHTOKEN
```

### 前端无法连接后端
- 检查 `.env.local` 中的地址是否正确
- 确保后端 ngrok 隧道正在运行
- 重启前端服务

### 访问被阻止
- ngrok 免费版首次访问会显示警告页面，点击 "Visit Site" 即可
- 检查防火墙设置

## 停止服务

按 `Ctrl+C` 停止各个服务，或使用：
```bash
# 查找 ngrok 进程
ps aux | grep ngrok

# 停止所有 ngrok 进程
pkill ngrok
```

