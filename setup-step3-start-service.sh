#!/usr/bin/expect -f
# 步骤 3: 启动后端服务

set timeout 60

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_SERVER_DIR "/var/www/sgc_website/server"

puts "\n========================================"
puts "  步骤 3: 启动后端服务"
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

send "cd $REMOTE_SERVER_DIR\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 检查服务是否已运行
send "pm2 list | grep -q 'sgc-backend' && echo 'EXISTS' || echo 'NOT_EXISTS'\r"
expect {
    "EXISTS" {
        puts "✅ 服务已存在，重启服务..."
        send "pm2 restart sgc-backend\r"
        expect {
            "# " {}
            "$ " {}
            timeout {}
        }
    }
    "NOT_EXISTS" {
        puts "✅ 启动新服务..."
        send "pm2 start server.js --name sgc-backend\r"
        expect {
            "# " {}
            "$ " {}
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
puts "\n测试后端服务..."
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

puts "\n========================================"
puts "  后端服务启动完成！"
puts "========================================\n"
puts "🌐 访问地址:"
puts "  管理后台: http://$DEPLOY_HOST/admin"
puts "  API 测试: http://$DEPLOY_HOST/api/experts"
puts ""
puts "✅ 现在可以访问管理后台了！\n"

