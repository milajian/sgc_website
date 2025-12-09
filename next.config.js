/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined, // 仅生产环境静态导出
  // 优先使用 BASE_PATH 环境变量，如果没有则根据部署目标决定
  // 部署到IP地址：BASE_PATH= npm run build
  // 部署到GitHub Pages：NODE_ENV=production npm run build（使用默认 /sgc_website）
  basePath: process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (process.env.NODE_ENV === 'production' ? '/sgc_website' : ''),
  // 禁用自动尾部斜杠，避免路径不一致导致的403错误
  trailingSlash: false,
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  // 将 basePath 也设置为 NEXT_PUBLIC_BASE_PATH，以便客户端代码访问
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : (process.env.NODE_ENV === 'production' ? '/sgc_website' : ''),
  },
}

export default nextConfig

