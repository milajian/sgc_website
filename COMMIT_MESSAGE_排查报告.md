# Commit Message 生成功能排查报告

## 问题诊断

### 发现的问题

1. **大量构建文件被暂存**
   - 有 **1090 个文件**被暂存，其中大部分是 `.next/` 和 `out/` 目录下的构建文件
   - 这些文件不应该被 Git 跟踪（已在 `.gitignore` 中）

2. **文件状态**
   - 源代码文件：约 30-40 个实际代码文件
   - 构建文件：1000+ 个 `.next/` 和 `out/` 目录下的文件

### 为什么 Generate Commit Message 不工作？

Cursor 的 AI 生成 commit message 功能可能因为以下原因失败：

1. **暂存文件过多**：1090 个文件对于 AI 来说太多了，可能导致：
   - API 请求超时
   - Token 限制
   - 处理时间过长

2. **文件类型问题**：大部分是构建产物（`.next/` 目录），AI 难以理解这些变更的意义

3. **网络或 API 问题**：Cursor 的 AI 功能需要调用外部 API，可能存在：
   - 网络连接问题
   - API 配额限制
   - 服务暂时不可用

## 解决方案

### 方案 1：清理构建文件（推荐）

只提交源代码文件，移除构建文件：

```bash
# 1. 取消暂存所有文件
git reset HEAD

# 2. 只暂存源代码文件
git add app/ components/ lib/ server/ deploy.sh

# 3. 从 Git 中移除不应该跟踪的文件
git rm -r --cached .next/ out/ 2>/dev/null || true

# 4. 现在再尝试生成 commit message
```

### 方案 2：分批提交

如果必须提交这些文件，可以分批提交：

```bash
# 先提交源代码文件
git reset HEAD
git add app/ components/ lib/ server/
git commit -m "feat: 更新源代码文件"

# 再处理构建文件（如果需要）
git add .next/ out/
git commit -m "chore: 更新构建产物"
```

### 方案 3：手动编写 Commit Message

基于当前的更改，建议的 commit message：

```
feat: 重构网站结构和组件

主要变更：
- 更新多个页面组件（expert-list, research-structure 等）
- 添加图片上传 API 路由
- 重构 Header 和 CompanyInfo 组件
- 更新全局样式
- 添加新的工具函数（image-url.ts, scroll.ts）
- 删除部分废弃页面
- 添加大量新的图片资源

技术改进：
- 优化组件结构
- 改进图片处理逻辑
- 更新部署脚本
```

## 预防措施

### 1. 确保 `.gitignore` 正确配置

`.gitignore` 文件已经包含了：
```
.next/
out/
dist/
build/
```

### 2. 如果文件已经被跟踪，需要从 Git 中移除

```bash
# 从 Git 中移除但保留本地文件
git rm -r --cached .next/
git rm -r --cached out/

# 提交这个更改
git commit -m "chore: 移除构建文件 from Git tracking"
```

### 3. 检查 Git 状态

定期运行 `git status` 确保没有意外添加构建文件。

## 当前状态

- ✅ `.gitignore` 配置正确
- ⚠️ `.next/` 和 `out/` 目录之前被错误跟踪
- ⚠️ 暂存区有 1090 个文件（大部分是构建文件）
- ✅ 源代码文件更改正常（约 30-40 个文件）

## 下一步操作

1. **立即执行**：清理构建文件，只提交源代码
2. **测试**：清理后尝试使用 Cursor 的 "Generate Commit Message" 功能
3. **如果仍然不行**：检查 Cursor 设置和网络连接


