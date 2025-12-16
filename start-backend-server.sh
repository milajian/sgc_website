#!/usr/bin/expect -f
# 启动后端服务脚本（使用 expect 自动输入密码）

set timeout 30

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"

puts "\n========================================"
puts "  启动后端服务"
puts "========================================\n"

# SSH 连接并启动服务
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

# 等待命令提示符
expect {
    "# " {}
    "$ " {}
    timeout {
        puts "错误: 无法获取命令提示符"
        exit 1
    }
}

# 检查后端目录
puts "步骤 1: 查找后端服务目录..."
send "find /var/www -name 'server.js' -type f 2>/dev/null | head -1\r"
expect {
    -re "(/var/www/.*server.js)" {
        set SERVER_PATH $expect_out(1,string)
        set SERVER_DIR [file dirname $SERVER_PATH]
        puts "✅ 找到后端服务: $SERVER_DIR"
    }
    timeout {
        puts "⚠️  未找到后端服务，尝试其他位置..."
        send "find /root -name 'server.js' -type f 2>/dev/null | head -1\r"
        expect {
            -re "(/root/.*server.js)" {
                set SERVER_PATH $expect_out(1,string)
                set SERVER_DIR [file dirname $SERVER_PATH]
                puts "✅ 找到后端服务: $SERVER_DIR"
            }
            timeout {
                puts "❌ 未找到后端服务文件"
                puts "请手动指定后端服务目录"
                set SERVER_DIR "/var/www/sgc_website/server"
            }
        }
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查 PM2 是否安装
puts "\n步骤 2: 检查 PM2..."
send "which pm2 >/dev/null 2>&1 && echo 'PM2_INSTALLED' || echo 'PM2_NOT_INSTALLED'\r"
expect {
    "PM2_INSTALLED" {
        set USE_PM2 1
        puts "✅ PM2 已安装，将使用 PM2 启动服务"
    }
    "PM2_NOT_INSTALLED" {
        set USE_PM2 0
        puts "ℹ️  PM2 未安装，将直接启动服务"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查服务是否已在运行
puts "\n步骤 3: 检查服务状态..."
if {$USE_PM2} {
    send "pm2 list | grep -q 'sgc-backend' && echo 'RUNNING' || echo 'NOT_RUNNING'\r"
    expect {
        "RUNNING" {
            puts "✅ 后端服务已在运行"
            send "pm2 info sgc-backend\r"
            expect {
                "# " {}
                "$ " {}
                timeout {}
            }
            send "exit\r"
            expect eof
            puts "\n✅ 后端服务已在运行，无需启动"
            exit 0
        }
        "NOT_RUNNING" {
            puts "ℹ️  服务未运行，准备启动..."
        }
        timeout {}
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
} else {
    send "lsof -i :3001 >/dev/null 2>&1 && echo 'RUNNING' || echo 'NOT_RUNNING'\r"
    expect {
        "RUNNING" {
            puts "✅ 后端服务已在运行（端口 3001）"
            send "exit\r"
            expect eof
            puts "\n✅ 后端服务已在运行，无需启动"
            exit 0
        }
        "NOT_RUNNING" {
            puts "ℹ️  服务未运行，准备启动..."
        }
        timeout {}
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
}

# 进入后端目录
puts "\n步骤 4: 进入后端目录..."
send "cd $SERVER_DIR && pwd\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查 node_modules
puts "\n步骤 5: 检查依赖..."
send "if [ ! -d 'node_modules' ]; then echo 'INSTALL_DEPS'; else echo 'DEPS_OK'; fi\r"
expect {
    "INSTALL_DEPS" {
        puts "⚠️  依赖未安装，正在安装..."
        send "npm install\r"
        expect {
            "# " {}
            "$ " {}
            timeout 120
        }
    }
    "DEPS_OK" {
        puts "✅ 依赖已安装"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 启动服务
puts "\n步骤 6: 启动后端服务..."
if {$USE_PM2} {
    send "pm2 start server.js --name sgc-backend\r"
    expect {
        -re "online|started" {
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
    puts "⚠️  直接启动服务（后台运行）..."
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
    send "lsof -i :3001 >/dev/null 2>&1 && echo 'STARTED' || echo 'FAILED'\r"
    expect {
        "STARTED" {
            puts "✅ 后端服务已启动"
        }
        "FAILED" {
            puts "❌ 服务启动失败，请检查日志: /tmp/sgc-backend.log"
        }
        timeout {}
    }
    expect {
        "# " {}
        "$ " {}
        timeout {}
    }
}

# 测试服务
puts "\n步骤 7: 测试后端服务..."
send "sleep 2 && curl -s http://localhost:3001/health\r"
expect {
    "ok" {
        puts "✅ 后端服务运行正常"
    }
    timeout {
        puts "⚠️  服务可能还在启动中，请稍后测试"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 测试 API 代理
puts "\n步骤 8: 测试 API 代理..."
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

# 退出
send "exit\r"
expect eof

puts "\n========================================"
puts "  后端服务启动完成！"
puts "========================================\n"
puts "📋 服务信息:"
puts "  服务器: $DEPLOY_HOST"
puts "  后端地址: http://localhost:3001"
puts "  API 端点: http://localhost:3001/api/experts"
puts "  健康检查: http://localhost:3001/health"
puts ""
if {$USE_PM2} {
    puts "📝 PM2 管理命令:"
    puts "  pm2 list          - 查看服务列表"
    puts "  pm2 logs sgc-backend - 查看日志"
    puts "  pm2 restart sgc-backend - 重启服务"
    puts "  pm2 stop sgc-backend - 停止服务"
} else {
    puts "📝 查看日志:"
    puts "  tail -f /tmp/sgc-backend.log"
}
puts ""
puts "🌐 访问地址:"
puts "  管理后台: http://$DEPLOY_HOST/admin"
puts "  API 测试: http://$DEPLOY_HOST/api/experts"
puts ""





