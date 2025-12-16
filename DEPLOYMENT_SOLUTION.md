# Docker 部署方案 2 执行总结

## 📋 当前状态

### ✅ 已完成
1. **网络配置**: DNS、Docker 配置已优化
2. **后端依赖**: 后端 Node.js 依赖已安装
3. **构建脚本**: 已创建并上传到服务器

### ❌ 遇到的问题

1. **无法拉取 Docker 基础镜像**
   - `node:20-alpine`: 连接超时
   - `nginx:alpine`: 连接超时
   - 原因: HTTPS (443 端口) 连接失败，可能是安全组限制

2. **前端构建失败**
   - Next.js 构建过程中出现模块找不到的错误
   - 构建产物 `out/` 目录未生成

## 💡 解决方案

### 方案 A: 手动导入基础镜像（推荐用于 Docker 部署）

**步骤：**

1. **在有网络的机器上下载基础镜像**
   ```bash
   # 在您的本地机器或其他有网络的服务器上
   docker pull node:20-alpine
   docker pull nginx:alpine
   ```

2. **导出镜像为 tar 文件**
   ```bash
   docker save node:20-alpine -o node-20-alpine.tar
   docker save nginx:alpine -o nginx-alpine.tar
   ```

3. **上传到生产服务器**
   ```bash
   # 从本地机器执行
   cd /Users/jianjian/main/sgc_website
   source deploy.config.sh
   scp -i ~/.ssh/id_rsa_sgc node-20-alpine.tar nginx-alpine.tar ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/
   ```

4. **在服务器上导入镜像**
   ```bash
   # SSH 到服务器后执行
   docker load -i /tmp/node-20-alpine.tar
   docker load -i /tmp/nginx-alpine.tar
   ```

5. **重新构建 Docker 镜像**
   ```bash
   cd /tmp/sgc_build_*
   export BASE_PATH=""
   export ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"
   export ALIYUN_NAMESPACE="sgc-website"
   ./build-on-server.sh
   ```

6. **推送到阿里云容器镜像服务**
   ```bash
   # 登录阿里云（需要您的账号信息）
   docker login registry.cn-hangzhou.aliyuncs.com --username=<您的阿里云账号>
   
   # 推送镜像
   docker push registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest
   docker push registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-backend:latest
   ```

7. **使用 docker-compose 部署**
   ```bash
   # 修改 docker-compose.yml 使用镜像
   cp docker-compose.prod.yml docker-compose.yml
   export ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"
   export ALIYUN_NAMESPACE="sgc-website"
   docker-compose pull
   docker-compose up -d
   ```

### 方案 B: 修复安全组后重新构建

1. **配置阿里云安全组**
   - 登录阿里云控制台
   - ECS -> 实例 -> 安全组
   - 添加入方向规则: HTTPS(443), 端口 443, 源 0.0.0.0/0

2. **重新尝试拉取镜像**
   ```bash
   docker pull node:20-alpine
   docker pull nginx:alpine
   ```

3. **如果成功，继续执行构建和推送流程**

### 方案 C: 使用本地环境运行（不使用 Docker）

如果 Docker 部署持续遇到问题，可以使用服务器本地环境：

1. **前端**: 使用本地 Nginx 服务静态文件
2. **后端**: 使用本地 Node.js 运行 Express 服务

**部署脚本：**
```bash
# 在服务器上执行
cd /tmp/sgc_build_*

# 构建前端（如果还未构建）
npm install --legacy-peer-deps
npm run build

# 配置 Nginx（使用现有的 nginx-main-server.conf）
# 后端使用 PM2 或 systemd 管理
cd server
npm install --only=production
node server.js
```

## 📝 下一步操作建议

1. **立即操作**: 
   - 选择方案 A（手动导入镜像）或方案 B（修复安全组）
   - 如果选择方案 A，我可以帮您创建自动化脚本

2. **如果选择方案 A**:
   - 需要您在有网络的机器上下载基础镜像
   - 或者我可以创建一个脚本帮您完成整个过程

3. **如果选择方案 B**:
   - 需要您在阿里云控制台配置安全组
   - 配置完成后告诉我，我可以继续执行构建

4. **如果选择方案 C**:
   - 我可以帮您创建使用本地环境的部署脚本

## 🔧 已创建的文件

- `build-on-server.sh`: 服务器端构建脚本
- `build-and-push.sh`: 构建并推送脚本
- `docker-compose.prod.yml`: 生产环境 Docker Compose 配置
- `deploy-with-images.sh`: 完整部署脚本

## ❓ 需要帮助？

请告诉我您想选择哪个方案，我可以继续协助您完成部署。
