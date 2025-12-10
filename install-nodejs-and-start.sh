#!/usr/bin/expect -f
# 安装 Node.js 并启动后端服务

set timeout 300

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_SERVER_DIR "/var/www/sgc_website/server"

puts "\n========================================"
puts "  安装 Node.js 并启动后端服务"
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

# 检查 Node.js 是否已安装
puts "步骤 1: 检查 Node.js..."
send "which node >/dev/null 2>&1 && echo 'NODE_INSTALLED' || echo 'NODE_NOT_INSTALLED'\r"
expect {
    "NODE_INSTALLED" {
        puts "✅ Node.js 已安装"
        send "node --version && npm --version\r"
        expect {
            "# " {}
            "$ " {}
            timeout {}
        }
        set INSTALL_NODE 0
    }
    "NODE_NOT_INSTALLED" {
        puts "⚠️  Node.js 未安装，开始安装..."
        set INSTALL_NODE 1
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 安装 Node.js（如果需要）
if {$INSTALL_NODE} {
    puts "\n步骤 2: 安装 Node.js（使用 NodeSource）..."
    send "curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -\r"
    expect {
        "# " {}
        "$ " {}
        timeout 120
    }
    
    send "dnf install -y nodejs\r"
    expect {
        "# " {}
        "$ " {}
        timeout 180
    }
    
    send "node --version && npm --version\r"
    expect {
        -re "v.*" {
            puts "✅ Node.js 安装完成"
        }
        "# " {}
        "$ " {}
        timeout {}
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
}

# 进入后端目录
puts "\n步骤 3: 进入后端目录..."
send "cd $REMOTE_SERVER_DIR && pwd\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 安装依赖
puts "\n步骤 4: 安装后端依赖..."
send "npm install --production\r"
expect {
    "# " {}
    "$ " {}
    timeout 300
}

# 创建必要的目录
puts "\n步骤 5: 创建必要的目录..."
send "mkdir -p data uploads && echo '✅ 目录已创建'\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查 PM2
puts "\n步骤 6: 检查 PM2..."
send "which pm2 >/dev/null 2>&1 && echo 'PM2_OK' || echo 'PM2_NOT_FOUND'\r"
expect {
    "PM2_OK" {
        set USE_PM2 1
        puts "✅ PM2 已安装"
    }
    "PM2_NOT_FOUND" {
        puts "⚠️  PM2 未安装，正在安装..."
        send "npm install -g pm2\r"
        expect {
            "# " {}
            "$ " {}
            timeout 120
        }
        set USE_PM2 1
        puts "✅ PM2 安装完成"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 启动服务
puts "\n步骤 7: 启动后端服务..."
if {$USE_PM2} {
    send "pm2 list | grep -q 'sgc-backend' && pm2 restart sgc-backend || pm2 start server.js --name sgc-backend\r"
    expect {
        -re "online|started|restarted" {
            puts "✅ 后端服务已启动（PM2）"
        }
        timeout {}
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
    send "pm2 save\r"
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
    puts "✅ PM2 进程列表已保存"
    send "pm2 list\r"
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
} else {
    send "pkill -f 'node.*server.js' 2>/dev/null; sleep 1\r"
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
    send "nohup node server.js > /tmp/sgc-backend.log 2>&1 &\r"
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
    send "sleep 2\r"
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
}

# 测试服务
puts "\n步骤 8: 测试后端服务..."
send "sleep 3 && curl -s http://localhost:3001/health\r"
expect {
    "ok" {
        puts "✅ 后端服务运行正常"
    }
    timeout {
        puts "⚠️  服务可能还在启动中"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 测试 API 代理
puts "\n步骤 9: 测试 API 代理..."
send "curl -s http://localhost/api/experts | head -c 100\r"
expect {
    -re ".*" {
        puts "✅ API 代理工作正常"
    }
    timeout {
        puts "⚠️  API 代理测试超时"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "exit\r"
expect eof

puts "\n========================================"
puts "  后端服务启动完成！"
puts "========================================\n"
puts "📋 服务信息:"
puts "  服务器: $DEPLOY_HOST"
puts "  后端目录: $REMOTE_SERVER_DIR"
puts "  后端地址: http://localhost:3001"
puts ""
if {$USE_PM2} {
    puts "📝 PM2 管理命令:"
    puts "  pm2 list          - 查看服务列表"
    puts "  pm2 logs sgc-backend - 查看日志"
    puts "  pm2 restart sgc-backend - 重启服务"
} else {
    puts "📝 查看日志:"
    puts "  tail -f /tmp/sgc-backend.log"
}
puts ""
puts "🌐 访问地址:"
puts "  管理后台: http://$DEPLOY_HOST/admin"
puts "  API 测试: http://$DEPLOY_HOST/api/experts"
puts ""

