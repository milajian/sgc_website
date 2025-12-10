#!/bin/bash
# 清理多余的目录，只保留 HTML 文件

cd /var/www/sgc_website/dist

echo "查找所有既有目录又有 HTML 文件的路径..."
ls -d */ 2>/dev/null | while read dir; do
    dirname=$(basename "$dir")
    if [ -f "${dirname}.html" ]; then
        echo "找到: ${dirname}/ (目录) 和 ${dirname}.html (文件)"
        echo "删除目录: ${dirname}/"
        rm -rf "${dirname}"
    fi
done

echo ""
echo "清理完成！"
echo ""
echo "检查 pcb-coil-product-lines:"
ls -la pcb-coil-product-lines* 2>&1 | head -5

