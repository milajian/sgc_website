const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../public/assets');

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

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

// 检查 WebP 版本是否存在
function hasWebpVersion(imagePath) {
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png|gif|bmp)$/i, '.webp');
  const fullWebpPath = path.join(assetsDir, webpPath);
  return fs.existsSync(fullWebpPath);
}

// 主函数
function main() {
  console.log('🔍 检查 WebP 版本覆盖率...\n');

  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ 目录不存在: ${assetsDir}`);
    process.exit(1);
  }

  const imageFiles = getAllImageFiles(assetsDir);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  未找到图片文件');
    return;
  }

  console.log(`📁 找到 ${imageFiles.length} 个图片文件\n`);

  const withWebp = [];
  const withoutWebp = [];

  imageFiles.forEach((file) => {
    if (hasWebpVersion(file)) {
      withWebp.push(file);
    } else {
      withoutWebp.push(file);
    }
  });

  console.log('='.repeat(60));
  console.log('📊 检查结果:');
  console.log(`   ✅ 有 WebP 版本: ${withWebp.length} 个`);
  console.log(`   ❌ 缺少 WebP 版本: ${withoutWebp.length} 个`);
  console.log(`   📈 覆盖率: ${((withWebp.length / imageFiles.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (withoutWebp.length > 0) {
    console.log('\n❌ 缺少 WebP 版本的图片文件:');
    withoutWebp.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
    console.log('\n💡 提示: 运行以下命令生成缺失的 WebP 版本:');
    console.log('   node scripts/convert-to-webp.cjs');
  } else {
    console.log('\n✨ 所有图片都有 WebP 版本！');
  }
}

// 运行主函数
main();
