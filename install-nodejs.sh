#!/usr/bin/expect -f
# 安装 Node.js

set timeout 600

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"

puts "\n========================================"
puts "  安装 Node.js"
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
send "command -v node >/dev/null 2>&1 && node --version || echo 'NODE_NOT_FOUND'\r"
expect {
    -re {v[0-9]} {
        set node_version $expect_out(0,string)
        puts "✅ Node.js 已安装: $node_version"
        send "npm --version\r"
        expect {
            -re {[0-9]} {
                puts "✅ npm 已安装"
            }
            timeout {}
        }
        expect {
            "# " {}
            "$ " {}
            timeout {}
        }
        send "exit\r"
        expect eof
        exit 0
    }
    "NODE_NOT_FOUND" {
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
send "node --version\r"
expect {
    -re "v.*" {
        puts "✅ Node.js 安装成功"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "npm --version\r"
expect {
    -re ".*" {
        puts "✅ npm 安装成功"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "exit\r"
expect eof

puts "\n✅ Node.js 安装完成！\n"

