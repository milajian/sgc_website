/**
 * 处理图片URL，确保相对路径通过API代理访问
 * 如果已经是完整URL（http/https），直接返回
 * 如果是相对路径（/uploads/...），通过API代理访问
 */
export function getImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) {
    return '';
  }
  
  // 如果已经是完整URL（http或https开头），直接返回
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // 如果是相对路径，通过API代理访问
  // 确保路径以/开头
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `/api${path}`;
}

