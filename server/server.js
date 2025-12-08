const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（用于提供上传的图片）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API路由
app.use('/api/experts', require('./api/experts'));
app.use('/api/research-structure', require('./api/research-structure'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 启动服务器（允许外部访问，用于内网穿透）
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`API endpoint: http://${HOST}:${PORT}/api/experts`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
});

