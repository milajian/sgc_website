/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，兼容 GitHub Pages
  basePath: '/sgc_website', // GitHub Pages 路径
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
}

export default nextConfig

