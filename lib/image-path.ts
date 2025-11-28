/**
 * 获取静态资源路径，自动处理 basePath
 * 在 Next.js 中，当设置了 basePath 时，所有静态资源路径都需要包含 basePath
 */
const BASE_PATH = '/sgc_website';

export const getImagePath = (path: string): string => {
  // 如果路径已经包含 basePath，直接返回
  if (path.startsWith(BASE_PATH)) {
    return path;
  }
  
  // 如果是绝对路径，添加 basePath
  if (path.startsWith('/')) {
    return `${BASE_PATH}${path}`;
  }
  
  // 相对路径保持不变
  return path;
};

