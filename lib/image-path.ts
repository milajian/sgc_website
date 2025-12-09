/**
 * 获取静态资源路径，自动处理 basePath
 * 在 Next.js 中，当设置了 basePath 时，所有静态资源路径都需要包含 basePath
 * 使用 NEXT_PUBLIC_BASE_PATH 环境变量，这样客户端代码也能访问
 * Next.js 会在构建时将 process.env.NEXT_PUBLIC_BASE_PATH 替换为实际值
 * 部署到IP地址：BASE_PATH= NEXT_PUBLIC_BASE_PATH= npm run build
 * 部署到GitHub Pages：NODE_ENV=production npm run build（使用默认 /sgc_website）
 */
// Next.js 会在构建时替换 process.env.NEXT_PUBLIC_BASE_PATH
// 如果未设置，构建时会替换为 undefined，我们使用空字符串作为默认值
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const getImagePath = (path: string): string => {
  // 如果路径已经包含 basePath，直接返回
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    return path;
  }
  
  // 如果是绝对路径，根据环境添加 basePath
  if (path.startsWith('/')) {
    return BASE_PATH ? `${BASE_PATH}${path}` : path;
  }
  
  // 相对路径保持不变
  return path;
};

