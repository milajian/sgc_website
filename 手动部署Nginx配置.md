# 手动部署 Nginx 反向代理配置

由于需要 SSH 连接工具，这里提供两种部署方式。

## 方式一：使用 sshpass（推荐）

### 1. 安装 sshpass

**macOS:**
```bash
brew install hudochenkov/sshpass/sshpass
```

**Ubuntu/Debian:**
```bash
sudo apt-get install sshpass
```

### 2. 运行自动部署脚本

```bash
./deploy-nginx-proxy.sh
```

## 方式二：手动部署（无需额外工具）

### 步骤 1: 上传配置文件

使用 scp 命令上传配置文件：

```bash
scp nginx-main-server.conf root@47.106.73.160:/tmp/nginx-main-server.conf
```

输入密码：`Botool=300739`

### 步骤 2: SSH 连接到服务器

```bash
ssh root@47.106.73.160
```

输入密码：`Botool=300739`

### 步骤 3: 在服务器上执行以下命令

```bash
# 1. 备份现有配置（如果存在）
if [ -f /etc/nginx/sites-available/sgc_website ]; then
    cp /etc/nginx/sites-available/sgc_website /etc/nginx/sites-available/sgc_website.backup.$(date +%Y%m%d_%H%M%S)
    echo "配置已备份"
fi

# 2. 复制新配置
cp /tmp/nginx-main-server.conf /etc/nginx/sites-available/sgc_website

# 3. 创建符号链接（如果不存在）
if [ ! -L /etc/nginx/sites-enabled/sgc_website ]; then
    ln -s /etc/nginx/sites-available/sgc_website /etc/nginx/sites-enabled/sgc_website
    echo "站点已启用"
fi

# 4. 测试 Nginx 配置
nginx -t

# 5. 如果测试通过，重启 Nginx
systemctl reload nginx
# 或
systemctl restart nginx

# 6. 检查 Nginx 状态
systemctl status nginx

# 7. 测试后端服务（确保后端运行在 localhost:3001）
curl http://localhost:3001/health

# 8. 测试 API 代理
curl http://localhost/api/experts
```

### 步骤 4: 验证配置

在浏览器中访问：
- 前端首页: http://47.106.73.160/
- 管理后台: http://47.106.73.160/admin
- API 测试: http://47.106.73.160/api/experts

## 方式三：使用一键脚本（如果已安装 sshpass）

如果已安装 sshpass，可以直接运行：

```bash
# 安装 sshpass（如果未安装）
brew install hudochenkov/sshpass/sshpass

# 运行部署脚本
./deploy-nginx-proxy.sh
```

## 确保后端服务运行

在部署 Nginx 配置之前，确保后端服务在服务器上运行：

```bash
# SSH 到服务器
ssh root@47.106.73.160

# 检查后端服务是否运行
ps aux | grep node | grep 3001

# 如果未运行，启动后端服务
cd /path/to/server  # 替换为实际的后端目录路径
npm start

# 或使用 PM2（推荐，支持自动重启）
pm2 start server.js --name sgc-backend
pm2 save  # 保存进程列表，开机自启
```

## 故障排查

### 问题 1: Nginx 配置测试失败

```bash
# 查看详细错误信息
nginx -t

# 检查配置文件语法
cat /etc/nginx/sites-available/sgc_website
```

### 问题 2: API 返回 502 Bad Gateway

```bash
# 检查后端服务是否运行
curl http://localhost:3001/health

# 检查 Nginx 错误日志
tail -f /var/log/nginx/sgc_website_error.log
```

### 问题 3: API 返回 404

```bash
# 检查 Nginx 配置中的 location /api/ 块
grep -A 15 "location /api" /etc/nginx/sites-available/sgc_website

# 重新加载 Nginx
systemctl reload nginx
```

## 配置说明

部署完成后，Nginx 配置将：
- ✅ 将 `/api/*` 请求代理到 `http://localhost:3001/api/*`
- ✅ 支持文件上传（最大 10M）
- ✅ 配置了适当的超时时间
- ✅ 保留了原有的静态文件服务配置

## 下一步

配置完成后：
1. ✅ 访问管理后台测试功能
2. ✅ 尝试修改专家信息并保存
3. ✅ 测试图片上传功能
4. ⏳ 考虑添加身份验证（可选）
5. ⏳ 配置 HTTPS（可选）

