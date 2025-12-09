#!/bin/bash
# 清理 Git 暂存区，只保留源代码文件

set -e

echo "🔍 检查当前 Git 状态..."
echo ""

# 显示当前暂存的文件数量
STAGED_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "当前暂存文件数: $STAGED_COUNT"
echo ""

# 取消暂存所有文件
echo "📦 取消暂存所有文件..."
git reset HEAD

# 只暂存源代码文件
echo "✅ 只暂存源代码文件..."
git add app/ components/ lib/ server/ deploy.sh public/assets/ 2>/dev/null || true

# 显示清理后的状态
echo ""
echo "📊 清理后的暂存文件："
git diff --cached --name-only | head -30
echo ""

NEW_STAGED_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "✅ 清理完成！现在有 $NEW_STAGED_COUNT 个文件待提交（都是源代码文件）"
echo ""
echo "💡 现在可以尝试使用 Cursor 的 'Generate Commit Message' 功能了！"
echo "   或者手动提交：git commit -m '你的提交信息'"


