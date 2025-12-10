#!/bin/bash
# 安装 sshpass 的辅助脚本

echo "📦 安装 sshpass"
echo "================"
echo ""

# 检查是否已安装
if command -v sshpass &> /dev/null; then
    echo "✅ sshpass 已安装"
    sshpass -V
    exit 0
fi

# 检查系统类型
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "检测到 macOS 系统"
    echo ""
    echo "请选择安装方式："
    echo ""
    echo "方式 1: 使用 Homebrew（推荐）"
    echo "  运行: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  然后: brew install hudochenkov/sshpass/sshpass"
    echo ""
    echo "方式 2: 手动编译安装"
    echo "  1. 下载源码: curl -O -L http://sourceforge.net/projects/sshpass/files/sshpass/1.10/sshpass-1.10.tar.gz"
    echo "  2. 解压: tar xvf sshpass-1.10.tar.gz"
    echo "  3. 编译: cd sshpass-1.10 && ./configure && make && sudo make install"
    echo ""
    echo "方式 3: 使用 MacPorts（如果已安装）"
    echo "  sudo port install sshpass"
    echo ""
    echo "安装完成后，运行: ./deploy-nginx-proxy.sh"
    exit 1
else
    echo "检测到 Linux 系统"
    echo ""
    if command -v apt-get &> /dev/null; then
        echo "使用 apt-get 安装..."
        sudo apt-get update
        sudo apt-get install -y sshpass
    elif command -v yum &> /dev/null; then
        echo "使用 yum 安装..."
        sudo yum install -y sshpass
    else
        echo "请手动安装 sshpass"
        exit 1
    fi
fi

