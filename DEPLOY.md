# SGC 网站部署指南

本文档介绍如何使用自动化脚本部署 SGC 网站到服务器。

## 📋 前置要求

### 1. 安装依赖工具

**macOS:**
```bash
brew install hudochenkov/sshpass/sshpass
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install sshpass rsync
```

### 2. 服务器信息

- **IP 地址**: 47.106.73.160
- **用户名**: root
- **密码**: Bootool=300739

## 🚀 快速开始

### 方式一：使用密码认证（快速）

直接运行部署脚本：

```bash
npm run deploy
# 或
./deploy.sh
```

### 方式二：使用 SSH 密钥认证（推荐，更安全）

#### 步骤 1: 配置 SSH 密钥

```bash
npm run deploy:setup-ssh
# 或
./setup-ssh-key.sh
```

此脚本会：
- 生成 SSH 密钥对（如果不存在）
- 将公钥复制到服务器
- 测试 SSH 密钥连接
- 自动更新配置文件以使用密钥认证

#### 步骤 2: 执行部署

配置完成后，后续部署将自动使用 SSH 密钥：

```bash
npm run deploy
```

## 📁 文件说明

### 配置文件

- **`deploy.config.sh`**: 部署配置文件，包含服务器信息、路径配置等

### 部署脚本

- **`deploy.sh`**: 主部署脚本，执行完整的部署流程
- **`setup-ssh-key.sh`**: SSH 密钥配置脚本
- **`server-deploy.sh`**: 服务器端配置脚本（用于配置 Nginx 等）

## 🔧 部署流程

`deploy.sh` 脚本会自动执行以下步骤：

1. ✅ **检查依赖** - 验证 sshpass、rsync 等工具是否安装
2. 🔨 **构建项目** - 运行 `npm run build` 构建生产版本
3. 🔌 **测试连接** - 验证服务器连接是否正常
4. 📁 **创建目录** - 在服务器上创建必要的目录结构
5. 💾 **备份文件** - 备份现有的网站文件
6. 🧹 **清理备份** - 删除超过保留期的旧备份
7. 📤 **同步文件** - 使用 rsync 同步构建文件到服务器
8. 🔐 **设置权限** - 设置正确的文件权限

## ⚙️ 配置说明

编辑 `deploy.config.sh` 可以自定义以下配置：

```bash
# 服务器信息
export DEPLOY_HOST="47.106.73.160"
export DEPLOY_USER="root"
export DEPLOY_PASSWORD="Bootool=300739"

# 部署路径
export REMOTE_BASE_DIR="/var/www/sgc_website"
export REMOTE_WEB_DIR="${REMOTE_BASE_DIR}/dist"
export REMOTE_BACKUP_DIR="${REMOTE_BASE_DIR}/backups"

# 本地构建输出目录
export LOCAL_BUILD_DIR="./out"

# 备份保留天数
export BACKUP_RETENTION_DAYS=7

# 是否使用 SSH 密钥
export USE_SSH_KEY=false
export SSH_KEY_PATH="$HOME/.ssh/id_rsa_sgc"
```

## 🌐 服务器端配置（可选）

如果需要配置 Nginx，可以手动上传并运行服务器端脚本：

```bash
# 上传脚本到服务器
scp server-deploy.sh root@47.106.73.160:/tmp/

# 在服务器上运行
ssh root@47.106.73.160 "bash /tmp/server-deploy.sh"
```

或者使用 sshpass：

```bash
sshpass -p 'Bootool=300739' scp server-deploy.sh root@47.106.73.160:/tmp/
sshpass -p 'Bootool=300739' ssh root@47.106.73.160 "bash /tmp/server-deploy.sh"
```

## 🧪 测试连接

测试服务器连接：

```bash
npm run deploy:test
```

或手动测试：

```bash
# 使用密码
sshpass -p 'Bootool=300739' ssh -o StrictHostKeyChecking=no root@47.106.73.160 "echo '连接成功'"

# 使用 SSH 密钥（配置后）
ssh -i ~/.ssh/id_rsa_sgc root@47.106.73.160 "echo '连接成功'"
```

## 📝 常用命令

```bash
# 仅构建项目
npm run build

# 完整部署
npm run deploy

# 配置 SSH 密钥
npm run deploy:setup-ssh

# 测试服务器连接
npm run deploy:test
```

## 🔒 安全建议

1. **使用 SSH 密钥认证**：配置完成后，建议使用 SSH 密钥而非密码
2. **保护配置文件**：不要将包含密码的配置文件提交到公共仓库
3. **定期更新密码**：定期更换服务器密码
4. **限制 SSH 访问**：在服务器上配置防火墙，限制 SSH 访问来源

## ❓ 故障排查

### 问题：sshpass 未找到

**解决方案：**
```bash
# macOS
brew install hudochenkov/sshpass/sshpass

# Ubuntu/Debian
sudo apt-get install sshpass
```

### 问题：连接超时

**检查项：**
- 服务器 IP 地址是否正确
- 服务器是否正常运行
- 防火墙是否允许 SSH 连接（端口 22）

### 问题：权限 denied

**解决方案：**
- 检查用户名和密码是否正确
- 如果使用 SSH 密钥，确保密钥文件权限正确：`chmod 600 ~/.ssh/id_rsa_sgc`

### 问题：rsync 同步失败

**检查项：**
- 服务器上目标目录是否存在且有写权限
- 本地构建输出目录是否存在

## 📞 支持

如有问题，请检查：
1. 脚本输出的错误信息
2. 服务器日志：`/var/log/nginx/sgc_website_error.log`
3. 部署日志：查看脚本执行过程中的输出


