const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../public/assets');

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

// WebP 质量配置
const WEBP_QUALITY = {
  hero: 85,      // Hero 图片：高质量
  slider: 80,    // 轮播图片：中等质量
  avatar: 75,    // 头像图片：较低质量（通常较小）
  default: 80,   // 其他图片：中等质量
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

// 转换单个图片为 WebP
async function convertToWebp(filename) {
  const inputPath = path.join(assetsDir, filename);
  const outputPath = path.join(assetsDir, filename.replace(/\.(jpg|jpeg|png|gif|bmp)$/i, '.webp'));

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ ${filename}: 文件不存在，跳过`);
    return null;
  }

  // 如果 WebP 文件已存在，检查是否需要更新
  if (fs.existsSync(outputPath)) {
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    
    // 如果原文件未修改，跳过
    if (inputStats.mtime <= outputStats.mtime) {
      console.log(`⏭️  ${filename}: WebP 文件已存在且未过期，跳过`);
      return null;
    }
  }

  try {
    const imageType = detectImageType(filename);
    const quality = WEBP_QUALITY[imageType];
    
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;

    // 转换为 WebP
    await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toFile(outputPath);

    const webpStats = fs.statSync(outputPath);
    const webpSize = webpStats.size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${filename}: ${formatFileSize(originalSize)} → ${formatFileSize(webpSize)} (节省 ${savings}%)`);

    return {
      filename,
      originalSize,
      webpSize,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`❌ ${filename}: 转换失败 - ${error.message}`);
    return null;
  }
}

// 递归获取所有图片文件
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 跳过备份目录和 node_modules
      if (!file.startsWith('backup-') && file !== 'node_modules') {
        getAllImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        // 获取相对路径
        const relativePath = path.relative(assetsDir, filePath);
        fileList.push(relativePath);
      }
    }
  });

  return fileList;
}

// 主函数
async function main() {
  console.log('🚀 开始转换图片为 WebP 格式...\n');

  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ 目录不存在: ${assetsDir}`);
    process.exit(1);
  }

  const imageFiles = getAllImageFiles(assetsDir);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  未找到需要转换的图片文件');
    return;
  }

  console.log(`📁 找到 ${imageFiles.length} 个图片文件\n`);

  const results = [];
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    const result = await convertToWebp(file);
    if (result) {
      if (result.savings !== null) {
        results.push(result);
        successCount++;
      } else {
        skipCount++;
      }
    } else {
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 转换统计:');
  console.log(`   ✅ 成功: ${successCount} 个`);
  console.log(`   ⏭️  跳过: ${skipCount} 个`);
  console.log(`   ❌ 失败: ${errorCount} 个`);

  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);

    console.log('\n💾 文件大小统计:');
    console.log(`   原始总大小: ${formatFileSize(totalOriginal)}`);
    console.log(`   WebP 总大小: ${formatFileSize(totalWebp)}`);
    console.log(`   总节省: ${totalSavings}%`);
  }

  console.log('\n✨ 转换完成！');
}

// 运行主函数
main().catch((error) => {
  console.error('❌ 发生错误:', error);
  process.exit(1);
});
