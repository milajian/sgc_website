'use client'
import { getImagePath } from "@/lib/image-path";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCarouselAutoPlay } from "@/hooks/useCarouselAutoPlay";
import { useRef, useEffect } from "react";
interface Slide {
  title: string;
  subtitle: string;
  content: {
    title: string;
    description: string;
    items: string[];
    image?: string;
  }[];
  conclusion?: string;
}
const slides: Slide[] = [{
  title: "6-10 oz厚铜内层蚀刻",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/设备1.png")
  }]
}, {
  title: "6-10 oz厚铜压合填胶",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/设备2.png")
  }]
}, {
  title: "厚铜激光钻孔&电镀填孔（一）",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/设备3.png")
  }]
}, {
  title: "厚铜激光钻孔&电镀填孔（二）",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/production-laser-drilling-plating-2.png")
  }]
}];
export const ProductionTechnologySlider = () => {
  const { api, setApi, current, scrollPrev, scrollNext, scrollTo } = useCarouselAutoPlay({
    autoPlayInterval: 4200,
    restoreDelay: 5000
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateHeights = () => {
      // 过滤掉null值，获取所有容器元素（Card或div）
      const containers = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (containers.length === 0) return;
      
      // 重置高度，让内容自然决定高度
      containers.forEach(container => {
        container.style.height = 'auto';
      });
      
      // 等待浏览器重新计算布局
      requestAnimationFrame(() => {
        // 计算最大高度
        const maxHeight = Math.max(...containers.map(container => container.offsetHeight));
        
        // 统一设置高度
        containers.forEach(container => {
          container.style.height = `${maxHeight}px`;
        });
      });
    };
    
    // 初始计算 - 延迟执行以确保所有卡片都已渲染
    const timer = setTimeout(() => {
      updateHeights();
    }, 100);
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateHeights);
    
    // 监听carousel切换，重新计算高度
    const handleSelect = () => {
      setTimeout(updateHeights, 100);
    };
    
    if (api) {
      api.on('select', handleSelect);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeights);
      if (api) {
        api.off('select', handleSelect);
      }
    };
  }, [api]);

  return <section id="production-technology" className="py-16 bg-background relative overflow-hidden section-fade-top">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div className="flex items-center justify-center gap-3 mb-12" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <Settings className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ​PCB定子生产设备
          </h2>
        </motion.div>

        <Carousel setApi={setApi} opts={{
        loop: true
      }} className="w-full">
          <CarouselContent className="h-full items-stretch">
            {slides.map((slide, index) => <CarouselItem key={index} className="h-full">
                <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} 
              className="h-full flex flex-col justify-center"
            >
                  {index === 2 ? (
                    <Card 
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-2 pb-4 md:pt-3 md:pb-6"
                    >
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-0">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-0 break-words leading-tight">
                            {slide.title}
                          </h3>
                        </div>

                        <div className="flex justify-center">
                          <motion.div className="w-full max-w-6xl group" initial={{
                            opacity: 0,
                            scale: 0.95
                          }} whileInView={{
                            opacity: 1,
                            scale: 1
                          }} viewport={{
                            once: true
                          }} transition={{
                            duration: 0.5
                          }}>
                            <div className="relative rounded-lg overflow-visible bg-transparent p-0">
                              {/* 厚铜激光钻孔&电镀填孔（一）- 四个小图片布局 */}
                              <div className="grid grid-cols-2 gap-x-1 sm:gap-x-2 md:gap-x-3 gap-y-0 items-start">
                                {/* 左上角：填孔1 */}
                                <div className="flex flex-col items-center gap-0 px-1">
                                  <div className="w-full aspect-[5/3] flex-shrink-0">
                                    <img src={getImagePath("/assets/填孔1.png")} alt="填孔1" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-2 md:-mt-3 leading-tight break-words px-0.5">0.3mm叠孔图（用0.1mm小孔叠）</p>
                                </div>
                                
                                {/* 右上角：填孔2 */}
                                <div className="flex flex-col items-center gap-0 px-1">
                                  <div className="w-full aspect-[5/3] flex-shrink-0">
                                    <img src={getImagePath("/assets/填孔2.png")} alt="填孔2" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-2 md:-mt-3 leading-tight break-words px-0.5">三菱激光钻孔机</p>
                                </div>
                                
                                {/* 左下角：填孔3 */}
                                <div className="flex flex-col items-center gap-0 px-1 -mt-2 sm:-mt-3 md:-mt-4">
                                  <div className="w-full aspect-[5/3] flex-shrink-0 -mb-3 md:-mb-4">
                                    <img src={getImagePath("/assets/填孔3.png")} alt="填孔3" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-5 md:-mt-6 leading-tight break-words px-0.5">0.35mm叠孔图（用0.1mm小孔叠）</p>
                                </div>
                                
                                {/* 右下角：填孔4 */}
                                <div className="flex flex-col items-center gap-0 px-1 -mt-2 sm:-mt-3 md:-mt-4">
                                  <div className="w-full aspect-[5/3] flex-shrink-0 -mb-3 md:-mb-4">
                                    <img src={getImagePath("/assets/填孔4.png")} alt="填孔4" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-5 md:-mt-6 leading-tight break-words px-0.5">厚铜激光钻孔图示</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  ) : index === 3 ? (
                    <Card 
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-2 pb-4 md:pt-3 md:pb-6"
                    >
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-0">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-0 break-words leading-tight">
                            {slide.title}
                          </h3>
                        </div>

                        <div className="flex justify-center">
                          <motion.div className="w-full max-w-6xl group" initial={{
                            opacity: 0,
                            scale: 0.95
                          }} whileInView={{
                            opacity: 1,
                            scale: 1
                          }} viewport={{
                            once: true
                          }} transition={{
                            duration: 0.5
                          }}>
                            <div className="relative rounded-lg overflow-visible bg-transparent p-0">
                              {/* 厚铜激光钻孔&电镀填孔（二）- 参考原图布局 */}
                              <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 items-start">
                                {/* 左上角：水平沉铜线 */}
                                <div className="flex flex-col items-center gap-0 px-1">
                                  <div className="w-full aspect-[5/3] flex-shrink-0">
                                    <img src={getImagePath("/assets/水平1.png")} alt="水平沉铜线" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-2 md:-mt-3 leading-tight break-words px-0.5">水平沉铜线</p>
                                </div>
                                
                                {/* 右上角：背光等级和填孔饱满度文字 */}
                                <div className="flex flex-col items-center justify-center gap-1 px-1 h-full">
                                  <div className="text-[10px] xs:text-xs sm:text-sm md:text-base text-primary font-bold text-center leading-tight break-words">
                                    <p className="mb-1 sm:mb-2">背光等级: 9.5级</p>
                                    <p>填孔饱满度: 大于等于90%</p>
                                  </div>
                                </div>
                                
                                {/* 左下角：厚铜激光盲孔电镀填孔（两个显微镜图片） */}
                                <div className="flex flex-col items-center gap-0 px-1">
                                  <div className="w-full aspect-[5/3] flex-shrink-0">
                                    <img src={getImagePath("/assets/水平2.png")} alt="厚铜激光盲孔电镀填孔" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <div className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-2 md:-mt-3 leading-tight break-words px-0.5">
                                    <p className="mb-0">厚铜激光盲孔电镀填孔</p>
                                    <p className="mb-0">（左第一次填孔, 右第二次填孔）</p>
                                  </div>
                                </div>
                                
                                {/* 右下角：VCP填孔线 */}
                                <div className="flex flex-col items-center gap-0 px-1">
                                  <div className="w-full aspect-[5/3] flex-shrink-0">
                                    <img src={getImagePath("/assets/水平3.png")} alt="VCP填孔线" className="w-full h-full object-contain" loading="lazy" />
                                  </div>
                                  <p className="font-bold text-primary text-[10px] xs:text-xs sm:text-sm md:text-base text-center -mt-2 md:-mt-3 leading-tight break-words px-0.5">VCP填孔线</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card 
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className="h-full flex flex-col border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-2 pb-4 md:pt-3 md:pb-6"
                    >
                      <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-4 sm:mb-6 md:mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent break-words leading-tight">
                          {slide.title}
                        </h3>
                      </div>

                      <div className="flex justify-center">
                        <motion.div className="w-full max-w-6xl group" initial={{
                          opacity: 0,
                          scale: 0.95
                        }} whileInView={{
                          opacity: 1,
                          scale: 1
                        }} viewport={{
                          once: true
                        }} transition={{
                          duration: 0.5
                        }}>
                          <div className="relative rounded-lg overflow-visible bg-transparent p-2">
                            {/* Image */}
                            <img src={slide.content[0]?.image} alt={slide.title} className="relative w-full h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 drop-shadow-xl" loading="lazy" />
                            
                            {/* Equipment Description Text - Bottom Left (Responsive) */}
                            {index === 0 && (
                              <>
                                {/* 上面的文字框 - 位于左上角小图片下方 */}
                                <div className="absolute bottom-[30%] sm:bottom-[28%] md:bottom-[26%] lg:bottom-[24%] left-[2%] md:left-[3%] w-[45%] sm:w-[48%] md:w-[50%] lg:w-[55%] p-1 sm:p-1.5 md:p-2 lg:p-3 z-10">
                                  <p className="font-bold text-primary text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight break-words text-left">外层宇宙真空+二流体蚀刻线</p>
                                </div>
                                
                                {/* 下面的文字框 */}
                                <div className="absolute bottom-[5%] sm:bottom-[4%] md:bottom-[3%] lg:bottom-[2%] xl:bottom-0 left-[2%] md:left-[3%] w-[45%] sm:w-[48%] md:w-[38%] lg:w-[42%] max-h-[35%] sm:max-h-[38%] md:max-h-[45%] lg:max-h-[50%] overflow-y-auto p-1 sm:p-1.5 md:p-2 lg:p-3 z-10">
                                  <div className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-foreground text-left">
                                    <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-foreground/90 leading-tight break-words mb-0.5 sm:mb-1">出色的去蚀刻毛边能力</p>
                                    <div className="space-y-0.5 sm:space-y-1">
                                      <p className="font-semibold text-primary text-[9px] xs:text-[10px] sm:text-xs md:text-sm leading-tight break-words">蚀刻均匀性</p>
                                      <div className="space-y-0 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-foreground/90 leading-tight">
                                        <p className="break-words">上喷≥95%</p>
                                        <p className="break-words">下喷≥96%</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              </CarouselItem>)}
          </CarouselContent>

          {/* Navigation Arrows */}
          <Button onClick={scrollPrev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="上一张幻灯片">
            <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
          </Button>
          <Button onClick={scrollNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="下一张幻灯片">
            <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
          </Button>
        </Carousel>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => <button key={index} onClick={() => scrollTo(index)} className={`h-2 rounded-full transition-all duration-300 ${current === index ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"}`} aria-label={`跳转到第 ${index + 1} 张幻灯片`} aria-current={current === index ? "true" : undefined} />)}
        </div>
      </div>
    </section>;
};
