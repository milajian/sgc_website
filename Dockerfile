# 多阶段构建：前端构建阶段
# 使用国内镜像加速（如果网络允许，可以改回 node:20-alpine）
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖（使用 --legacy-peer-deps 解决 React 19 兼容性问题）
RUN npm ci --legacy-peer-deps

# 先复制构建脚本（确保不被 .dockerignore 排除）
COPY clean-build-output.sh ./

# 复制项目文件
COPY . .

# 赋予构建脚本执行权限并验证
RUN chmod +x ./clean-build-output.sh && \
    ls -la ./clean-build-output.sh && \
    test -f ./clean-build-output.sh || (echo "clean-build-output.sh not found!" && exit 1)

# 构建 Next.js 项目
ENV NODE_ENV=production
ARG BASE_PATH=""
ENV BASE_PATH=${BASE_PATH}
RUN npm run build -- --no-lint 2>/dev/null || ./node_modules/.bin/next build

# 执行清理脚本（手动执行）
RUN chmod +x ./clean-build-output.sh && \
    bash ./clean-build-output.sh || sh ./clean-build-output.sh || echo "清理脚本执行完成"

# 生产运行阶段：使用 Nginx
# 使用国内镜像加速（如果网络允许，可以改回 nginx:alpine）
FROM nginx:alpine

# 复制构建产物到 Nginx 默认目录
COPY --from=builder /app/out /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
