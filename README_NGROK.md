# 🌐 Ngrok 内网穿透 - 完整指南

## 🎯 目标
让其他人通过互联网访问你的本地管理后台页面。

## ⚡ 最快方式（推荐）

直接运行一键配置脚本：
```bash
./一键配置.sh
```

脚本会自动：
1. ✅ 检查 ngrok 安装
2. ✅ 检查服务运行状态
3. ✅ 引导配置 authtoken
4. ✅ 启动 ngrok 隧道

## 📋 手动步骤

### 1. 配置 authtoken（只需一次）

```bash
# 方法A：使用交互式脚本
./setup-ngrok-auth.sh

# 方法B：手动配置
export PATH="$HOME/bin:$PATH"
ngrok config add-authtoken YOUR_AUTHTOKEN
```

**获取 authtoken：**
- 注册：https://dashboard.ngrok.com/signup
- 获取 token：https://dashboard.ngrok.com/get-started/your-authtoken

### 2. 启动 ngrok

```bash
# 方法A：使用测试脚本（推荐）
./test-ngrok.sh

# 方法B：直接启动
./start-ngrok-local.sh
```

### 3. 配置前端 API

1. 复制后端 ngrok 地址（终端输出或 http://localhost:4041）
2. 编辑 `.env.local`：
   ```bash
   NEXT_PUBLIC_API_URL=https://你的后端ngrok地址
   ```
3. 重启前端服务

### 4. 分享地址

分享前端 ngrok 地址：
- 管理后台：`https://你的前端ngrok地址/admin`

## 📚 文档索引

- `🚀快速开始.md` - 快速开始指南
- `NEXT_STEPS.md` - 详细操作步骤
- `QUICK_START_NGROK.md` - 快速启动指南
- `NGROK_SETUP.md` - 完整设置文档

## 🛠️ 可用脚本

| 脚本 | 功能 |
|------|------|
| `一键配置.sh` | 一键完成所有配置（推荐） |
| `setup-ngrok-auth.sh` | 交互式配置 authtoken |
| `test-ngrok.sh` | 测试并启动 ngrok |
| `start-ngrok-local.sh` | 直接启动 ngrok |
| `install-ngrok.sh` | 安装 ngrok |

## ⚠️ 重要提示

1. **免费版限制**
   - 每次启动地址会变化
   - 需要更新 `.env.local`
   - 有连接数限制

2. **安全提醒**
   - 当前管理页面没有密码保护
   - 不要公开分享 ngrok 地址
   - 测试完成后及时关闭

3. **生产环境**
   - 建议部署到云服务器
   - 配置域名和 SSL
   - 添加身份验证

## 🆘 故障排查

### ngrok 命令未找到
```bash
export PATH="$HOME/bin:$PATH"
```

### authtoken 配置失败
- 检查 token 是否正确
- 确保网络连接正常
- 手动运行：`ngrok config add-authtoken YOUR_TOKEN`

### 无法访问隧道
- 检查防火墙设置
- 确保端口 3000 和 3001 未被占用
- 检查服务是否正常运行

### 前端无法连接后端
- 检查 `.env.local` 中的地址是否正确
- 确保后端 ngrok 隧道正在运行
- 重启前端服务

## 📞 获取帮助

- 查看详细文档：`cat NGROK_SETUP.md`
- 查看快速开始：`cat 🚀快速开始.md`
- 查看下一步：`cat NEXT_STEPS.md`

---

**现在就开始：运行 `./一键配置.sh`** 🚀

