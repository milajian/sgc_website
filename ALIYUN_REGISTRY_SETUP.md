# 阿里云容器镜像服务设置指南

## ⚠️ 当前问题

登录失败：`unauthorized: authentication required`

## 🔍 原因分析

阿里云容器镜像服务需要使用**Registry登录密码**，而不是控制台账号密码。

## 📝 解决步骤

### 方法 1：设置 Registry 登录密码（推荐）

1. **登录阿里云控制台**
   - 访问：https://cr.console.aliyun.com/
   - 使用您的账号登录：`jianjian@1356239427793205.onaliyun.com`

2. **设置 Registry 登录密码**
   - 选择区域：**华东1（杭州）**（registry.cn-hangzhou.aliyuncs.com）
   - 点击右上角头像 -> **访问凭证**
   - 在 **设置Registry登录密码** 部分
   - 点击 **设置密码**
   - 设置一个密码（可以与控制台密码不同）

3. **使用新密码登录**
   ```bash
   export ALIYUN_USERNAME="jianjian@1356239427793205.onaliyun.com"
   export ALIYUN_PASSWORD="您设置的Registry密码"
   source .aliyun-registry.env
   echo "$ALIYUN_PASSWORD" | docker login $ALIYUN_REGISTRY --username="$ALIYUN_USERNAME" --password-stdin
   ```

### 方法 2：使用访问令牌

1. **创建访问令牌**
   - 登录：https://cr.console.aliyun.com/
   - 进入 **访问凭证** -> **访问令牌**
   - 点击 **创建访问令牌**
   - 设置用途和过期时间
   - 复制用户名和密码

2. **使用访问令牌**
   ```bash
   export ALIYUN_USERNAME="访问令牌用户名"
   export ALIYUN_PASSWORD="访问令牌密码"
   source .aliyun-registry.env
   echo "$ALIYUN_PASSWORD" | docker login $ALIYUN_REGISTRY --username="$ALIYUN_USERNAME" --password-stdin
   ```

## 🚀 推送镜像

设置好密码后，执行：

```bash
cd /Users/jianjian/main/sgc_website
export ALIYUN_USERNAME="jianjian@1356239427793205.onaliyun.com"
export ALIYUN_PASSWORD="您的Registry密码或访问令牌密码"
source .aliyun-registry.env
./push-images-auto.sh
```

## 📋 确保命名空间存在

在推送之前，请确保命名空间 `sgc-website` 已创建：

1. 登录：https://cr.console.aliyun.com/
2. 选择区域：**华东1（杭州）**
3. 进入 **命名空间**
4. 如果 `sgc-website` 不存在，点击 **创建命名空间**
5. 填写命名空间名称：`sgc-website`
6. 选择类型：**公开** 或 **私有**

## ✅ 验证

登录成功后，可以测试推送：

```bash
docker push registry.cn-hangzhou.aliyuncs.com/sgc-website/sgc-frontend:latest
```

如果成功，您会看到上传进度。
