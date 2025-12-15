'use client'

import { useState, useEffect, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { getImageUrl } from "@/lib/image-url";
import { preloadImage } from "@/lib/image-preload";

/**
 * 优化图片组件的 Props 接口
 */
export interface OptimizedImageProps {
  /** 图片路径 */
  src: string;
  /** 替代文本 */
  alt: string;
  /** 是否高优先级加载（首屏图片） */
  priority?: boolean;
  /** 图片宽度（用于避免布局偏移） */
  width?: number;
  /** 图片高度（用于避免布局偏移） */
  height?: number;
  /** 自定义样式类名 */
  className?: string;
  /** 图片适应方式 */
  objectFit?: 'contain' | 'cover';
  /** 是否使用 getImagePath 处理路径（默认 false，使用 getImageUrl） */
  useImagePath?: boolean;
  /** 是否显示加载状态指示器（默认 true） */
  showLoadingIndicator?: boolean;
  /** 自定义错误占位符 */
  errorPlaceholder?: React.ReactNode;
  /** 预加载距离（px），图片距离视口多少像素时开始预加载，默认 200px */
  preloadDistance?: number;
}

/**
 * 优化图片组件
 * 
 * 功能特性：
 * - 错误处理和占位符显示
 * - 加载状态指示器
 * - 优先级控制（priority prop）
 * - 自动设置 fetchPriority、loading、decoding 属性
 * - 支持 width/height 避免布局偏移
 * - 支持 objectFit（contain/cover）
 * - 兼容 getImagePath 和 getImageUrl 工具函数
 * 
 * @example
 * ```tsx
 * <OptimizedImage 
 *   src="/assets/hero.png" 
 *   alt="Hero image"
 *   priority={true}
 *   width={1200}
 *   height={600}
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  width,
  height,
  className = "",
  objectFit = 'contain',
  useImagePath = false,
  showLoadingIndicator = true,
  errorPlaceholder,
  preloadDistance = 200,
}: OptimizedImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理图片路径
  const imageSrc = useImagePath ? getImagePath(src) : getImageUrl(src);

  useEffect(() => {
    // 检查图片是否已经加载完成（比如从缓存中加载）
    if (imgRef.current?.complete) {
      setImgLoading(false);
    }
  }, [imageSrc]);

  // Intersection Observer 预加载逻辑
  useEffect(() => {
    // 如果 priority 为 true，直接加载，不需要 observer
    if (priority) {
      return;
    }

    // 如果图片已经加载或出错，不需要 observer
    if (imgRef.current?.complete || imgError) {
      return;
    }

    // 检查浏览器是否支持 Intersection Observer
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 图片进入预加载区域，提前预加载到缓存
            preloadImage(imageSrc).catch(() => {
              // 预加载失败不影响正常显示，静默处理
            });
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: `${preloadDistance}px`,
        threshold: 0.01,
      }
    );

    // 观察容器元素（如果存在）或图片元素本身
    const targetElement = containerRef.current || imgRef.current;
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [imageSrc, priority, preloadDistance, imgError]);

  // 构建样式类名
  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';
  const finalClassName = className || `w-full h-full ${objectFitClass}`;

  return (
    <div ref={containerRef} className="relative">
      {!imgError ? (
        <img 
          ref={imgRef}
          src={imageSrc} 
          alt={alt} 
          className={finalClassName}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onError={() => {
            setImgError(true);
            setImgLoading(false);
          }}
          onLoad={() => setImgLoading(false)}
        />
      ) : (
        errorPlaceholder || (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-xs text-center px-2">{alt}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">图片未找到</p>
          </div>
        )
      )}
      {showLoadingIndicator && imgLoading && !imgError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 pointer-events-none">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
