# 快速解决方案：使用 GitHub 托管图片

## 🎯 方案说明

将 `showimage.png` 上传到 GitHub 仓库，使用 GitHub 的 HTTPS raw 内容 URL。这是最快的解决方案，无需配置 Cloudflare。

## 📝 步骤

### 1. 上传图片到 GitHub

1. 将 `public/assets/showimage.png` 上传到你的 GitHub 仓库
2. 建议路径：`public/assets/showimage.png`（保持相同路径）

### 2. 获取 GitHub Raw URL

GitHub Raw URL 格式：
```
https://raw.githubusercontent.com/用户名/仓库名/分支名/public/assets/showimage.png
```

例如：
```
https://raw.githubusercontent.com/yourusername/sgc_website/main/public/assets/showimage.png
```

### 3. 更新代码

更新 `app/layout.tsx` 中的图片 URL：

```typescript
<meta property="og:image" content="https://raw.githubusercontent.com/yourusername/sgc_website/main/public/assets/showimage.png?v=3" />
<meta name="twitter:image" content="https://raw.githubusercontent.com/yourusername/sgc_website/main/public/assets/showimage.png?v=3" />
```

### 4. 重新构建和部署

```bash
npm run build
./deploy.sh
```

## ✅ 优势

- ✅ 立即生效
- ✅ 免费 HTTPS
- ✅ 无需额外配置
- ✅ GitHub 稳定可靠

## 📚 替代方案

如果不想使用 GitHub，也可以使用：
- Imgur（https://imgur.com）
- Cloudinary（https://cloudinary.com）- 免费套餐
- 其他支持 HTTPS 的图片托管服务

