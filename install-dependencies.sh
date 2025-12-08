#!/bin/bash
# 安装部署所需的依赖工具

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  安装部署依赖工具${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macOS"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            echo "debian"
        elif command -v yum &> /dev/null; then
            echo "rhel"
        else
            echo "unknown"
        fi
    else
        echo "unknown"
    fi
}

OS=$(detect_os)

# 安装 sshpass
install_sshpass() {
    echo -e "${YELLOW}检查 sshpass...${NC}"
    
    if command -v sshpass &> /dev/null; then
        echo -e "${GREEN}✓ sshpass 已安装${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}安装 sshpass...${NC}"
    
    case "$OS" in
        "macOS")
            # 检查 Homebrew
            if ! command -v brew &> /dev/null; then
                echo -e "${RED}错误: 未安装 Homebrew${NC}"
                echo ""
                echo "请先安装 Homebrew:"
                echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                echo ""
                echo "然后运行此脚本，或手动安装 sshpass:"
                echo "  brew install hudochenkov/sshpass/sshpass"
                exit 1
            fi
            
            brew install hudochenkov/sshpass/sshpass
            ;;
        "debian")
            sudo apt-get update
            sudo apt-get install -y sshpass
            ;;
        "rhel")
            sudo yum install -y sshpass
            ;;
        *)
            echo -e "${RED}错误: 无法识别操作系统${NC}"
            echo "请手动安装 sshpass:"
            echo "  macOS: brew install hudochenkov/sshpass/sshpass"
            echo "  Ubuntu/Debian: sudo apt-get install sshpass"
            echo "  CentOS/RHEL: sudo yum install sshpass"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}✓ sshpass 安装完成${NC}"
}

# 安装 rsync
install_rsync() {
    echo -e "${YELLOW}检查 rsync...${NC}"
    
    if command -v rsync &> /dev/null; then
        echo -e "${GREEN}✓ rsync 已安装${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}安装 rsync...${NC}"
    
    case "$OS" in
        "macOS")
            # macOS 通常自带 rsync
            echo -e "${YELLOW}macOS 通常自带 rsync，如果未找到请手动安装${NC}"
            ;;
        "debian")
            sudo apt-get install -y rsync
            ;;
        "rhel")
            sudo yum install -y rsync
            ;;
    esac
    
    echo -e "${GREEN}✓ rsync 安装完成${NC}"
}

# 主函数
main() {
    install_sshpass
    install_rsync
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  依赖安装完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "现在可以运行部署脚本:"
    echo "  npm run deploy"
    echo "  或"
    echo "  ./deploy.sh"
}

main "$@"


