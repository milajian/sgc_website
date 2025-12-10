#!/bin/bash
# 修复 PCB埋嵌页面问题：重新构建并部署

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  修复 PCB埋嵌页面问题${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${YELLOW}步骤 1: 清理旧的构建输出...${NC}"
rm -rf out .next

echo ""
echo -e "${YELLOW}步骤 2: 使用正确的 basePath 重新构建...${NC}"
echo "使用 BASE_PATH= 确保部署到 IP 地址时路径正确"
BASE_PATH= npm run build

echo ""
echo -e "${YELLOW}步骤 3: 验证构建输出...${NC}"
if [ -f "out/pcb-embedded.html" ]; then
    echo -e "${GREEN}✓ pcb-embedded.html 已生成${NC}"
    if grep -q "埋嵌工艺产品" out/pcb-embedded.html; then
        echo -e "${GREEN}✓ 文件内容正确（包含'埋嵌工艺产品'）${NC}"
    else
        echo -e "${RED}✗ 文件内容可能有问题${NC}"
    fi
else
    echo -e "${RED}✗ pcb-embedded.html 未生成${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}步骤 4: 部署到服务器...${NC}"
echo "请运行: ./deploy.sh"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  构建完成！请运行 ./deploy.sh 部署${NC}"
echo -e "${GREEN}========================================${NC}"

