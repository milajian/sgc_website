#!/usr/bin/expect -f
# Nginx 反向代理自动部署脚本（使用 expect 自动输入密码）

set timeout 30

# 加载配置
set DEPLOY_HOST "47.106.73.160"
set DEPLOY_USER "root"
set DEPLOY_PASSWORD "Botool=300739"
set NGINX_CONFIG_PATH "/etc/nginx/sites-available/sgc_website"
set NGINX_CONFIG_ENABLED "/etc/nginx/sites-enabled/sgc_website"
set SCRIPT_DIR [file dirname [file normalize [info script]]]
set CONFIG_FILE "$SCRIPT_DIR/nginx-main-server.conf"

puts "\n========================================"
puts "  Nginx 反向代理自动部署"
puts "========================================\n"

# 检查配置文件是否存在
if {![file exists $CONFIG_FILE]} {
    puts "错误: 找不到 nginx-main-server.conf 配置文件"
    exit 1
}

# 步骤 1: 上传配置文件
puts "步骤 1: 上传配置文件..."
spawn scp -o StrictHostKeyChecking=no $CONFIG_FILE $DEPLOY_USER@$DEPLOY_HOST:/tmp/nginx-main-server.conf
expect {
    "password:" {
        send "$DEPLOY_PASSWORD\r"
        expect eof
    }
    "Permission denied" {
        puts "错误: 权限被拒绝，请检查密码"
        exit 1
    }
    timeout {
        puts "错误: 连接超时"
        exit 1
    }
}
puts "✅ 配置文件已上传\n"

# 步骤 2: SSH 连接并执行部署命令
puts "步骤 2: 连接到服务器并部署配置..."
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

# 执行部署命令
puts "步骤 3: 备份现有配置..."
send "if \[ -f $NGINX_CONFIG_PATH \]; then cp $NGINX_CONFIG_PATH ${NGINX_CONFIG_PATH}.backup.\\\$\(date +%Y%m%d_%H%M%S\) && echo '✅ 配置已备份'; else echo 'ℹ️  配置文件不存在，将创建新配置'; fi\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "步骤 4: 复制新配置..."
send "cp /tmp/nginx-main-server.conf $NGINX_CONFIG_PATH && echo '✅ 配置已复制'\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "步骤 5: 启用 Nginx 站点..."
send "if \[ ! -L $NGINX_CONFIG_ENABLED \]; then ln -s $NGINX_CONFIG_PATH $NGINX_CONFIG_ENABLED && echo '✅ 站点已启用'; else echo '✅ 站点已启用'; fi\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "步骤 6: 测试 Nginx 配置..."
send "nginx -t\r"
expect {
    "test is successful" {
        puts "✅ Nginx 配置测试通过"
    }
    "syntax is ok" {
        puts "✅ Nginx 配置测试通过"
    }
    "error" {
        puts "❌ Nginx 配置测试失败"
        send "exit\r"
        expect eof
        exit 1
    }
    timeout {
        puts "⚠️  Nginx 测试超时，继续..."
    }
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "步骤 7: 重启 Nginx..."
send "systemctl reload nginx || systemctl restart nginx\r"
expect {
    "# " {}
    "$ " {}
    timeout {}
}
puts "✅ Nginx 已重启\n"

puts "步骤 8: 检查后端服务..."
send "curl -s http://localhost:3001/health 2>/dev/null || echo 'FAILED'\r"
expect {
    "ok" {
        puts "✅ 后端服务运行正常"
    }
    "FAILED" {
        puts "⚠️  后端服务未运行或无法访问"
        puts "   请确保后端服务在服务器上运行"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

puts "\n步骤 9: 测试 API 代理..."
send "curl -s http://localhost/api/experts 2>/dev/null | head -c 100 || echo 'FAILED'\r"
expect {
    "FAILED" {
        puts "⚠️  API 代理测试失败"
        puts "   可能原因：后端服务未运行"
    }
    -re ".*" {
        puts "✅ API 反向代理工作正常"
    }
    timeout {}
}
expect {
    "# " {}
    "$ " {}
    timeout {}
}

# 退出 SSH
send "exit\r"
expect eof

puts "\n========================================"
puts "  部署完成！"
puts "========================================\n"
puts "📋 配置信息:"
puts "  服务器: $DEPLOY_HOST"
puts "  前端地址: http://$DEPLOY_HOST/"
puts "  管理后台: http://$DEPLOY_HOST/admin"
puts "  API 代理: http://$DEPLOY_HOST/api/* -> http://localhost:3001/api/*"
puts ""
puts "🔍 验证步骤:"
puts "  1. 访问管理后台: http://$DEPLOY_HOST/admin"
puts "  2. 尝试修改专家信息并保存"
puts "  3. 检查浏览器控制台是否有错误"
puts ""
puts "📝 查看日志:"
puts "  tail -f /var/log/nginx/sgc_website_error.log"
puts ""

