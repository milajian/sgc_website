/**
 * WebP 图片格式工具函数
 * 用于将图片路径转换为 WebP 版本，提升加载速度
 */
import { getImagePath } from './image-path';
import { getImageUrl } from './image-url';

/**
 * 将图片路径转换为 WebP 版本
 * 如果原路径是 /assets/image.jpg，返回 /assets/image.webp
 * 如果原路径已经是 WebP 或完整 URL，直接返回
 * 
 * @param imagePath 原始图片路径
 * @returns WebP 版本的图片路径
 */
export function getWebpPath(imagePath: string): string {
  if (!imagePath) {
    return '';
  }

  // 如果已经是完整 URL，直接返回（不支持动态转换）
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // 如果已经是 WebP 格式，直接返回
  if (imagePath.toLowerCase().endsWith('.webp')) {
    return imagePath;
  }

  // 替换文件扩展名为 .webp
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png|gif|bmp)$/i, '.webp');
  
  return webpPath;
}

/**
 * 获取 WebP 版本的图片 URL（使用 getImageUrl 处理）
 * 
 * @param imageUrl 原始图片 URL
 * @param useImagePath 是否使用 getImagePath 处理路径（默认 false，使用 getImageUrl）
 * @returns WebP 版本的图片 URL
 */
export function getWebpUrl(imageUrl: string, useImagePath: boolean = false): string {
  if (!imageUrl) {
    return '';
  }

  const webpPath = getWebpPath(imageUrl);
  
  if (useImagePath) {
    return getImagePath(webpPath);
  } else {
    return getImageUrl(webpPath);
  }
}

/**
 * 检查浏览器是否支持 WebP 格式
 * 
 * @returns Promise<boolean> 是否支持 WebP
 */
export function checkWebpSupport(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const webp = new Image();
    webp.onload = webp.onerror = () => {
      resolve(webp.height === 2);
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * 获取图片源集合（WebP + 原始格式），用于 <picture> 元素
 * 
 * @param src 原始图片路径
 * @param useImagePath 是否使用 getImagePath 处理路径（默认 false，使用 getImageUrl）
 * @returns 包含 webpSrc 和 fallbackSrc 的对象
 */
export function getImageSources(
  src: string,
  useImagePath: boolean = false
): { webpSrc: string; fallbackSrc: string } {
  const webpSrc = getWebpUrl(src, useImagePath);
  const fallbackSrc = useImagePath ? getImagePath(src) : getImageUrl(src);
  
  return { webpSrc, fallbackSrc };
}
