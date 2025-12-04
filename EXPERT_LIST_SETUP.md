# 专家列表功能设置指南

## 功能概述

已创建完整的专家列表功能，包括：
1. **前端展示页面** - `/tech-center/expert-list`
2. **管理后台页面** - `/admin/expert-list`
3. **后端API服务** - 独立Node.js服务器

## 文件结构

```
├── app/
│   ├── tech-center/
│   │   └── expert-list/
│   │       └── page.tsx          # 专家列表展示页面
│   └── admin/
│       └── expert-list/
│           └── page.tsx          # 管理后台页面
├── components/
│   └── ExpertTeam.tsx            # 专家团队组件
├── lib/
│   └── api-config.ts             # API配置
└── server/
    ├── server.js                 # 后端服务器主文件
    ├── api/
    │   └── experts.js            # 专家API路由
    ├── data/
    │   └── experts.json           # 专家数据存储（自动创建）
    ├── uploads/                  # 图片上传目录（自动创建）
    ├── package.json              # 后端依赖
    └── README.md                 # 后端使用说明
```

## 快速开始

### 1. 启动后端服务

```bash
# 进入server目录
cd server

# 安装依赖
npm install

# 启动服务（开发模式，自动重启）
npm run dev

# 或生产模式
npm start
```

后端服务将在 `http://localhost:3001` 启动

### 2. 配置前端API地址

创建或更新 `.env.local` 文件：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

如果不设置，前端会默认使用 `http://localhost:3001`

### 3. 启动前端开发服务器

```bash
# 在项目根目录
npm run dev
```

### 4. 访问页面

- **专家列表展示页面**: http://localhost:3000/tech-center/expert-list
- **管理后台页面**: http://localhost:3000/admin/expert-list

## 使用说明

### 管理后台功能

1. **编辑专家信息**
   - 修改姓名、角色、教育背景、成就等信息
   - 实时预览更改

2. **上传专家照片**
   - 点击"选择文件"按钮
   - 选择图片文件（支持 jpg, png, gif, webp）
   - 图片会自动上传并显示

3. **添加/删除专家**
   - 点击"添加专家"按钮添加新专家
   - 点击删除图标删除专家（至少保留1位）

4. **保存更改**
   - 点击"保存"按钮保存所有更改
   - 数据会保存到 `server/data/experts.json`

### API端点

#### GET /api/experts
获取所有专家列表

#### PUT /api/experts
更新专家数据
```json
[
  {
    "id": "1",
    "name": "回思樾",
    "role": "定子设计、生产制造工程师",
    "roleTitle": "定子设计 工程师",
    "education": "桂林电子科技大学 硕士",
    "achievements": "发表专利4篇,其中发明专利3篇,实用新型专利1篇",
    "image": "/uploads/expert-1-1234567890.jpg"
  }
]
```

#### POST /api/experts/upload
上传专家照片
- Content-Type: multipart/form-data
- 参数：
  - `image`: 图片文件
  - `expertId`: 专家ID

## 页面布局说明

根据提供的图片，页面布局包括：

1. **顶部角色栏**（4个绿色框）
   - 显示角色标题和姓名
   - 例如："定子设计 工程师 回思樾"

2. **详细信息卡片**（4个白色面板）
   - 每个专家一个卡片
   - 包含：照片、姓名、角色描述、教育背景、主要成就

## 数据存储

- **专家数据**: `server/data/experts.json`
- **上传图片**: `server/uploads/`

## 注意事项

1. **后端服务必须运行**：前端页面需要后端API才能正常工作
2. **图片路径**：上传的图片路径是相对于后端服务器的 `/uploads/` 目录
3. **CORS配置**：后端已配置CORS，允许前端跨域请求
4. **文件大小限制**：图片上传限制为5MB
5. **默认数据**：如果后端不可用，前端会使用默认的4位专家数据

## 部署说明

### 开发环境
- 前端：`npm run dev` (端口3000)
- 后端：`npm run dev` (端口3001)

### 生产环境

1. **构建前端**
```bash
npm run build
```

2. **启动后端服务**
```bash
cd server
npm start
```

3. **配置环境变量**
```bash
# 前端 .env.production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# 后端环境变量
PORT=3001
```

## 故障排除

### 前端无法获取数据
- 检查后端服务是否运行
- 检查 `NEXT_PUBLIC_API_URL` 配置是否正确
- 检查浏览器控制台是否有CORS错误

### 图片无法上传
- 检查 `server/uploads/` 目录是否存在且有写权限
- 检查文件大小是否超过5MB
- 检查文件格式是否支持

### 数据无法保存
- 检查 `server/data/` 目录是否存在且有写权限
- 检查后端日志是否有错误信息

