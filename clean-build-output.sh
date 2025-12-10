#!/bin/bash
# 清理 Next.js 构建输出：删除与 HTML 文件同名的目录
# 这些目录是 Next.js 静态导出时生成的，会导致 403 错误

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 构建输出目录
BUILD_DIR="${1:-out}"

if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}错误: 构建输出目录不存在: $BUILD_DIR${NC}"
    exit 1
fi

echo -e "${YELLOW}清理 Next.js 构建输出目录...${NC}"
echo -e "目标目录: $BUILD_DIR"
echo ""

# 计数器
deleted_count=0

# 查找所有 HTML 文件（排除根目录的 index.html 和 404.html）
while IFS= read -r html_file; do
    # 获取文件名（不含扩展名）
    html_basename=$(basename "$html_file" .html)
    
    # 对应的目录路径
    dir_path="$BUILD_DIR/$html_basename"
    
    # 如果对应的目录存在，删除它
    if [ -d "$dir_path" ]; then
        echo -e "${YELLOW}删除目录: $dir_path${NC}"
        rm -rf "$dir_path"
        deleted_count=$((deleted_count + 1))
    fi
done < <(find "$BUILD_DIR" -maxdepth 1 -type f -name "*.html" ! -name "index.html" ! -name "404.html")

# 处理子目录中的 HTML 文件（如 tech-center/expert-list.html）
while IFS= read -r html_file; do
    # 获取相对于 BUILD_DIR 的路径
    rel_path="${html_file#$BUILD_DIR/}"
    # 获取目录部分（不含文件名）
    dir_part=$(dirname "$rel_path")
    # 获取文件名（不含扩展名）
    html_basename=$(basename "$html_file" .html)
    
    # 对应的目录路径
    dir_path="$BUILD_DIR/$dir_part/$html_basename"
    
    # 如果对应的目录存在，删除它
    if [ -d "$dir_path" ]; then
        echo -e "${YELLOW}删除目录: $dir_path${NC}"
        rm -rf "$dir_path"
        deleted_count=$((deleted_count + 1))
    fi
done < <(find "$BUILD_DIR" -mindepth 2 -type f -name "*.html")

echo ""
echo -e "${GREEN}✓ 清理完成${NC}"
echo -e "已删除 $deleted_count 个不必要的目录"

