# 镜像推送状态

## ✅ 已完成

1. **镜像构建完成**
   - 前端镜像: `sgc-frontend:latest` (134MB)
   - 后端镜像: `sgc-backend:latest` (49.7MB)

2. **镜像已标记**
   - 前端: `registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest`
   - 后端: `registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-backend:latest`

3. **配置已设置**
   - 账号: `jianjian@1356239427793205.onaliyun.com`
   - 命名空间: `sgc-website`
   - 镜像仓库: `registry.cn-hangzhou.aliyuncs.com`

## ❌ 当前问题

**登录失败**: `unauthorized: authentication required`

**原因**: 阿里云容器镜像服务需要使用 **Registry 登录密码**，而不是控制台账号密码。

## 🔧 解决方案

### 步骤 1: 设置 Registry 登录密码

1. **登录阿里云控制台**
   - 访问：https://cr.console.aliyun.com/
   - 使用账号：`jianjian@1356239427793205.onaliyun.com`
   - 使用密码：`jian4B#BBEWAq9tI93MFp!dwnIm%)NooIu`

2. **设置 Registry 密码**
   - 选择区域：**华东1（杭州）**
   - 点击右上角头像 -> **访问凭证**
   - 在 **设置Registry登录密码** 部分
   - 点击 **设置密码**
   - 设置一个新密码（可以与控制台密码相同或不同）

### 步骤 2: 确保命名空间存在

1. 在控制台中进入 **命名空间**
2. 如果 `sgc-website` 不存在，点击 **创建命名空间**
3. 填写命名空间名称：`sgc-website`
4. 选择类型：**公开** 或 **私有**

### 步骤 3: 使用新密码推送镜像

设置好 Registry 密码后，执行：

```bash
cd /Users/jianjian/main/sgc_website

# 设置账号信息（使用您设置的 Registry 密码）
export ALIYUN_USERNAME="jianjian@1356239427793205.onaliyun.com"
export ALIYUN_PASSWORD="您设置的Registry密码"

# 加载配置
source .aliyun-registry.env

# 登录并推送
echo "$ALIYUN_PASSWORD" | docker login $ALIYUN_REGISTRY --username="$ALIYUN_USERNAME" --password-stdin

# 推送镜像
./push-images-auto.sh
```

## 📝 快速命令

设置好 Registry 密码后，一键推送：

```bash
cd /Users/jianjian/main/sgc_website
export ALIYUN_USERNAME="jianjian@1356239427793205.onaliyun.com"
export ALIYUN_PASSWORD="您的Registry密码"
source .aliyun-registry.env
./push-images-auto.sh
```

## ✅ 验证

推送成功后，可以在服务器上拉取：

```bash
ssh -i ~/.ssh/id_rsa_sgc root@47.106.73.160
docker pull registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest
docker pull registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-backend:latest
```

## 💡 提示

- Registry 登录密码与控制台密码是分开的
- 如果忘记 Registry 密码，可以在控制台重新设置
- 建议使用访问令牌（更安全，可以设置过期时间）
