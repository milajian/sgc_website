const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imageFiles = [
  'maiqian1.png',
  'maiqian2.png',
  'maiqian3.png',
  'maiqian4.png',
  'maiqian5.png',
  'maiqian6.png'
];

const assetsDir = path.join(__dirname, '../public/assets');

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function checkImageSizes() {
  console.log('========================================');
  console.log('  检查 PCB埋嵌页面图片文件大小');
  console.log('========================================\n');

  let totalSize = 0;
  let missingFiles = [];
  let foundFiles = [];

  for (const filename of imageFiles) {
    const filePath = path.join(assetsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      missingFiles.push(filename);
      console.log(`❌ ${filename}: 文件不存在`);
      continue;
    }

    try {
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;
      totalSize += fileSize;

      const metadata = await sharp(filePath).metadata();
      const { width, height, format } = metadata;

      foundFiles.push({
        filename,
        fileSize,
        width,
        height,
        format
      });

      console.log(`✅ ${filename}:`);
      console.log(`   文件大小: ${formatFileSize(fileSize)}`);
      console.log(`   图片尺寸: ${width}x${height} 像素`);
      console.log(`   格式: ${format}`);
      
      if (fileSize > 500 * 1024) {
        console.log(`   ⚠️  警告: 文件较大，建议压缩`);
      } else if (fileSize > 200 * 1024) {
        console.log(`   💡 提示: 文件大小适中，但可以进一步优化`);
      }
      console.log('');
    } catch (error) {
      console.log(`❌ ${filename}: 读取失败 - ${error.message}`);
    }
  }

  console.log('========================================');
  console.log('  汇总信息');
  console.log('========================================\n');
  
  console.log(`找到文件: ${foundFiles.length}/${imageFiles.length}`);
  console.log(`缺失文件: ${missingFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.log(`\n缺失的文件列表:`);
    missingFiles.forEach(file => console.log(`  - ${file}`));
  }

  console.log(`\n总文件大小: ${formatFileSize(totalSize)}`);
  console.log(`平均文件大小: ${foundFiles.length > 0 ? formatFileSize(totalSize / foundFiles.length) : 'N/A'}`);

  console.log('\n========================================');
  console.log('  优化建议');
  console.log('========================================\n');

  const largeFiles = foundFiles.filter(f => f.fileSize > 500 * 1024);
  const mediumFiles = foundFiles.filter(f => f.fileSize > 200 * 1024 && f.fileSize <= 500 * 1024);
  
  if (largeFiles.length > 0) {
    console.log('⚠️  以下文件较大（>500KB），强烈建议压缩:');
    largeFiles.forEach(file => {
      console.log(`  - ${file.filename}: ${formatFileSize(file.fileSize)}`);
    });
  }
  
  if (mediumFiles.length > 0) {
    console.log('\n💡 以下文件可以进一步优化（200-500KB）:');
    mediumFiles.forEach(file => {
      console.log(`  - ${file.filename}: ${formatFileSize(file.fileSize)}`);
    });
  }
  
  if (largeFiles.length === 0 && mediumFiles.length === 0) {
    console.log('✅ 所有图片文件大小合理（<200KB）');
  } else {
    console.log('\n建议使用以下工具压缩:');
    console.log('  1. TinyPNG (https://tinypng.com/) - 在线压缩');
    console.log('  2. ImageOptim (macOS) - 本地压缩工具');
  }

  if (foundFiles.length > 1) {
    const firstSize = { width: foundFiles[0].width, height: foundFiles[0].height };
    const allSameSize = foundFiles.every(f => 
      f.width === firstSize.width && f.height === firstSize.height
    );
    
    if (!allSameSize) {
      console.log('\n⚠️  图片尺寸不一致:');
      foundFiles.forEach(file => {
        console.log(`  - ${file.filename}: ${file.width}x${file.height}`);
      });
    } else {
      console.log(`\n✅ 所有图片尺寸一致: ${firstSize.width}x${firstSize.height}`);
    }
  }
  
  console.log('\n========================================');
  console.log('  加载性能分析');
  console.log('========================================\n');
  
  if (totalSize > 3 * 1024 * 1024) {
    console.log('⚠️  总文件大小超过 3MB，在慢速网络下加载可能较慢');
    console.log('建议: 压缩图片或使用 WebP 格式');
  } else if (totalSize > 1.5 * 1024 * 1024) {
    console.log('💡 总文件大小适中，但仍有优化空间');
  } else {
    console.log('✅ 总文件大小合理，加载速度应该较快');
  }
}

checkImageSizes().catch(console.error);
