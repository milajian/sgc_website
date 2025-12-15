const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../public/assets');

// 目标尺寸配置（根据使用场景）
const TARGET_SIZES = {
  hero: 1200,      // Hero 图片
  slider: 1000,    // 轮播图片
  avatar: 400,     // 头像图片
  default: 800,    // 其他图片
};

// 文件大小阈值（字节）
const SIZE_THRESHOLD = 500 * 1024; // 500KB

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

// 确保备份目录存在
function ensureBackupDir() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(assetsDir, `backup-${timestamp}`);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`✅ 创建备份目录: ${backupDir}\n`);
  }
  
  return backupDir;
}

// 备份原文件
function backupFile(filename, backupDir) {
  const sourcePath = path.join(assetsDir, filename);
  const backupPath = path.join(backupDir, filename);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, backupPath);
    return true;
  }
  return false;
}

// 检测图片是否适合使用调色板模式
async function shouldUsePalette(filePath) {
  try {
    const stats = await sharp(filePath).stats();
    const channels = stats.channels;
    // 如果图片有透明度通道，检查唯一颜色数
    if (channels.length === 4) {
      // 简化检测：如果图片较小或颜色较少，使用调色板
      const metadata = await sharp(filePath).metadata();
      const totalPixels = metadata.width * metadata.height;
      // 如果像素数较少，可能颜色也较少
      return totalPixels < 2000000; // 约 1400x1400
    }
    return false;
  } catch (error) {
    return false;
  }
}

// 优化单个图片
async function optimizeImage(filename, targetWidth) {
  const inputPath = path.join(assetsDir, filename);
  const tempPath = path.join(assetsDir, filename + '.tmp');
  
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ ${filename}: 文件不存在，跳过`);
    return null;
  }

  try {
    // 读取原始图片信息
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    const originalMetadata = await sharp(inputPath).metadata();
    const { width: originalWidth, height: originalHeight, format } = originalMetadata;

    // 计算目标高度（保持宽高比）
    const targetHeight = Math.round((originalHeight / originalWidth) * targetWidth);

    // 如果原图已经小于目标尺寸，只压缩不缩放
    const shouldResize = originalWidth > targetWidth;
    const finalWidth = shouldResize ? targetWidth : originalWidth;
    const finalHeight = shouldResize ? targetHeight : originalHeight;

    // 检测是否使用调色板模式（仅PNG）
    const usePalette = format === 'png' && await shouldUsePalette(inputPath);

    // 创建优化管道
    let pipeline = sharp(inputPath);

    // 如果需要缩放
    if (shouldResize) {
      pipeline = pipeline.resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3 // 高质量重采样
      });
    }

    // 根据格式选择优化选项
    if (format === 'png') {
      const pngOptions = {
        compressionLevel: 9, // 最高压缩级别
        adaptiveFiltering: true,
      };

      // 如果适合，使用调色板模式
      if (usePalette) {
        pngOptions.palette = true;
      }

      await pipeline.png(pngOptions).toFile(tempPath);
    } else if (format === 'jpeg' || format === 'jpg') {
      await pipeline.jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      }).toFile(tempPath);
    } else if (format === 'webp') {
      await pipeline.webp({
        quality: 85,
        effort: 6,
      }).toFile(tempPath);
    } else {
      // 其他格式直接复制
      fs.copyFileSync(inputPath, tempPath);
    }

    // 检查压缩后的文件大小
    const optimizedStats = fs.statSync(tempPath);
    const optimizedSize = optimizedStats.size;

    // 如果压缩后文件更大，保留原文件
    if (optimizedSize >= originalSize) {
      fs.unlinkSync(tempPath);
      return {
        filename,
        originalSize,
        optimizedSize: originalSize,
        originalWidth,
        originalHeight,
        finalWidth,
        finalHeight,
        compressed: false
      };
    }

    // 替换原文件
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    // 验证最终尺寸
    const finalMetadata = await sharp(inputPath).metadata();

    return {
      filename,
      originalSize,
      optimizedSize,
      originalWidth,
      originalHeight,
      finalWidth: finalMetadata.width,
      finalHeight: finalMetadata.height,
      compressed: true,
      reduction: ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)
    };
  } catch (error) {
    console.error(`❌ ${filename}: 优化失败 - ${error.message}`);
    // 如果出错，确保临时文件被清理
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
}

// 检查图片是否需要优化
async function shouldOptimize(filePath, filename) {
  try {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    
    // 跳过非图片文件
    const ext = path.extname(filename).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
      return { shouldOptimize: false };
    }
    
    const metadata = await sharp(filePath).metadata();
    const { width } = metadata;
    
    const imageType = detectImageType(filename);
    const targetWidth = TARGET_SIZES[imageType];
    const needsResize = width > targetWidth;
    const needsCompression = fileSize > SIZE_THRESHOLD;
    
    return {
      shouldOptimize: needsResize || needsCompression,
      targetWidth,
      imageType,
    };
  } catch (error) {
    return { shouldOptimize: false };
  }
}

// 主函数
async function main() {
  console.log('========================================');
  console.log('  批量图片优化工具');
  console.log('========================================\n');

  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ 目录不存在: ${assetsDir}`);
    process.exit(1);
  }

  // 确保备份目录存在
  const backupDir = ensureBackupDir();

  // 读取所有文件
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
  });

  console.log(`📁 扫描目录: ${assetsDir}`);
  console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);

  // 检查哪些图片需要优化
  console.log('🔍 检查需要优化的图片...\n');
  const filesToOptimize = [];
  
  for (const filename of imageFiles) {
    const filePath = path.join(assetsDir, filename);
    const check = await shouldOptimize(filePath, filename);
    
    if (check.shouldOptimize) {
      filesToOptimize.push({
        filename,
        targetWidth: check.targetWidth,
        imageType: check.imageType,
      });
    }
  }

  if (filesToOptimize.length === 0) {
    console.log('✅ 所有图片都已优化，无需进一步处理！\n');
    return;
  }

  console.log(`📋 需要优化的图片: ${filesToOptimize.length} 个\n`);

  // 备份所有需要优化的文件
  console.log('📦 备份原文件...\n');
  let backedUpCount = 0;
  for (const file of filesToOptimize) {
    if (backupFile(file.filename, backupDir)) {
      backedUpCount++;
      console.log(`  ✅ 已备份: ${file.filename}`);
    }
  }
  console.log(`\n备份完成: ${backedUpCount}/${filesToOptimize.length} 个文件\n`);

  // 优化所有图片
  console.log('🔄 开始优化图片...\n');
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of filesToOptimize) {
    const result = await optimizeImage(file.filename, file.targetWidth);
    if (result) {
      results.push(result);
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;

      if (result.compressed) {
        console.log(`✅ ${result.filename}:`);
        console.log(`   类型: ${file.imageType} (目标宽度: ${file.targetWidth}px)`);
        console.log(`   原始: ${formatFileSize(result.originalSize)} (${result.originalWidth}x${result.originalHeight})`);
        console.log(`   优化: ${formatFileSize(result.optimizedSize)} (${result.finalWidth}x${result.finalHeight})`);
        console.log(`   减少: ${result.reduction}%\n`);
      } else {
        console.log(`⚠️  ${result.filename}: 压缩后文件未减小，保留原文件\n`);
      }
    }
  }

  // 生成报告
  console.log('========================================');
  console.log('  优化报告');
  console.log('========================================\n');

  const compressedCount = results.filter(r => r.compressed).length;
  console.log(`处理文件: ${results.length}/${filesToOptimize.length}`);
  console.log(`成功压缩: ${compressedCount}`);
  console.log(`原始总大小: ${formatFileSize(totalOriginalSize)}`);
  console.log(`优化总大小: ${formatFileSize(totalOptimizedSize)}`);
  const totalReduction = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
    : 0;
  console.log(`总减少: ${totalReduction}% (节省 ${formatFileSize(totalOriginalSize - totalOptimizedSize)})\n`);

  console.log('✅ 优化完成！');
  console.log(`备份文件保存在: ${backupDir}\n`);
}

main().catch(console.error);
