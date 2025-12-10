#!/usr/bin/expect -f
# 检查服务器状态

set timeout 30

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"

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

puts "\n检查 Node.js..."
send "node --version 2>&1\r"
expect {
    -re "v.*" {
        puts "✅ Node.js 已安装"
    }
    timeout {
        puts "❌ Node.js 未安装"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "\n检查后端服务..."
send "cd /var/www/sgc_website/server && pm2 list 2>&1 | head -10\r"
expect {
    -re ".*" {
        puts "PM2 状态:"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "curl -s http://localhost:3001/health 2>&1\r"
expect {
    "ok" {
        puts "✅ 后端服务运行正常"
    }
    timeout {
        puts "❌ 后端服务未运行"
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

send "exit\r"
expect eof

