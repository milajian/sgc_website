# Ngrok 快速启动指南

## ✅ 当前状态
- ✅ 前端服务：运行中 (端口 3000)
- ✅ 后端服务：运行中 (端口 3001)
- ⏳ 需要安装 ngrok

## 第一步：安装 ngrok（5分钟）

### 方法1：手动下载安装（推荐）

1. **下载 ngrok**
   - 访问：https://ngrok.com/download
   - 选择 macOS 版本下载

2. **解压并安装**
   ```bash
   # 解压下载的文件
   unzip ~/Downloads/ngrok-v3-stable-darwin-amd64.zip
   
   # 移动到系统路径（需要管理员权限）
   sudo mv ngrok /usr/local/bin/
   
   # 验证安装
   ngrok version
   ```

### 方法2：使用 curl 安装
```bash
# 下载并安装
curl -O https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-amd64.zip
unzip ngrok-v3-stable-darwin-amd64.zip
sudo mv ngrok /usr/local/bin/
rm ngrok-v3-stable-darwin-amd64.zip
ngrok version
```

## 第二步：注册并配置 ngrok（2分钟）

1. **注册免费账号**
   - 访问：https://dashboard.ngrok.com/signup
   - 使用邮箱注册（免费）

2. **获取 authtoken**
   - 登录后访问：https://dashboard.ngrok.com/get-started/your-authtoken
   - 复制你的 authtoken

3. **配置 authtoken**
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

## 第三步：启动 ngrok 隧道

### 方法1：使用启动脚本（推荐）

```bash
# 在项目根目录运行
./start-ngrok.sh
```

### 方法2：手动启动

打开**两个新终端**：

**终端1 - 前端隧道：**
```bash
ngrok http 3000
```

**终端2 - 后端隧道：**
```bash
ngrok http 3001
```

## 第四步：配置前端 API 地址

1. **获取后端 ngrok 地址**
   - 查看后端 ngrok 终端输出
   - 或访问：http://localhost:4041（后端 ngrok 的 Web 界面）
   - 复制 HTTPS 地址，例如：`https://xxxx-xx-xx-xx-xx.ngrok-free.app`

2. **更新 .env.local**
   ```bash
   # 编辑 .env.local 文件
   NEXT_PUBLIC_API_URL=https://你的后端ngrok地址
   ```

3. **重启前端服务**
   - 在前端服务终端按 `Ctrl+C` 停止
   - 重新运行：`npm run dev`

## 第五步：分享访问地址

1. **获取前端 ngrok 地址**
   - 查看前端 ngrok 终端输出
   - 或访问：http://localhost:4040（前端 ngrok 的 Web 界面）
   - 复制 HTTPS 地址

2. **分享给其他人**
   - 管理后台首页：`https://你的前端ngrok地址/admin`
   - 专家列表管理：`https://你的前端ngrok地址/admin/expert-list`
   - 研发架构管理：`https://你的前端ngrok地址/admin/research-structure`

## 查看隧道状态

ngrok 提供了 Web 界面查看隧道状态：
- 前端隧道：http://localhost:4040
- 后端隧道：http://localhost:4041（如果可用）

## 停止服务

```bash
# 停止所有 ngrok 进程
pkill ngrok

# 或按 Ctrl+C 在各个终端中停止
```

## 常见问题

### Q: ngrok 地址每次都不一样？
A: 免费版每次启动地址会变化，这是正常的。需要更新 `.env.local` 中的地址。

### Q: 访问时显示警告页面？
A: ngrok 免费版首次访问会显示警告，点击 "Visit Site" 按钮即可。

### Q: 前端无法连接后端？
A: 检查：
1. `.env.local` 中的地址是否正确
2. 后端 ngrok 隧道是否正在运行
3. 是否重启了前端服务

### Q: 如何让地址固定？
A: 需要升级到 ngrok 付费版，或使用其他内网穿透服务（如 frp）。

## 下一步

设置完成后，你可以：
1. 分享 ngrok 地址给团队成员
2. 测试管理功能
3. 考虑添加身份验证（当前没有密码保护）

