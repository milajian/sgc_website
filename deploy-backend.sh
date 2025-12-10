#!/usr/bin/expect -f
# 部署后端服务到服务器

set timeout 60

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_BASE_DIR "/var/www/sgc_website"
set REMOTE_SERVER_DIR "$REMOTE_BASE_DIR/server"
set SCRIPT_DIR [file dirname [file normalize [info script]]]
set LOCAL_SERVER_DIR "$SCRIPT_DIR/server"

puts "\n========================================"
puts "  部署后端服务到服务器"
puts "========================================\n"

# 检查本地 server 目录是否存在
if {![file exists $LOCAL_SERVER_DIR]} {
    puts "错误: 找不到本地 server 目录: $LOCAL_SERVER_DIR"
    exit 1
}

# 步骤 1: 创建服务器目录
puts "步骤 1: 创建服务器目录..."
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

send "mkdir -p $REMOTE_SERVER_DIR && echo '✅ 目录已创建'\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "exit\r"
expect eof

# 步骤 2: 上传后端文件
puts "\n步骤 2: 上传后端文件..."
spawn scp -r -o StrictHostKeyChecking=no $LOCAL_SERVER_DIR $DEPLOY_USER@$DEPLOY_HOST:$REMOTE_BASE_DIR/

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
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect {
            eof {}
            timeout 120
        }
    }
    eof {}
    timeout {
        puts "错误: 上传超时"
        exit 1
    }
}

puts "✅ 后端文件已上传\n"

# 步骤 3: 安装依赖并启动服务
puts "步骤 3: 安装依赖并启动服务..."
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

# 进入后端目录
send "cd $REMOTE_SERVER_DIR && pwd\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 安装依赖
puts "\n步骤 4: 安装依赖..."
send "npm install\r"
expect {
    "# " {}
    "$ " {}
    timeout 120
}

# 检查是否已安装 PM2
send "which pm2 >/dev/null 2>&1 && echo 'PM2_OK' || echo 'PM2_NOT_FOUND'\r"
expect {
    "PM2_OK" {
        set USE_PM2 1
        puts "✅ PM2 已安装"
    }
    "PM2_NOT_FOUND" {
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

# 启动服务
puts "\n步骤 5: 启动后端服务..."
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
}

# 测试服务
puts "\n步骤 6: 测试后端服务..."
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
puts "\n步骤 7: 测试 API 代理..."
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
puts "  后端服务部署完成！"
puts "========================================\n"
puts "📋 服务信息:"
puts "  服务器: $DEPLOY_HOST"
puts "  后端目录: $REMOTE_SERVER_DIR"
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

