/**
 * 图片预加载工具函数
 * 用于优化图片加载速度，支持单个和批量预加载
 */

// 已预加载的图片缓存，避免重复加载
const preloadedImages = new Set<string>();

/**
 * 预加载单个图片
 * @param src 图片路径
 * @returns Promise，图片加载完成后 resolve
 */
export function preloadImage(src: string): Promise<void> {
  // 如果已经预加载过，直接返回
  if (preloadedImages.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      preloadedImages.add(src);
      resolve();
    };
    
    img.onerror = () => {
      // 即使失败也记录，避免重复尝试
      preloadedImages.add(src);
      reject(new Error(`Failed to preload image: ${src}`));
    };
    
    img.src = src;
  });
}

/**
 * 批量预加载图片，支持并发控制
 * @param srcs 图片路径数组
 * @param options 配置选项
 * @param options.maxConcurrent 最大并发数，默认 3
 * @returns Promise 数组，每个 Promise 对应一张图片的加载结果
 */
export function preloadImages(
  srcs: string[],
  options?: { maxConcurrent?: number }
): Promise<void[]> {
  const maxConcurrent = options?.maxConcurrent ?? 3;
  const queue: string[] = [...srcs];
  let running = 0;

  return new Promise((resolve) => {
    const allResults: Promise<void>[] = [];

    const processNext = () => {
      // 如果队列为空且没有正在运行的请求，等待所有 Promise 完成后 resolve
      if (queue.length === 0 && running === 0) {
        Promise.all(allResults).then(() => {
          resolve([]);
        }).catch(() => {
          resolve([]);
        });
        return;
      }

      // 如果达到最大并发数或队列为空，等待
      if (running >= maxConcurrent || queue.length === 0) {
        return;
      }

      // 从队列中取出一个图片路径
      const src = queue.shift();
      if (!src) return;

      running++;
      
      // 预加载图片
      const promise = preloadImage(src).catch(() => {
        // 单个图片失败不影响其他图片，静默处理错误
      }).finally(() => {
        running--;
        processNext(); // 处理下一个
      });

      allResults.push(promise);
      processNext(); // 继续处理下一个
    };

    // 开始处理
    for (let i = 0; i < Math.min(maxConcurrent, queue.length); i++) {
      processNext();
    }
  });
}

/**
 * 清除预加载缓存（主要用于测试）
 */
export function clearPreloadCache(): void {
  preloadedImages.clear();
}

/**
 * 检查图片是否已预加载
 * @param src 图片路径
 * @returns 是否已预加载
 */
export function isPreloaded(src: string): boolean {
  return preloadedImages.has(src);
}

/**
 * 使用 requestIdleCallback 延迟批量预加载图片
 * 适用于非关键图片，避免影响关键资源加载
 * @param srcs 图片路径数组
 * @param options 配置选项
 * @param options.maxConcurrent 最大并发数，默认 3
 * @param options.timeout requestIdleCallback 超时时间（毫秒），默认 2000
 * @returns 清理函数，用于取消预加载
 */
export function preloadImagesIdle(
  srcs: string[],
  options?: { maxConcurrent?: number; timeout?: number }
): () => void {
  if (typeof window === 'undefined') {
    // 服务端环境，返回空清理函数
    return () => {};
  }

  const maxConcurrent = options?.maxConcurrent ?? 3;
  const timeout = options?.timeout ?? 2000;

  let cancelled = false;
  let idleCallbackId: number | null = null;
  let timeoutId: NodeJS.Timeout | null = null;

  const preloadTask = () => {
    if (cancelled) return;

    // 过滤已预加载的图片
    const pendingSrcs = srcs.filter(src => !preloadedImages.has(src));
    
    if (pendingSrcs.length > 0) {
      preloadImages(pendingSrcs, { maxConcurrent }).catch(() => {
        // 预加载失败不影响正常显示，静默处理
      });
    }
  };

  // 使用 requestIdleCallback 延迟加载
  if ('requestIdleCallback' in window) {
    idleCallbackId = (window as any).requestIdleCallback(preloadTask, { timeout });
  } else {
    // 降级方案：使用 setTimeout
    timeoutId = setTimeout(preloadTask, timeout);
  }

  // 返回清理函数
  return () => {
    cancelled = true;
    if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
      (window as any).cancelIdleCallback(idleCallbackId);
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };
}
