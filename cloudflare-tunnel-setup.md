# Cloudflare Tunnel 配置指南

## 📋 概述

Cloudflare Tunnel（原 Argo Tunnel）可以为 IP 地址提供免费的 HTTPS 访问，无需配置 SSL 证书。这对于解决 LinkedIn 等平台的混合内容问题非常有效。

## 🎯 方案优势

- ✅ 免费 HTTPS 访问
- ✅ 无需域名
- ✅ 无需配置 SSL 证书
- ✅ 自动提供 HTTPS
- ✅ 支持 IP 地址

## 📝 配置步骤

### 1. 注册 Cloudflare 账号

1. 访问：https://one.dash.cloudflare.com/
2. 注册免费账号（如果还没有）

### 2. 创建 Tunnel

1. 登录 Cloudflare Zero Trust Dashboard
2. 进入 **Networks** → **Tunnels**
3. 点击 **Create a tunnel**
4. 选择 **Cloudflared** 作为连接方式
5. 输入 Tunnel 名称（例如：`sgc-website`）
6. 点击 **Save tunnel**

### 3. 安装 Cloudflared

在服务器上安装 Cloudflared：

```bash
# 下载并安装 cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# 或者使用包管理器（Ubuntu/Debian）
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

### 4. 配置 Tunnel

1. 在 Cloudflare Dashboard 中，点击创建的 Tunnel
2. 点击 **Configure** 按钮
3. 添加 Public Hostname：
   - **Subdomain**: 选择一个子域名（例如：`sgc-47-106-73-160`）
   - **Domain**: 选择 Cloudflare 提供的免费域名（例如：`trycloudflare.com`）
   - **Service**: `http://localhost:80`
4. 点击 **Save hostname**

### 5. 运行 Tunnel

在服务器上运行：

```bash
# 使用 Cloudflare 提供的命令运行
# 命令会在 Dashboard 中显示，类似：
cloudflared tunnel --config /path/to/config.yml run
```

### 6. 配置为系统服务（可选）

创建 systemd 服务文件：

```bash
sudo nano /etc/systemd/system/cloudflared.service
```

内容：

```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/cloudflared tunnel --config /root/.cloudflared/config.yml run
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
sudo systemctl status cloudflared
```

## 🔄 更新代码

配置完成后，你会得到一个 HTTPS URL，例如：
`https://sgc-47-106-73-160.trycloudflare.com`

更新 `app/layout.tsx` 中的 OG 图片 URL 为新的 HTTPS URL。

## 📚 参考资源

- Cloudflare Tunnel 文档：https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- Cloudflare Zero Trust Dashboard：https://one.dash.cloudflare.com/





