# 🎯 下一步操作指南

## ✅ 已完成
- ✅ ngrok 已下载并安装到 `~/bin/ngrok`
- ✅ 启动脚本已创建：`start-ngrok-local.sh`
- ✅ 前端服务：运行中 (端口 3000)
- ✅ 后端服务：运行中 (端口 3001)

## 📋 接下来需要做的（2步）

### 步骤1：配置 ngrok authtoken（必需）

ngrok 需要 authtoken 才能使用。请按以下步骤操作：

1. **注册 ngrok 账号**（如果还没有）
   - 访问：https://dashboard.ngrok.com/signup
   - 使用邮箱注册（免费，约1分钟）

2. **获取 authtoken**
   - 登录后访问：https://dashboard.ngrok.com/get-started/your-authtoken
   - 复制你的 authtoken（类似：`2xxxxxxxxxxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxxx`）

3. **配置 authtoken**
   ```bash
   # 确保 PATH 包含 ~/bin
   export PATH="$HOME/bin:$PATH"
   
   # 配置 authtoken（替换 YOUR_AUTHTOKEN 为你的实际 token）
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

### 步骤2：启动 ngrok 并配置

1. **启动 ngrok 隧道**
   ```bash
   # 确保 PATH 包含 ~/bin（如果还没添加到 .zshrc）
   export PATH="$HOME/bin:$PATH"
   
   # 启动 ngrok
   ./start-ngrok-local.sh
   ```

2. **获取后端 ngrok 地址**
   - 查看终端输出，或
   - 访问：http://localhost:4041（后端 ngrok Web 界面）
   - 复制 HTTPS 地址，例如：`https://xxxx-xx-xx-xx-xx.ngrok-free.app`

3. **更新前端 API 配置**
   ```bash
   # 编辑 .env.local 文件
   # 将 NEXT_PUBLIC_API_URL 更新为后端 ngrok 地址
   NEXT_PUBLIC_API_URL=https://你的后端ngrok地址
   ```

4. **重启前端服务**
   - 在前端服务终端按 `Ctrl+C` 停止
   - 重新运行：`npm run dev`

5. **分享访问地址**
   - 查看前端 ngrok 地址（终端输出或 http://localhost:4040）
   - 分享给其他人：`https://你的前端ngrok地址/admin`

## 🚀 快速命令

```bash
# 1. 配置 authtoken（只需一次）
export PATH="$HOME/bin:$PATH"
ngrok config add-authtoken YOUR_AUTHTOKEN

# 2. 启动 ngrok
./start-ngrok-local.sh

# 3. 查看隧道状态
# 前端: http://localhost:4040
# 后端: http://localhost:4041
```

## 📝 注意事项

- ⚠️ **重要**：必须先配置 authtoken，否则 ngrok 无法启动
- 🔄 ngrok 免费版每次启动地址会变化，需要更新 `.env.local`
- 🔒 当前管理页面没有密码保护，请谨慎分享地址
- 🌐 ngrok Web 界面可以查看请求日志和隧道状态

## 🆘 遇到问题？

- **ngrok 命令未找到**：运行 `export PATH="$HOME/bin:$PATH"`
- **authtoken 配置失败**：检查 token 是否正确，确保网络连接正常
- **无法访问隧道**：检查防火墙设置，确保端口 3000 和 3001 未被占用

## ✅ 完成检查清单

- [ ] 注册 ngrok 账号
- [ ] 获取并配置 authtoken
- [ ] 启动 ngrok 隧道
- [ ] 更新 `.env.local` 中的 API 地址
- [ ] 重启前端服务
- [ ] 测试访问管理页面
- [ ] 分享地址给其他人

完成这些步骤后，其他人就可以通过 ngrok 地址访问你的管理后台了！

