#!/usr/bin/expect -f
# 步骤 1: 安装 Node.js

set timeout 600

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"

puts "\n========================================"
puts "  步骤 1: 安装 Node.js"
puts "========================================\n"

spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST

expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
    }
    timeout {
        puts "错误: 连接超时"
        exit 1
    }
}

expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查是否已安装
send "which node >/dev/null 2>&1 && node --version || echo 'NOT_INSTALLED'\r"
expect {
    -re "v.*" {
        puts "✅ Node.js 已安装"
        send "npm --version\r"
        expect {
            "# " {}
            "$ " {}
            timeout {}
        }
        send "exit\r"
        expect eof
        exit 0
    }
    "NOT_INSTALLED" {
        puts "⚠️  Node.js 未安装，开始安装..."
    }
    timeout {
        puts "⚠️  无法检测 Node.js，尝试安装..."
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "\n开始安装 Node.js（这可能需要几分钟）..."

# 安装 NodeSource 仓库
send "curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -\r"
expect {
    "# " {}
    "$ " {}
    timeout 300
}

# 安装 Node.js
send "dnf install -y nodejs\r"
expect {
    "# " {}
    "$ " {}
    timeout 600
}

# 验证安装
send "node --version && npm --version\r"
expect {
    -re "v.*" {
        puts "✅ Node.js 安装成功"
    }
    timeout {
        puts "⚠️  安装可能已完成，但无法验证版本"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "exit\r"
expect eof

puts "\n✅ Node.js 安装完成！"
puts "下一步: 运行 ./setup-step2-install-deps.sh\n"

