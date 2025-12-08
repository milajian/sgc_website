#!/bin/bash
# 快速部署脚本 - 使用 expect 作为 sshpass 的替代方案

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 加载配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "${SCRIPT_DIR}/deploy.config.sh" ]; then
    source "${SCRIPT_DIR}/deploy.config.sh"
else
    echo -e "${RED}错误: 找不到配置文件 deploy.config.sh${NC}"
    exit 1
fi

# 检查 expect
if ! command -v expect &> /dev/null; then
    echo -e "${YELLOW}未安装 expect，尝试使用 sshpass...${NC}"
    if ! command -v sshpass &> /dev/null; then
        echo -e "${RED}错误: 需要安装 sshpass 或 expect${NC}"
        echo ""
        echo "请选择以下方式之一安装:"
        echo ""
        echo "方式1: 安装 Homebrew 和 sshpass"
        echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        echo "  brew install hudochenkov/sshpass/sshpass"
        echo ""
        echo "方式2: 使用 expect（macOS 通常自带）"
        echo "  # expect 通常已预装，如果未安装:"
        echo "  # macOS: expect 通常已预装"
        echo ""
        echo "方式3: 手动输入密码"
        echo "  运行: ./deploy.sh"
        echo "  当提示输入密码时，手动输入: Bootool=300739"
        exit 1
    fi
    USE_SSHPASS=true
else
    USE_SSHPASS=false
fi

# 使用 expect 执行 SSH 命令
ssh_with_password() {
    local cmd="$1"
    expect <<EOF
set timeout 30
spawn ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} "$cmd"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "Password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF
}

# 使用 expect 执行 rsync
rsync_with_password() {
    local src="$1"
    local dst="$2"
    expect <<EOF
set timeout 300
spawn rsync -avz --delete --exclude='.git' -e "ssh -o StrictHostKeyChecking=no" "${src}" "${DEPLOY_USER}@${DEPLOY_HOST}:${dst}"
expect {
    "password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "Password:" {
        send "${DEPLOY_PASSWORD}\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF
}

# 测试连接
test_connection() {
    echo -e "${YELLOW}测试服务器连接...${NC}"
    
    if [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$DEPLOY_PASSWORD" ssh -o StrictHostKeyChecking=no "${DEPLOY_USER}@${DEPLOY_HOST}" "echo '连接成功'" || {
            echo -e "${RED}错误: 服务器连接失败${NC}"
            exit 1
        }
    else
        ssh_with_password "echo '连接成功'" || {
            echo -e "${RED}错误: 服务器连接失败${NC}"
            exit 1
        }
    fi
    
    echo -e "${GREEN}✓ 服务器连接成功${NC}"
}

# 主函数 - 调用原始部署脚本
main() {
    echo -e "${GREEN}使用快速部署模式...${NC}"
    echo ""
    
    # 如果 sshpass 可用，直接使用原始脚本
    if command -v sshpass &> /dev/null; then
        echo -e "${GREEN}检测到 sshpass，使用标准部署脚本${NC}"
        exec "${SCRIPT_DIR}/deploy.sh"
    fi
    
    # 否则使用 expect
    test_connection
    echo -e "${GREEN}连接测试成功！${NC}"
    echo ""
    echo -e "${YELLOW}注意: 完整部署功能请安装 sshpass 后使用 deploy.sh${NC}"
    echo ""
    echo "安装 sshpass:"
    echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo "  brew install hudochenkov/sshpass/sshpass"
}

main "$@"

