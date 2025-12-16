# 服务器网络配置修复报告

## ✅ 已完成的配置

### 1. DNS 配置
- **NetworkManager**: 已配置阿里云 DNS (223.5.5.5, 223.6.6.6, 114.114.114.114)
- **systemd-resolved**: 已配置 DNS 设置
- **持久化**: DNS 配置已通过 NetworkManager 持久化，重启后仍然有效

### 2. Docker 配置
- **镜像加速器**: 已配置阿里云容器镜像服务 (`registry.cn-hangzhou.aliyuncs.com`)
- **DNS**: Docker 使用与系统相同的 DNS 服务器
- **IPv6**: 已禁用 IPv6，强制使用 IPv4
- **日志**: 已配置日志轮转

### 3. 系统网络
- **IPv6**: 已禁用（优先使用 IPv4）
- **网络接口**: 正常（eth0: 172.21.68.124）
- **路由**: 正常

## ❌ 当前问题

### 主要问题：Docker 镜像拉取超时
- **现象**: `docker pull` 命令连接超时
- **原因**: HTTPS (443 端口) 连接失败
- **影响**: 无法拉取 Docker 基础镜像（`node:20-alpine`, `nginx:alpine`）

### 次要问题：镜像加速器域名解析失败
- 部分镜像加速器域名无法解析（如 `docker.mirrors.ustc.edu.cn`）
- 已切换到阿里云容器镜像服务

## 🔍 网络测试结果

| 测试项 | 状态 | 说明 |
|--------|------|------|
| DNS 解析 | ✅ 正常 | 可以解析 `registry-1.docker.io` |
| IPv4 地址 | ✅ 正常 | 可以获取 IPv4 地址 |
| HTTPS 连接 | ❌ 超时 | 443 端口连接失败 |
| 阿里云服务 | ✅ 正常 | OSS、元数据服务可访问 |
| HTTP 连接 | ✅ 正常 | 80 端口可访问 |

## 💡 解决方案

### 方案 1：检查并配置阿里云安全组（推荐）

**步骤：**
1. 登录 [阿里云控制台](https://ecs.console.aliyun.com/)
2. 进入 **ECS -> 实例与镜像 -> 实例**
3. 找到您的实例（IP: 47.106.73.160）
4. 点击实例 ID，进入详情页
5. 点击 **安全组** 标签页
6. 点击安全组 ID，进入安全组规则配置
7. 点击 **添加安全组规则**
8. 配置如下：
   - **规则方向**: 入方向
   - **授权策略**: 允许
   - **协议类型**: HTTPS(443)
   - **端口范围**: 443/443
   - **授权对象**: 0.0.0.0/0
   - **描述**: Docker 镜像拉取
9. 保存规则

**验证：**
```bash
# SSH 连接到服务器后执行
timeout 30 docker pull hello-world:latest
```

### 方案 2：本地构建 + 推送到阿里云镜像仓库

**步骤：**

1. **在本地构建镜像**：
   ```bash
   cd /Users/jianjian/main/sgc_website
   
   # 构建前端镜像
   docker build -t sgc-frontend:latest -f Dockerfile .
   
   # 构建后端镜像
   docker build -t sgc-backend:latest -f Dockerfile.backend .
   ```

2. **登录阿里云容器镜像服务**：
   ```bash
   # 需要先在阿里云控制台创建镜像仓库
   docker login --username=<您的阿里云账号> registry.cn-hangzhou.aliyuncs.com
   ```

3. **推送镜像**：
   ```bash
   # 标记镜像
   docker tag sgc-frontend:latest registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-frontend:latest
   docker tag sgc-backend:latest registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-backend:latest
   
   # 推送镜像
   docker push registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-frontend:latest
   docker push registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-backend:latest
   ```

4. **修改 docker-compose.yml**：
   ```yaml
   services:
     frontend:
       image: registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-frontend:latest
       # ... 其他配置
     backend:
       image: registry.cn-hangzhou.aliyuncs.com/<命名空间>/sgc-backend:latest
       # ... 其他配置
   ```

5. **在服务器上拉取并启动**：
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

### 方案 3：使用现有部署方式

如果 Docker 部署遇到持续的网络问题，可以继续使用现有的 Nginx + Node.js 部署方式。

## 📝 当前配置文件

### DNS 配置 (`/etc/resolv.conf`)
```
nameserver 223.5.5.5
nameserver 223.6.6.6
nameserver 114.114.114.114
```

### Docker 配置 (`/etc/docker/daemon.json`)
```json
{
  "ipv6": false,
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com"
  ],
  "dns": ["223.5.5.5", "223.6.6.6", "114.114.114.114"],
  "max-concurrent-downloads": 10,
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

## 🔧 后续操作

1. **立即操作**: 检查并配置阿里云安全组（方案 1）
2. **验证**: 测试 Docker 镜像拉取
3. **如果成功**: 继续执行 Docker 部署
4. **如果失败**: 考虑使用方案 2（本地构建 + 推送）

## 📞 需要帮助？

如果问题持续存在，可以：
1. 联系阿里云技术支持检查网络限制
2. 检查服务器防火墙规则（`iptables -L -n`）
3. 检查是否有其他网络策略限制

---

**报告生成时间**: $(date)
**服务器 IP**: 47.106.73.160
**操作系统**: Alibaba Cloud Linux 3
