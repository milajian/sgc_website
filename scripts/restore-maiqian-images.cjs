const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '../public/assets');
const backupDir = path.join(__dirname, '../public/assets/maiqian-backup');

const imageFiles = [
  'maiqian1.png',
  'maiqian2.png',
  'maiqian3.png',
  'maiqian4.png',
  'maiqian5.png',
  'maiqian6.png'
];

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function restoreFile(filename) {
  const backupPath = path.join(backupDir, filename);
  const targetPath = path.join(assetsDir, filename);

  if (!fs.existsSync(backupPath)) {
    console.log(`⚠️  ${filename}: 备份文件不存在，跳过`);
    return false;
  }

  try {
    // 如果目标文件存在，先备份当前文件（添加 .current 后缀）
    if (fs.existsSync(targetPath)) {
      const currentBackupPath = targetPath + '.current';
      fs.copyFileSync(targetPath, currentBackupPath);
      console.log(`  📦 已备份当前文件: ${filename}.current`);
    }

    // 恢复备份文件
    fs.copyFileSync(backupPath, targetPath);
    const stats = fs.statSync(targetPath);
    console.log(`  ✅ 已恢复: ${filename} (${formatFileSize(stats.size)})`);
    return true;
  } catch (error) {
    console.error(`  ❌ ${filename}: 恢复失败 - ${error.message}`);
    return false;
  }
}

function main() {
  console.log('========================================');
  console.log('  恢复 PCB埋嵌页面图片');
  console.log('========================================\n');

  if (!fs.existsSync(backupDir)) {
    console.log('❌ 备份目录不存在，无法恢复文件');
    console.log(`备份目录路径: ${backupDir}\n`);
    process.exit(1);
  }

  console.log('📦 开始恢复文件...\n');
  let restoredCount = 0;

  for (const filename of imageFiles) {
    if (restoreFile(filename)) {
      restoredCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`恢复完成: ${restoredCount}/${imageFiles.length} 个文件`);
  console.log('========================================\n');
}

main();
