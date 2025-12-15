const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../public/assets');

// 文件大小阈值（字节）
const SIZE_THRESHOLD = 500 * 1024; // 500KB

// 目标尺寸配置（根据使用场景）
const TARGET_SIZES = {
  hero: 1200,      // Hero 图片
  slider: 1000,    // 轮播图片
  avatar: 400,     // 头像图片
  default: 800,    // 其他图片
};

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// 检测图片类型（根据文件名）
function detectImageType(filename) {
  const lowerName = filename.toLowerCase();
  
  if (lowerName.includes('hero') || lowerName.includes('header')) {
    return 'hero';
  }
  if (lowerName.includes('slider') || lowerName.includes('carousel')) {
    return 'slider';
  }
  if (lowerName.includes('expert') || lowerName.includes('avatar') || lowerName.includes('profile')) {
    return 'avatar';
  }
  
  return 'default';
}

// 检查单个图片文件
async function checkImage(filePath, filename) {
  try {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    
    // 跳过非图片文件
    const ext = path.extname(filename).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
      return null;
    }
    
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;
    
    const imageType = detectImageType(filename);
    const targetWidth = TARGET_SIZES[imageType];
    const needsResize = width > targetWidth;
    const needsCompression = fileSize > SIZE_THRESHOLD;
    
    return {
      filename,
      fileSize,
      width,
      height,
      imageType,
      targetWidth,
      needsResize,
      needsCompression,
      needsOptimization: needsResize || needsCompression,
    };
  } catch (error) {
    console.error(`❌ 检查 ${filename} 失败: ${error.message}`);
    return null;
  }
}

// 主函数
async function main() {
  console.log('========================================');
  console.log('  图片文件检查工具');
  console.log('========================================\n');

  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ 目录不存在: ${assetsDir}`);
    process.exit(1);
  }

  // 读取所有文件
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
  });

  console.log(`📁 扫描目录: ${assetsDir}`);
  console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);

  // 检查所有图片
  const results = [];
  let totalSize = 0;
  let totalOptimizableSize = 0;

  for (const filename of imageFiles) {
    const filePath = path.join(assetsDir, filename);
    const result = await checkImage(filePath, filename);
    
    if (result) {
      results.push(result);
      totalSize += result.fileSize;
      
      if (result.needsOptimization) {
        totalOptimizableSize += result.fileSize;
      }
    }
  }

  // 按文件大小排序
  results.sort((a, b) => b.fileSize - a.fileSize);

  // 生成报告
  console.log('========================================');
  console.log('  检查报告');
  console.log('========================================\n');

  // 需要优化的图片
  const optimizableImages = results.filter(r => r.needsOptimization);
  const largeImages = results.filter(r => r.fileSize > SIZE_THRESHOLD);
  const oversizedImages = results.filter(r => r.needsResize);

  console.log(`📊 统计信息:`);
  console.log(`   总图片数: ${results.length}`);
  console.log(`   总大小: ${formatFileSize(totalSize)}`);
  console.log(`   需要优化的图片: ${optimizableImages.length}`);
  console.log(`   大文件 (>${formatFileSize(SIZE_THRESHOLD)}): ${largeImages.length}`);
  console.log(`   尺寸过大: ${oversizedImages.length}\n`);

  // 详细列表
  if (optimizableImages.length > 0) {
    console.log('========================================');
    console.log('  需要优化的图片列表');
    console.log('========================================\n');
    
    optimizableImages.forEach((result, index) => {
      console.log(`${index + 1}. ${result.filename}`);
      console.log(`   大小: ${formatFileSize(result.fileSize)}`);
      console.log(`   尺寸: ${result.width}x${result.height}`);
      console.log(`   类型: ${result.imageType} (目标宽度: ${result.targetWidth}px)`);
      
      const issues = [];
      if (result.needsCompression) {
        issues.push('文件过大');
      }
      if (result.needsResize) {
        issues.push(`宽度超过目标 (${result.width} > ${result.targetWidth})`);
      }
      console.log(`   问题: ${issues.join(', ')}\n`);
    });

    console.log(`\n💡 预计可节省: ${formatFileSize(totalOptimizableSize)}`);
    console.log(`💡 运行优化脚本: node scripts/optimize-all-images.cjs\n`);
  } else {
    console.log('✅ 所有图片都已优化，无需进一步处理！\n');
  }

  // 最大的10个文件
  console.log('========================================');
  console.log('  最大的10个图片文件');
  console.log('========================================\n');
  
  results.slice(0, 10).forEach((result, index) => {
    console.log(`${index + 1}. ${result.filename}`);
    console.log(`   大小: ${formatFileSize(result.fileSize)}`);
    console.log(`   尺寸: ${result.width}x${result.height}\n`);
  });
}

main().catch(console.error);
