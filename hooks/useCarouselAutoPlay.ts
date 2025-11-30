import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseCarouselAutoPlayOptions {
  /** 自动播放间隔（毫秒），默认 4200ms */
  autoPlayInterval?: number;
  /** 暂停后自动恢复播放的延迟（毫秒），默认 5000ms，设为 0 则不自动恢复 */
  restoreDelay?: number;
}

interface UseCarouselAutoPlayReturn {
  api: CarouselApi | undefined;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>;
  current: number;
  isAutoPlay: boolean;
  setIsAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  /** 暂停自动播放并滚动到上一张 */
  scrollPrev: () => void;
  /** 暂停自动播放并滚动到下一张 */
  scrollNext: () => void;
  /** 暂停自动播放并滚动到指定索引 */
  scrollTo: (index: number) => void;
}

/**
 * 轮播自动播放 Hook
 * 
 * @param options - 配置选项
 * @returns 轮播控制相关的状态和方法
 * 
 * @example
 * ```tsx
 * const { api, setApi, current, isAutoPlay, scrollPrev, scrollNext, scrollTo } = useCarouselAutoPlay();
 * 
 * return (
 *   <Carousel setApi={setApi}>
 *     ...
 *   </Carousel>
 * );
 * ```
 */
export function useCarouselAutoPlay(
  options: UseCarouselAutoPlayOptions = {}
): UseCarouselAutoPlayReturn {
  const { autoPlayInterval = 4200, restoreDelay = 5000 } = options;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 监听幻灯片选择变化
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // 自动播放
  useEffect(() => {
    if (!api || !isAutoPlay) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, isAutoPlay, autoPlayInterval]);

  // 自动恢复播放
  useEffect(() => {
    if (isAutoPlay || restoreDelay === 0) return;

    const restoreTimer = setTimeout(() => {
      setIsAutoPlay(true);
    }, restoreDelay);

    return () => clearTimeout(restoreTimer);
  }, [isAutoPlay, restoreDelay]);

  // 封装滚动方法，自动暂停自动播放
  const scrollPrev = () => {
    setIsAutoPlay(false);
    api?.scrollPrev();
  };

  const scrollNext = () => {
    setIsAutoPlay(false);
    api?.scrollNext();
  };

  const scrollTo = (index: number) => {
    setIsAutoPlay(false);
    api?.scrollTo(index);
  };

  return {
    api,
    setApi,
    current,
    isAutoPlay,
    setIsAutoPlay,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}

