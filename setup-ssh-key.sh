#!/bin/bash
# SSH 密钥配置脚本
# 用于配置 SSH 密钥认证，避免每次输入密码

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

# 检查 sshpass
if ! command -v sshpass &> /dev/null; then
    echo -e "${RED}错误: 未安装 sshpass${NC}"
    echo "请运行以下命令安装:"
    echo "  macOS: brew install hudochenkov/sshpass/sshpass"
    echo "  Ubuntu/Debian: sudo apt-get install sshpass"
    exit 1
fi

# 生成 SSH 密钥
generate_ssh_key() {
    echo -e "${YELLOW}生成 SSH 密钥...${NC}"
    
    if [ -f "$SSH_KEY_PATH" ]; then
        echo -e "${YELLOW}SSH 密钥已存在: ${SSH_KEY_PATH}${NC}"
        read -p "是否重新生成？(y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return 0
        fi
        rm -f "$SSH_KEY_PATH" "${SSH_KEY_PATH}.pub"
    fi
    
    # 创建 .ssh 目录（如果不存在）
    mkdir -p "$(dirname "$SSH_KEY_PATH")"
    
    # 生成密钥对
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -C "sgc_website_deploy"
    
    echo -e "${GREEN}✓ SSH 密钥生成完成${NC}"
}

# 复制公钥到服务器
copy_public_key() {
    echo -e "${YELLOW}复制公钥到服务器...${NC}"
    
    if [ ! -f "${SSH_KEY_PATH}.pub" ]; then
        echo -e "${RED}错误: 公钥文件不存在${NC}"
        exit 1
    fi
    
    # 读取公钥内容
    local public_key=$(cat "${SSH_KEY_PATH}.pub")
    
    # 将公钥添加到服务器的 authorized_keys
    local cmd="mkdir -p ~/.ssh && \
               chmod 700 ~/.ssh && \
               echo '${public_key}' >> ~/.ssh/authorized_keys && \
               chmod 600 ~/.ssh/authorized_keys && \
               echo '公钥已添加'"
    
    sshpass -p "$DEPLOY_PASSWORD" ssh $SSH_OPTS "${DEPLOY_USER}@${DEPLOY_HOST}" "$cmd"
    
    echo -e "${GREEN}✓ 公钥已复制到服务器${NC}"
}

# 测试 SSH 密钥连接
test_ssh_key() {
    echo -e "${YELLOW}测试 SSH 密钥连接...${NC}"
    
    ssh -i "$SSH_KEY_PATH" $SSH_OPTS "${DEPLOY_USER}@${DEPLOY_HOST}" "echo 'SSH 密钥认证成功'" || {
        echo -e "${RED}错误: SSH 密钥认证失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}✓ SSH 密钥认证成功${NC}"
}

# 更新配置文件
update_config() {
    echo -e "${YELLOW}更新部署配置...${NC}"
    
    # 更新 deploy.config.sh 中的 USE_SSH_KEY
    if [ -f "${SCRIPT_DIR}/deploy.config.sh" ]; then
        # 使用 sed 更新配置（macOS 和 Linux 兼容）
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's/^export USE_SSH_KEY=.*/export USE_SSH_KEY=true/' "${SCRIPT_DIR}/deploy.config.sh"
        else
            # Linux
            sed -i 's/^export USE_SSH_KEY=.*/export USE_SSH_KEY=true/' "${SCRIPT_DIR}/deploy.config.sh"
        fi
        
        echo -e "${GREEN}✓ 配置已更新${NC}"
    fi
}

# 主函数
main() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  SSH 密钥配置${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    
    generate_ssh_key
    copy_public_key
    test_ssh_key
    update_config
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  SSH 密钥配置完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "现在可以使用以下命令测试连接:"
    echo -e "  ssh -i ${SSH_KEY_PATH} ${DEPLOY_USER}@${DEPLOY_HOST}"
    echo ""
    echo -e "部署脚本将自动使用 SSH 密钥认证"
}

main "$@"



