'use client'

import { useState, useEffect, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { getImageUrl } from "@/lib/image-url";

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
}: OptimizedImageProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // 处理图片路径
  const imageSrc = useImagePath ? getImagePath(src) : getImageUrl(src);

  useEffect(() => {
    // 检查图片是否已经加载完成（比如从缓存中加载）
    if (imgRef.current?.complete) {
      setImgLoading(false);
    }
  }, [imageSrc]);

  // 构建样式类名
  const objectFitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';
  const finalClassName = className || `w-full h-full ${objectFitClass}`;

  return (
    <>
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
    </>
  );
}
