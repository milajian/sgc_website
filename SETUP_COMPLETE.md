# ✅ Ngrok 设置完成指南

## 📋 当前状态
- ✅ 前端服务：运行中 (端口 3000)
- ✅ 后端服务：运行中 (端口 3001)
- ✅ 后端服务器配置：已更新（允许外部访问）
- ✅ 启动脚本：已创建 (`start-ngrok.sh`)
- ✅ 环境变量文件：已创建 (`.env.local`)
- ⏳ **需要完成：安装 ngrok**

## 🚀 快速完成安装（3步）

### 步骤1：安装 ngrok

**选项A：使用安装脚本（需要输入密码）**
```bash
# 运行安装脚本，会提示输入管理员密码
./install-ngrok.sh
```

**选项B：手动安装**
```bash
# 1. 下载（如果还没下载）
curl -O https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-amd64.zip

# 2. 解压
unzip ngrok-v3-stable-darwin-amd64.zip

# 3. 安装（需要管理员密码）
sudo mv ngrok /usr/local/bin/

# 4. 验证
ngrok version
```

### 步骤2：配置 ngrok authtoken

1. **注册账号**（如果还没有）
   - 访问：https://dashboard.ngrok.com/signup
   - 使用邮箱注册（免费）

2. **获取 authtoken**
   - 登录后访问：https://dashboard.ngrok.com/get-started/your-authtoken
   - 复制你的 authtoken

3. **配置 authtoken**
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

### 步骤3：启动 ngrok 并配置

**启动 ngrok 隧道：**
```bash
# 使用启动脚本（推荐）
./start-ngrok.sh

# 或手动启动两个终端
# 终端1: ngrok http 3000
# 终端2: ngrok http 3001
```

**配置前端 API 地址：**

1. 查看后端 ngrok 地址（终端输出或 http://localhost:4041）
2. 更新 `.env.local`：
   ```bash
   NEXT_PUBLIC_API_URL=https://你的后端ngrok地址
   ```
3. 重启前端服务（Ctrl+C 然后 `npm run dev`）

**分享访问地址：**
- 前端 ngrok 地址：`https://你的前端ngrok地址/admin`

## 📚 详细文档

- **快速启动指南**：`QUICK_START_NGROK.md`
- **完整设置指南**：`NGROK_SETUP.md`

## 🎯 下一步操作

1. ✅ 安装 ngrok（见步骤1）
2. ✅ 配置 authtoken（见步骤2）
3. ✅ 启动 ngrok（见步骤3）
4. ✅ 更新 `.env.local` 中的 API 地址
5. ✅ 重启前端服务
6. ✅ 分享前端 ngrok 地址给其他人

## 💡 提示

- ngrok 免费版每次启动地址会变化，需要更新 `.env.local`
- 访问 ngrok Web 界面：http://localhost:4040（前端）和 http://localhost:4041（后端）
- 当前管理页面没有密码保护，请谨慎分享地址

