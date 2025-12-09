/**
 * 处理图片URL，确保相对路径通过API代理访问
 * 如果已经是完整URL（http/https），直接返回
 * 如果是静态资源路径（/assets/...），直接返回（处理 BASE_PATH）
 * 如果是上传路径（/uploads/...），通过API代理访问（处理 BASE_PATH）
 */
// Next.js 会在构建时替换 process.env.NEXT_PUBLIC_BASE_PATH
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function getImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) {
    return '';
  }
  
  // 如果已经是完整URL（http或https开头），直接返回
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // 确保路径以/开头
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  
  // 如果是静态资源路径（/assets/...），直接返回（需要处理 BASE_PATH）
  if (path.startsWith('/assets/')) {
    return BASE_PATH ? `${BASE_PATH}${path}` : path;
  }
  
  // 如果是上传的图片路径（/uploads/...），通过API代理访问（需要处理 BASE_PATH）
  if (path.startsWith('/uploads/')) {
    const apiPath = `/api${path}`;
    return BASE_PATH ? `${BASE_PATH}${apiPath}` : apiPath;
  }
  
  // 其他路径也通过API代理访问（向后兼容）
  const apiPath = `/api${path}`;
  return BASE_PATH ? `${BASE_PATH}${apiPath}` : apiPath;
}

