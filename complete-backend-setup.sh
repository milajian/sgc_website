#!/usr/bin/expect -f
# 完整后端服务设置脚本：安装 Node.js、依赖并启动服务

set timeout 300

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_SERVER_DIR "/var/www/sgc_website/server"

puts "\n========================================"
puts "  完整后端服务设置"
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

# 步骤 1: 检查并安装 Node.js
puts "步骤 1: 检查 Node.js..."
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
        set INSTALL_NODE 0
    }
    "NOT_INSTALLED" {
        set INSTALL_NODE 1
    }
    timeout {
        set INSTALL_NODE 1
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

if {$INSTALL_NODE} {
    puts "\n步骤 2: 安装 Node.js（这可能需要几分钟）..."
    send "curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -\r"
    expect {
        "# " {}
        "$ " {}
        timeout 180
    }
    
    send "dnf install -y nodejs\r"
    expect {
        "# " {}
        "$ " {}
        timeout 300
    }
    
    send "node --version\r"
    expect {
        -re "v.*" {
            puts "✅ Node.js 安装成功"
        }
        timeout {
            puts "⚠️  无法验证 Node.js 版本"
        }
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
}

# 步骤 3: 进入后端目录
puts "\n步骤 3: 进入后端目录..."
send "cd $REMOTE_SERVER_DIR && pwd\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 步骤 4: 安装依赖
puts "\n步骤 4: 安装后端依赖（这可能需要几分钟）..."
send "npm install --production\r"
expect {
    "# " {}
    "$ " {}
    timeout 300
}

# 步骤 5: 创建必要目录
puts "\n步骤 5: 创建必要目录..."
send "mkdir -p data uploads && ls -la data uploads | head -5\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 步骤 6: 安装 PM2
puts "\n步骤 6: 安装 PM2..."
send "which pm2 >/dev/null 2>&1 && echo 'PM2_INSTALLED' || echo 'PM2_NOT_INSTALLED'\r"
expect {
    "PM2_INSTALLED" {
        puts "✅ PM2 已安装"
        set INSTALL_PM2 0
    }
    "PM2_NOT_INSTALLED" {
        set INSTALL_PM2 1
    }
    timeout {
        set INSTALL_PM2 1
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

if {$INSTALL_PM2} {
    send "npm install -g pm2\r"
    expect {
        "# " {}
        "$ " {}
        timeout 180
    }
    puts "✅ PM2 安装完成"
}

# 步骤 7: 启动服务
puts "\n步骤 7: 启动后端服务..."
send "pm2 list | grep -q 'sgc-backend' && echo 'EXISTS' || echo 'NOT_EXISTS'\r"
expect {
    "EXISTS" {
        puts "✅ 服务已存在，重启服务..."
        send "pm2 restart sgc-backend\r"
        expect {
            -re "restarted|online" {
                puts "✅ 服务已重启"
            }
            timeout {}
        }
    }
    "NOT_EXISTS" {
        puts "✅ 启动新服务..."
        send "pm2 start server.js --name sgc-backend\r"
        expect {
            -re "online|started" {
                puts "✅ 服务已启动"
            }
            timeout {}
        }
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

# 步骤 8: 等待服务启动
puts "\n步骤 8: 等待服务启动..."
send "sleep 3\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 步骤 9: 测试后端服务
puts "\n步骤 9: 测试后端服务..."
send "curl -s http://localhost:3001/health\r"
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

# 步骤 10: 测试 API 代理
puts "\n步骤 10: 测试 API 代理..."
send "curl -s http://localhost/api/experts | head -c 200\r"
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
puts "  后端服务设置完成！"
puts "========================================\n"
puts "📋 服务信息:"
puts "  服务器: $DEPLOY_HOST"
puts "  后端目录: $REMOTE_SERVER_DIR"
puts "  后端地址: http://localhost:3001"
puts "  API 端点: http://localhost:3001/api/experts"
puts ""
puts "📝 PM2 管理命令:"
puts "  pm2 list          - 查看服务列表"
puts "  pm2 logs sgc-backend - 查看日志"
puts "  pm2 restart sgc-backend - 重启服务"
puts "  pm2 stop sgc-backend - 停止服务"
puts ""
puts "🌐 访问地址:"
puts "  管理后台: http://$DEPLOY_HOST/admin"
puts "  API 测试: http://$DEPLOY_HOST/api/experts"
puts ""
puts "✅ 现在可以访问管理后台了！"
puts ""





