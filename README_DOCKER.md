# Docker 部署指南

本项目支持使用 Docker 和 Docker Compose 进行一键部署。

## 前置要求

- Docker >= 20.10
- Docker Compose >= 2.0

## 快速开始

### 1. 构建并启动服务

```bash
docker-compose up -d
```

### 2. 访问应用

- 前端：http://localhost
- 后端 API：http://localhost:3001

## 环境变量配置

可以创建 `.env` 文件来配置环境变量：

```env
# 前端路径前缀（可选，默认根路径）
BASE_PATH=

# API URL（通常不需要修改，会自动配置）
NEXT_PUBLIC_API_URL=http://backend:3001
```

如果不需要路径前缀，可以省略 `BASE_PATH`。

## 常用命令

### 启动服务
```bash
docker-compose up -d
```

### 查看日志
```bash
# 查看所有服务日志
docker-compose logs -f

# 查看前端日志
docker-compose logs -f frontend

# 查看后端日志
docker-compose logs -f backend
```

### 停止服务
```bash
docker-compose down
```

### 重新构建
```bash
docker-compose up -d --build
```

### 查看服务状态
```bash
docker-compose ps
```

## 数据持久化

后端的数据和上传的文件保存在 Docker 卷中：

- `backend-data`: 专家数据 JSON 文件
- `backend-uploads`: 上传的图片文件

如需备份，可以导出这些卷：

```bash
# 导出数据卷
docker run --rm -v sgc_website_backend-data:/data -v $(pwd):/backup alpine tar czf /backup/backend-data.tar.gz -C /data .
docker run --rm -v sgc_website_backend-uploads:/data -v $(pwd):/backup alpine tar czf /backup/backend-uploads.tar.gz -C /data .
```

## 端口配置

默认端口：
- 前端（Nginx）：80
- 后端 API：3001

如需修改，编辑 `docker-compose.yml` 中的 `ports` 配置。

## 健康检查

后端服务提供健康检查接口：
```bash
curl http://localhost:3001/health
```

## 故障排查

### 1. 前端无法访问后端 API

检查 `nginx.conf` 中的 `proxy_pass` 配置，确保指向 `http://backend:3001`

### 2. 构建失败

- 确保所有必需文件都在项目中
- 检查网络连接（需要下载 npm 依赖）
- 查看构建日志：`docker-compose logs frontend`

### 3. 权限问题

确保 `clean-build-output.sh` 有执行权限：
```bash
chmod +x clean-build-output.sh
```

## 生产环境部署建议

1. **使用 HTTPS**：在前端添加 SSL 证书，配置 Nginx 支持 HTTPS
2. **资源限制**：在 `docker-compose.yml` 中添加资源限制
3. **日志管理**：配置日志轮转和集中管理
4. **监控**：添加健康检查和监控工具
5. **备份策略**：定期备份数据卷

## 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose up -d --build
```
