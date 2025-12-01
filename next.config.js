/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined, // 仅生产环境静态导出
  basePath: process.env.NODE_ENV === 'production' ? '/sgc_website' : '', // 仅生产环境使用 basePath
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
}

export default nextConfig

