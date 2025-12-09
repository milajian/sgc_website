const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 确保数据目录存在
const dataDir = path.join(__dirname, '../data');
const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const expertsFile = path.join(dataDir, 'experts.json');

// 初始化默认数据
function getDefaultExperts() {
  return [
    {
      id: '1',
      name: '回思樾',
      role: '定子设计、生产制造工程师',
      roleTitle: '定子设计 工程师',
      education: '桂林电子科技大学 硕士',
      achievements: '发表专利4篇,其中发明专利3篇,实用新型专利1篇',
      image: ''
    },
    {
      id: '2',
      name: '颜嘉豪',
      role: '仿真工程师、生产制造工程师',
      roleTitle: '热仿真 工程师',
      education: '陕西科技大学 硕士',
      achievements: '发表论文1篇,专利1篇',
      image: ''
    },
    {
      id: '3',
      name: '段李权',
      role: 'NPI主管,负责难度板跟进及交付',
      roleTitle: '制造 主管',
      education: '电子科技大学 本科',
      achievements: '具有15年厚铜生产经验,发表专利10余篇',
      image: ''
    },
    {
      id: '4',
      name: '刘伟',
      role: '电机专家,电机电磁仿真,结构设计',
      roleTitle: '电磁仿真 技术专家',
      education: '长沙理工大学 本科',
      achievements: '13年电机研发经验,实用新型专利4篇',
      image: ''
    }
  ];
}

// 读取专家数据
function readExperts() {
  try {
    if (fs.existsSync(expertsFile)) {
      const data = fs.readFileSync(expertsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading experts file:', error);
  }
  return getDefaultExperts();
}

// 保存专家数据
function saveExperts(experts) {
  try {
    fs.writeFileSync(expertsFile, JSON.stringify(experts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving experts file:', error);
    return false;
  }
}

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const expertId = req.body.expertId || 'unknown';
    const ext = path.extname(file.originalname);
    const filename = `expert-${expertId}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

// 获取所有专家
router.get('/', (req, res) => {
  try {
    const experts = readExperts();
    res.json(experts);
  } catch (error) {
    console.error('Error getting experts:', error);
    res.status(500).json({ error: '获取专家数据失败' });
  }
});

// 更新专家数据
router.put('/', (req, res) => {
  try {
    const experts = req.body;
    if (Array.isArray(experts)) {
      if (saveExperts(experts)) {
        res.json({ success: true, message: '专家数据更新成功' });
      } else {
        res.status(500).json({ error: '保存专家数据失败' });
      }
    } else {
      res.status(400).json({ error: '无效的数据格式' });
    }
  } catch (error) {
    console.error('Error updating experts:', error);
    res.status(500).json({ error: '更新专家数据失败' });
  }
});

// 上传专家照片
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传文件' });
    }

    const expertId = req.body.expertId;
    if (!expertId) {
      return res.status(400).json({ error: '缺少专家ID' });
    }

    const filename = req.file.filename;
    // 返回相对路径，通过Next.js API代理访问
    const imageUrl = `/uploads/${filename}`;

    // 更新对应专家的图片URL
    const experts = readExperts();
    const expertIndex = experts.findIndex(e => e.id === expertId);
    
    if (expertIndex !== -1) {
      // 删除旧图片
      if (experts[expertIndex].image) {
        // 处理旧图片路径（可能是完整URL或相对路径）
        let oldImagePath;
        if (experts[expertIndex].image.startsWith('http')) {
          // 如果是完整URL，提取文件名
          const oldFilename = experts[expertIndex].image.split('/').pop();
          oldImagePath = path.join(uploadsDir, oldFilename);
        } else {
          // 如果是相对路径
          oldImagePath = path.join(__dirname, '..', experts[expertIndex].image.replace(/^\//, ''));
        }
        
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (unlinkError) {
            console.warn('Failed to delete old image:', unlinkError);
          }
        }
      }
      
      experts[expertIndex].image = imageUrl;
      saveExperts(experts);
      
      res.json({ success: true, imageUrl });
    } else {
      res.status(404).json({ error: '专家不存在' });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: '上传图片失败', details: error.message });
  }
});

module.exports = router;

