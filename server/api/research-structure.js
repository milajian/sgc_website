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

const researchStructureFile = path.join(dataDir, 'research-structure.json');

// 初始化默认数据
function getDefaultData() {
  return {
    center: {
      title: "技术中心 SGC Labs"
    },
    leadership: [
      { name: "总工程师" },
      { name: "技术委员会" }
    ],
    departments: [
      {
        id: "rnd",
        name: "技术研发部",
        icon: "network",
        groups: [
          "材料研究小组",
          "基础技术小组",
          "仿真小组"
        ]
      },
      {
        id: "product",
        name: "产品研发部",
        icon: "gear",
        groups: [
          "高频高速组",
          "刚挠结合组",
          "光模块小组",
          "ATE小组"
        ]
      },
      {
        id: "project",
        name: "项目管理部",
        icon: "squares",
        functions: [
          "项目流程管理",
          "知识产权管理",
          "重大专项申报",
          "项目评审组织"
        ]
      },
      {
        id: "lab",
        name: "中央实验室",
        icon: "flask",
        functions: [
          "建立研发平台并开放资源",
          "进行研发质量控制",
          "电子产品的失效分析与可靠性研究",
          "半导体集成电路先进封装测试工艺研究实验室"
        ]
      }
    ],
    partners: [
      {
        id: "1",
        name: "南方科技大学",
        logo: ""
      },
      {
        id: "2",
        name: "中国科学院深圳先进技术研究院",
        logo: ""
      },
      {
        id: "3",
        name: "中原工学院",
        logo: ""
      },
      {
        id: "4",
        name: "桂林航天工業學院",
        logo: ""
      }
    ]
  };
}

// 读取组织架构数据
function readResearchStructure() {
  try {
    if (fs.existsSync(researchStructureFile)) {
      const data = fs.readFileSync(researchStructureFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading research structure file:', error);
  }
  return getDefaultData();
}

// 保存组织架构数据
function saveResearchStructure(data) {
  try {
    fs.writeFileSync(researchStructureFile, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving research structure file:', error);
    return false;
  }
}

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const partnerId = req.body.partnerId || 'unknown';
    const ext = path.extname(file.originalname);
    const filename = `partner-${partnerId}-${Date.now()}${ext}`;
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

// 获取组织架构数据
router.get('/', (req, res) => {
  try {
    const data = readResearchStructure();
    res.json(data);
  } catch (error) {
    console.error('Error getting research structure:', error);
    res.status(500).json({ error: '获取组织架构数据失败' });
  }
});

// 更新组织架构数据
router.put('/', (req, res) => {
  try {
    const data = req.body;
    // 验证数据结构
    if (data && typeof data === 'object') {
      if (saveResearchStructure(data)) {
        res.json({ success: true, message: '组织架构数据更新成功' });
      } else {
        res.status(500).json({ error: '保存组织架构数据失败' });
      }
    } else {
      res.status(400).json({ error: '无效的数据格式' });
    }
  } catch (error) {
    console.error('Error updating research structure:', error);
    res.status(500).json({ error: '更新组织架构数据失败' });
  }
});

// 上传合作单位logo
router.post('/upload', upload.single('logo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有上传文件' });
    }

    const partnerId = req.body.partnerId;
    if (!partnerId) {
      return res.status(400).json({ error: '缺少合作单位ID' });
    }

    const filename = req.file.filename;
    // 返回完整的URL路径，包含API基础URL
    const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3001}`;
    const imageUrl = `${apiBaseUrl}/uploads/${filename}`;

    // 更新对应合作单位的logo URL
    const data = readResearchStructure();
    const partnerIndex = data.partners.findIndex(p => p.id === partnerId);
    
    if (partnerIndex !== -1) {
      // 删除旧图片
      if (data.partners[partnerIndex].logo) {
        // 处理旧图片路径（可能是完整URL或相对路径）
        let oldImagePath;
        if (data.partners[partnerIndex].logo.startsWith('http')) {
          // 如果是完整URL，提取文件名
          const oldFilename = data.partners[partnerIndex].logo.split('/').pop();
          oldImagePath = path.join(uploadsDir, oldFilename);
        } else {
          // 如果是相对路径
          oldImagePath = path.join(__dirname, '..', data.partners[partnerIndex].logo.replace(/^\//, ''));
        }
        
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (unlinkError) {
            console.warn('Failed to delete old image:', unlinkError);
          }
        }
      }
      
      data.partners[partnerIndex].logo = imageUrl;
      saveResearchStructure(data);
      
      res.json({ success: true, imageUrl });
    } else {
      res.status(404).json({ error: '合作单位不存在' });
    }
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({ error: '上传logo失败', details: error.message });
  }
});

module.exports = router;


