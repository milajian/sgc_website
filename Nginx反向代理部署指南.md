# Nginx 反向代理部署指南

## ✅ 已完成的配置

### 1. Nginx 配置文件更新
- ✅ `nginx-main-server.conf` - 已添加 API 反向代理配置
- ✅ `server-deploy.sh` - 已更新，生成的配置包含反向代理

### 2. 配置说明
- ✅ `生产环境配置说明.md` - 详细配置文档

## 🚀 快速部署步骤

### 步骤 1: 确保后端服务运行

在服务器 `47.106.73.160` 上：

```bash
# 检查后端服务是否运行
ps aux | grep node | grep 3001

# 如果未运行，启动后端服务
cd /path/to/server
npm start

# 或使用 PM2（推荐）
pm2 start server.js --name sgc-backend
pm2 save  # 保存进程列表，开机自启
```

### 步骤 2: 更新 Nginx 配置

**方式一：使用部署脚本（推荐）**

```bash
# 上传部署脚本到服务器
scp server-deploy.sh root@47.106.73.160:/tmp/

# 在服务器上运行
ssh root@47.106.73.160 "bash /tmp/server-deploy.sh"
```

**方式二：手动更新配置**

```bash
# 上传配置文件
scp nginx-main-server.conf root@47.106.73.160:/etc/nginx/sites-available/sgc_website

# 在服务器上测试并重启
ssh root@47.106.73.160 "nginx -t && systemctl restart nginx"
```

### 步骤 3: 验证配置

```bash
# 1. 测试后端服务（在服务器上）
curl http://localhost:3001/health

# 2. 测试 Nginx 代理（在服务器上）
curl http://localhost/api/experts

# 3. 测试前端访问（在浏览器）
# 访问: http://47.106.73.160/admin
# 尝试修改专家信息并保存
```

## 📋 配置要点

### 后端地址配置

**开发环境** (`.env.local`):
```bash
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**生产环境**:
- 服务器端（Next.js API 路由）: `BACKEND_URL=http://localhost:3001`
- 客户端（浏览器）: 使用相对路径 `/api`，由 Nginx 代理

### Nginx 反向代理规则

```
客户端请求: http://47.106.73.160/api/experts
    ↓
Nginx 代理: http://localhost:3001/api/experts
    ↓
后端服务响应
```

## 🔍 故障排查

### API 返回 502 Bad Gateway

**检查后端服务**:
```bash
# 在服务器上
curl http://localhost:3001/health
```

**检查 Nginx 日志**:
```bash
tail -f /var/log/nginx/sgc_website_error.log
```

### API 返回 404

**检查 Nginx 配置**:
```bash
nginx -t
cat /etc/nginx/sites-available/sgc_website | grep -A 10 "location /api"
```

### 文件上传失败

**检查文件大小限制**:
- Nginx 配置中已设置 `client_max_body_size 10M`
- 如需更大，修改配置后重启 Nginx

## 📝 注意事项

1. **后端服务必须运行**: Nginx 代理需要后端服务在 `localhost:3001` 运行
2. **端口安全**: 确保 3001 端口不对外开放，只允许本地访问
3. **管理后台**: 当前没有身份验证，生产环境建议添加
4. **HTTPS**: 建议配置 SSL 证书启用 HTTPS

## 🎯 下一步

1. ✅ 部署后端服务到服务器
2. ✅ 更新 Nginx 配置
3. ✅ 测试管理后台功能
4. ⏳ 添加身份验证（可选）
5. ⏳ 配置 HTTPS（可选）

---

**配置完成后，管理后台将通过 `http://47.106.73.160/admin` 访问，API 请求会自动通过 Nginx 代理到后端服务。**

