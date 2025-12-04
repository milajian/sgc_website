# 专家列表后端服务

## 安装依赖

```bash
cd server
npm install
```

## 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务将在 `http://localhost:3001` 启动

## API 端点

### GET /api/experts
获取所有专家列表

### PUT /api/experts
更新专家数据
请求体：JSON 数组，包含所有专家信息

### POST /api/experts/upload
上传专家照片
请求体：FormData
- image: 图片文件
- expertId: 专家ID

## 数据存储

- 专家数据存储在 `server/data/experts.json`
- 上传的图片存储在 `server/uploads/`

## 配置

可以通过环境变量 `PORT` 修改端口号：
```bash
PORT=3001 npm start
```

