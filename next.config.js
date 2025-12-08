/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined, // 仅生产环境静态导出
  // 优先使用 BASE_PATH 环境变量，如果没有则根据部署目标决定
  // 部署到IP地址：BASE_PATH= npm run build
  // 部署到GitHub Pages：NODE_ENV=production npm run build（使用默认 /sgc_website）
  basePath: process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (process.env.NODE_ENV === 'production' ? '/sgc_website' : ''),
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
}

export default nextConfig

