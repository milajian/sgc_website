#!/usr/bin/expect -f
# 步骤 2: 安装依赖和 PM2

set timeout 600

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_SERVER_DIR "/var/www/sgc_website/server"

puts "\n========================================"
puts "  步骤 2: 安装依赖和 PM2"
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

# 进入后端目录
send "cd $REMOTE_SERVER_DIR && pwd\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 安装依赖
puts "\n安装后端依赖（这可能需要几分钟）..."
send "npm install --production\r"
expect {
    "# " {}
    "$ " {}
    timeout 600
}

# 创建目录
send "mkdir -p data uploads && echo '✅ 目录已创建'\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 安装 PM2
puts "\n安装 PM2..."
send "npm install -g pm2\r"
expect {
    "# " {}
    "$ " {}
    timeout 300
}

puts "✅ PM2 安装完成"

send "exit\r"
expect eof

puts "\n✅ 依赖安装完成！"
puts "下一步: 运行 ./setup-step3-start-service.sh\n"

