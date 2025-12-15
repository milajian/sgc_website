const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// 要优化的图片文件列表
const imageFiles = [
  'maiqian1.png',
  'maiqian2.png',
  'maiqian3.png',
  'maiqian4.png',
  'maiqian5.png',
  'maiqian6.png'
];

const assetsDir = path.join(__dirname, '../public/assets');
const backupDir = path.join(__dirname, '../public/assets/maiqian-backup');
const TARGET_WIDTH = 1200; // 目标宽度（考虑 Retina 2x）

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// 确保备份目录存在
function ensureBackupDir() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`✅ 创建备份目录: ${backupDir}\n`);
  }
}

// 备份原文件
function backupFile(filename) {
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
async function optimizeImage(filename) {
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
    const { width: originalWidth, height: originalHeight } = originalMetadata;

    // 计算目标高度（保持宽高比）
    const targetHeight = Math.round((originalHeight / originalWidth) * TARGET_WIDTH);

    // 如果原图已经小于目标尺寸，只压缩不缩放
    const shouldResize = originalWidth > TARGET_WIDTH;
    const finalWidth = shouldResize ? TARGET_WIDTH : originalWidth;
    const finalHeight = shouldResize ? targetHeight : originalHeight;

    // 检测是否使用调色板模式
    const usePalette = await shouldUsePalette(inputPath);

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

    // PNG 压缩选项
    const pngOptions = {
      compressionLevel: 9, // 最高压缩级别
      adaptiveFiltering: true,
    };

    // 如果适合，使用调色板模式
    if (usePalette) {
      pngOptions.palette = true;
    }

    // 执行优化
    await pipeline.png(pngOptions).toFile(tempPath);

    // 检查压缩后的文件大小
    const optimizedStats = fs.statSync(tempPath);
    const optimizedSize = optimizedStats.size;

    // 如果压缩后文件更大，保留原文件
    if (optimizedSize >= originalSize) {
      fs.unlinkSync(tempPath);
      console.log(`⚠️  ${filename}: 压缩后文件未减小，保留原文件`);
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

// 主函数
async function main() {
  console.log('========================================');
  console.log('  PCB埋嵌页面图片优化工具');
  console.log('========================================\n');

  // 确保备份目录存在
  ensureBackupDir();

  // 备份所有文件
  console.log('📦 备份原文件...\n');
  let backedUpCount = 0;
  for (const filename of imageFiles) {
    if (backupFile(filename)) {
      backedUpCount++;
      console.log(`  ✅ 已备份: ${filename}`);
    }
  }
  console.log(`\n备份完成: ${backedUpCount}/${imageFiles.length} 个文件\n`);

  // 优化所有图片
  console.log('🔄 开始优化图片...\n');
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const filename of imageFiles) {
    const result = await optimizeImage(filename);
    if (result) {
      results.push(result);
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;

      if (result.compressed) {
        console.log(`✅ ${filename}:`);
        console.log(`   原始: ${formatFileSize(result.originalSize)} (${result.originalWidth}x${result.originalHeight})`);
        console.log(`   优化: ${formatFileSize(result.optimizedSize)} (${result.finalWidth}x${result.finalHeight})`);
        console.log(`   减少: ${result.reduction}%\n`);
      }
    }
  }

  // 生成报告
  console.log('========================================');
  console.log('  优化报告');
  console.log('========================================\n');

  console.log(`处理文件: ${results.length}/${imageFiles.length}`);
  console.log(`原始总大小: ${formatFileSize(totalOriginalSize)}`);
  console.log(`优化总大小: ${formatFileSize(totalOptimizedSize)}`);
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`总减少: ${totalReduction}% (节省 ${formatFileSize(totalOriginalSize - totalOptimizedSize)})\n`);

  // 输出压缩后的图片尺寸（用于更新代码）
  console.log('========================================');
  console.log('  压缩后的图片尺寸（用于更新代码）');
  console.log('========================================\n');
  results.forEach(result => {
    console.log(`${result.filename}: ${result.finalWidth}x${result.finalHeight}`);
  });

  console.log('\n✅ 优化完成！');
  console.log(`备份文件保存在: ${backupDir}`);
  console.log('如需恢复原文件，请运行: node scripts/restore-maiqian-images.cjs\n');
}

main().catch(console.error);
