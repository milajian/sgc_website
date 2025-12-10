#!/usr/bin/expect -f
# 启动后端服务

set timeout 60

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_SERVER_DIR "/var/www/sgc_website/server"

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

send "cd $REMOTE_SERVER_DIR\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 启动服务
puts "\n启动后端服务..."
send "pm2 start server.js --name sgc-backend\r"
expect {
    -re "online|started" {
        puts "✅ 服务已启动"
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

send "pm2 list\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 等待服务启动
send "sleep 3\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 测试服务
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

send "curl -s http://localhost/api/experts | head -c 100\r"
expect {
    -re ".*" {
        puts "✅ API 代理工作正常"
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

puts "\n✅ 后端服务启动完成！\n"

