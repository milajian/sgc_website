# 推送镜像到阿里云容器镜像服务指南

## 📋 当前状态

✅ **镜像已构建完成**
- 前端镜像: `sgc-frontend:latest` (134MB)
- 后端镜像: `sgc-backend:latest` (49.7MB)

✅ **镜像已标记**
- 前端: `registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest`
- 后端: `registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-backend:latest`

✅ **配置已加载**
- 命名空间: `sgc-website`
- 镜像仓库: `registry.cn-hangzhou.aliyuncs.com`
- 账号 ID: `1356239427793205`

## 🔐 登录阿里云容器镜像服务

### 方法 1: 使用账号密码（推荐用于测试）

```bash
# 设置环境变量
export ALIYUN_USERNAME=your-aliyun-username
export ALIYUN_PASSWORD=your-aliyun-password

# 加载配置
source .aliyun-registry.env

# 推送镜像
./push-images-auto.sh
```

### 方法 2: 使用访问令牌（推荐用于生产环境）

1. **获取访问令牌**：
   - 登录 [阿里云控制台](https://ecs.console.aliyun.com/)
   - 进入 **容器镜像服务** -> **访问凭证**
   - 创建或查看访问令牌
   - 复制用户名和密码

2. **使用访问令牌**：
   ```bash
   export ALIYUN_USERNAME=your-registry-username
   export ALIYUN_PASSWORD=your-registry-password
   
   source .aliyun-registry.env
   ./push-images-auto.sh
   ```

### 方法 3: 手动登录

```bash
# 手动登录
docker login registry.cn-hangzhou.aliyuncs.com --username=your-username

# 然后推送
source .aliyun-registry.env
docker push ${ALIYUN_REGISTRY}/${ALIYUN_NAMESPACE}/sgc-frontend:latest
docker push ${ALIYUN_REGISTRY}/${ALIYUN_NAMESPACE}/sgc-backend:latest
```

## 📝 确保命名空间存在

在推送之前，请确保命名空间 `sgc-website` 已创建：

1. 登录 [阿里云容器镜像服务控制台](https://cr.console.aliyun.com/)
2. 选择区域：**华东1（杭州）**
3. 进入 **命名空间**
4. 如果 `sgc-website` 不存在，点击 **创建命名空间**
5. 填写命名空间名称：`sgc-website`
6. 选择类型：**公开** 或 **私有**

## 🚀 推送镜像

设置好账号信息后，执行：

```bash
cd /Users/jianjian/main/sgc_website
source .aliyun-registry.env
export ALIYUN_USERNAME=your-username
export ALIYUN_PASSWORD=your-password
./push-images-auto.sh
```

## ✅ 推送成功后

推送成功后，可以在服务器上拉取并部署：

```bash
# SSH 到服务器
ssh -i ~/.ssh/id_rsa_sgc root@47.106.73.160

# 拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest
docker pull registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-backend:latest

# 使用 docker-compose 部署
cd /tmp/sgc_build_*
export ALIYUN_REGISTRY=registry.cn-hangzhou.aliyuncs.com
export ALIYUN_NAMESPACE=sgc-website
cp docker-compose.prod.yml docker-compose.yml
docker-compose pull
docker-compose up -d
```

## 🔧 故障排除

### 问题 1: 命名空间不存在
**错误**: `repository does not exist`
**解决**: 在阿里云控制台创建命名空间 `sgc-website`

### 问题 2: 认证失败
**错误**: `unauthorized: authentication required`
**解决**: 检查用户名和密码是否正确，或使用访问令牌

### 问题 3: 推送超时
**错误**: `timeout` 或 `connection refused`
**解决**: 检查网络连接，或使用阿里云内网地址

## 📞 需要帮助？

如果遇到问题，可以：
1. 检查阿里云控制台的命名空间和访问凭证
2. 查看 Docker 登录状态：`cat ~/.docker/config.json`
3. 测试连接：`docker pull registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest`

