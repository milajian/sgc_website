#!/usr/bin/expect -f
# Docker 部署脚本（使用 expect 处理密码）

set timeout 300

# 加载配置
source [file dirname $argv0]/deploy.config.sh

set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set REMOTE_DIR "/var/www/sgc_website/docker"

puts "🚀 开始 Docker 部署到生产服务器..."
puts "服务器: $DEPLOY_USER@$DEPLOY_HOST"

# 创建临时目录
set TEMP_DIR [exec mktemp -d]
puts "📦 准备部署文件到临时目录: $TEMP_DIR"

# 复制文件到临时目录
exec cp Dockerfile $TEMP_DIR/
exec cp Dockerfile.backend $TEMP_DIR/
exec cp docker-compose.yml $TEMP_DIR/
exec cp nginx.conf $TEMP_DIR/
exec cp .dockerignore $TEMP_DIR/
exec cp package*.json $TEMP_DIR/
exec cp -r server $TEMP_DIR/
exec cp -r app $TEMP_DIR/
exec cp -r components $TEMP_DIR/
exec cp -r lib $TEMP_DIR/
exec cp -r public $TEMP_DIR/
exec cp -r hooks $TEMP_DIR/ 2>/dev/null
exec cp -r scripts $TEMP_DIR/ 2>/dev/null
exec cp next.config.js $TEMP_DIR/
exec cp tsconfig.json $TEMP_DIR/
exec cp tailwind.config.ts $TEMP_DIR/
exec cp postcss.config.js $TEMP_DIR/ 2>/dev/null
exec cp components.json $TEMP_DIR/ 2>/dev/null
exec cp eslint.config.js $TEMP_DIR/ 2>/dev/null
exec cp clean-build-output.sh $TEMP_DIR/
exec chmod +x $TEMP_DIR/clean-build-output.sh

# 创建远程目录
spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $REMOTE_DIR"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    "yes/no" {
        send "yes\r"
        expect "password:"
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    eof
}

# 上传文件
puts "⬆️  上传文件到服务器..."
spawn tar czf - -C $TEMP_DIR .
set tar_pid $spawn_id

spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $REMOTE_DIR && tar xzf -"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        interact -u $tar_pid
    }
    "yes/no" {
        send "yes\r"
        expect "password:"
        send "$DEPLOY_PASSWORD\r"
        interact -u $tar_pid
    }
    eof
}

# 检查并安装 Docker
puts "🐳 检查 Docker..."
spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "command -v docker"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    eof
}

if {[string length $expect_out(buffer)] < 5} {
    puts "📥 安装 Docker..."
    spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && systemctl start docker && systemctl enable docker && rm get-docker.sh"
    expect {
        "password:" {
            send "$DEPLOY_PASSWORD\r"
            expect eof
        }
        eof
    }
}

# 停止旧服务
puts "🛑 停止旧服务..."
spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $REMOTE_DIR && docker compose down 2>/dev/null || true"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    eof
}

# 构建并启动
puts "🔨 构建并启动服务..."
spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $REMOTE_DIR && docker compose up -d --build"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    eof
}

# 等待并检查状态
puts "⏳ 等待服务启动..."
exec sleep 5

spawn ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "cd $REMOTE_DIR && docker compose ps && echo '' && docker compose logs --tail=20"
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    eof
}

# 清理临时目录
exec rm -rf $TEMP_DIR

puts ""
puts "✅ 部署完成！"
puts "🌐 前端访问: http://$DEPLOY_HOST"
puts "🔧 后端 API: http://$DEPLOY_HOST:3001"
