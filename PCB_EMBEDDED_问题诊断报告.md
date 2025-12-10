# PCB埋嵌页面问题诊断报告

## 问题描述

1. **访问 `/pcb-embedded` 时显示技术中心页面**（应该是埋嵌工艺产品页面）
2. **点击"PCB埋嵌"菜单时出现白屏**
3. **JavaScript 错误**：
   - `inpage.js:22 Uncaught SyntaxError: Invalid or unexpected token`（浏览器扩展，可忽略）
   - `index-d9d7cc0b.js:1 Could not find "window.__TAURI_METADATA__"`（浏览器扩展，可忽略）
   - Content Security Policy 阻止 eval 的错误提示

## 诊断结果

### ✅ 服务器端正常
- `pcb-embedded.html` 文件存在且内容正确
- Nginx 配置正确，`try_files $uri.html $uri /index.html;` 应该能正确匹配
- 目录已清理，没有冲突的目录

### ❌ 问题根源

**主要问题：Next.js 客户端路由在静态导出模式下没有正确初始化**

1. **basePath 配置问题**：
   - `next.config.js` 中，当 `NODE_ENV === 'production'` 时，`basePath` 被设置为 `/sgc_website`
   - 但部署到 IP 地址时，应该使用空字符串 `BASE_PATH=`
   - 这导致客户端路由路径不匹配

2. **客户端路由初始化问题**：
   - Next.js 静态导出后，客户端路由需要正确的路由信息才能初始化
   - 如果路由信息不匹配，页面会回退到默认内容（首页）

3. **JavaScript 加载问题**：
   - CSP 错误可能阻止了某些脚本执行
   - 浏览器扩展的错误不影响功能，但可能干扰调试

## 解决方案

### 方案 1：修复 basePath 配置（推荐）

确保构建时使用正确的 `BASE_PATH`：

```bash
# 部署到 IP 地址时，使用空字符串
BASE_PATH= npm run build

# 部署到 GitHub Pages 时，使用 /sgc_website
NODE_ENV=production npm run build
```

### 方案 2：修复 next.config.js

更新 `next.config.js`，确保 IP 地址部署时 basePath 为空：

```javascript
basePath: process.env.BASE_PATH !== undefined 
  ? process.env.BASE_PATH 
  : (process.env.NODE_ENV === 'production' && !process.env.DEPLOY_TO_IP ? '/sgc_website' : ''),
```

### 方案 3：检查构建输出

确保构建后的 HTML 文件包含正确的路由信息。

## 下一步操作

1. **重新构建**：使用 `BASE_PATH= npm run build` 重新构建
2. **重新部署**：将新的构建输出部署到服务器
3. **验证**：访问 `http://47.106.73.160/pcb-embedded` 验证页面是否正确显示

## 关于 JavaScript 错误

- `inpage.js` 和 `__TAURI_METADATA__` 错误来自浏览器扩展（如 MetaMask），可以忽略
- CSP 错误提示是警告，不影响功能（配置中已允许 `unsafe-eval`）

