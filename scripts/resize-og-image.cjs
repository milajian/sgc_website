const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/assets/showimage.png');
const outputPath = path.join(__dirname, '../public/assets/showimage.png');
const tempPath = path.join(__dirname, '../public/assets/showimage.tmp.png');

async function resizeImage() {
  try {
    // 读取原始图片信息
    const metadata = await sharp(inputPath).metadata();
    console.log(`原始图片尺寸: ${metadata.width}x${metadata.height}`);
    
    // 强制缩放到 1200x630，不保持比例（会拉伸或压缩）
    // 先写入临时文件
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'fill', // 'fill' 会强制拉伸/压缩到指定尺寸，不保持比例
        kernel: sharp.kernel.lanczos3 // 使用高质量的重采样算法
      })
      .png({ 
        quality: 90,
        compressionLevel: 9
      })
      .toFile(tempPath);
    
    // 删除原文件
    fs.unlinkSync(inputPath);
    // 重命名临时文件为原文件名
    fs.renameSync(tempPath, outputPath);
    
    // 验证输出尺寸
    const outputMetadata = await sharp(outputPath).metadata();
    console.log(`✅ 图片已成功缩放到 ${outputMetadata.width}x${outputMetadata.height}`);
    console.log(`输出路径: ${outputPath}`);
  } catch (error) {
    console.error('❌ 缩放失败:', error);
    // 如果出错，尝试清理临时文件
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    process.exit(1);
  }
}

resizeImage();

