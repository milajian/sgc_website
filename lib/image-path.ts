/**
 * 获取静态资源路径，自动处理 basePath
 * 在 Next.js 中，当设置了 basePath 时，所有静态资源路径都需要包含 basePath
 * 优先使用 BASE_PATH 环境变量，如果没有则根据部署目标决定
 * 开发环境不使用 basePath，生产环境根据 BASE_PATH 环境变量决定
 */
const BASE_PATH = process.env.BASE_PATH !== undefined 
  ? process.env.BASE_PATH 
  : (process.env.NODE_ENV === 'production' ? '/sgc_website' : '');

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

