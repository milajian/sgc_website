'use client'
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Zap, Battery, Cpu, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
import { useCarouselAutoPlay } from "@/hooks/useCarouselAutoPlay";
import { useRef, useEffect } from "react";
const slides = [
  {
    title: "PCB定子轴向电机",
    subtitle: "革命性的PCB定子技术",
    highlights: [
      "节省绕线、灌封成本，提高整体集成度",
      "轴向磁场设计，优化磁路结构",
      "支持有铁芯与无铁芯两种方案",
      "大幅提升生产自动化水平"
    ],
    image: getImagePath("/assets/pcb-motor-intro.png"),
    icon: Zap,
    gradient: "from-cyan-500/15 via-blue-500/15 to-teal-500/15",
    isNewLayout: true,
    newLayoutImages: [
      getImagePath("/assets/pcbdingzi1.png"),
      getImagePath("/assets/pcbdingzi2.png"),
      getImagePath("/assets/pcbdingzi3.png")
    ],
    newLayoutTitle: "PCB定子轴向磁通电机",
    newLayoutSubtitle: "无铁芯 PCB定子轴向磁通电机"
  },
  {
    title: "径向磁通 vs 轴向磁通",
    subtitle: "磁路设计的技术革新",
    highlights: [
      "轴向磁通电机采用扁平化设计，功率密度更高",
      "磁通方向沿轴线传递，磁路更短更高效",
      "PCB定子线圈工艺实现精确控制",
      "适合高转矩低速应用场景"
    ],
    image: getImagePath("/assets/jingxiangzhouxiang.png"),
    icon: Zap,
    gradient: "from-teal-500/15 via-cyan-500/15 to-blue-500/15",
    isComparisonLayout: true
  },
  {
    title: "PCB电机\n两种结构形式",
    subtitle: "高效能硅钢铁芯方案",
    highlights: [
      "比传统绕线定子节省更多铜用量",
      "减少磁滞和涡流损耗，提高电机效率",
      "无需绕线、灌封，成本最低",
      "集成传感器与电控，提高集成度并简化组装"
    ],
    image: getImagePath("/assets/pcb-motor-two-structures.png"),
    icon: Cpu,
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    isSpecialLayout: true,
    images: [
      getImagePath("/assets/PCBdingzi.png"),
      getImagePath("/assets/youtiexin.png"),
      getImagePath("/assets/wutiexin.png")
    ],
    textLabels: {
      mainTitle: "PCB定子轴向电机",
      leftTitle: "有铁芯",
      leftDesc: "硅钢或SMC材料铁芯",
      rightTitle: "无铁芯",
      rightDesc: "无需铁芯，重量/成本大幅度减少"
    }
  }
];

export const PCBMotorSlider = () => {
  const { api, setApi, current, scrollPrev, scrollNext, scrollTo } = useCarouselAutoPlay({
    autoPlayInterval: 4200,
    restoreDelay: 5000
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateHeights = () => {
      // 过滤掉null值，获取所有Card元素
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;
      
      // 重置高度，让内容自然决定高度
      cards.forEach(card => {
        card.style.height = 'auto';
      });
      
      // 等待浏览器重新计算布局
      requestAnimationFrame(() => {
        // 计算最大高度
        const maxHeight = Math.max(...cards.map(card => card.offsetHeight));
        
        // 统一设置高度
        cards.forEach(card => {
          card.style.height = `${maxHeight}px`;
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

  return (
    <section id="pcb-motor-intro" className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient">

      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-6">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CircuitBoard className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PCB电机产品介绍
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              突破传统，引领轴向磁通技术革新
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <div className="relative">
            <Carousel 
              setApi={setApi} 
              opts={{
                align: "start",
                loop: true
              }} 
              className="w-full"
            >
              <CarouselContent className="h-full items-stretch">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                  <Card 
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 backdrop-blur-sm overflow-hidden relative group hover:border-primary/35 transition-all duration-500"
                  >
                    {/* Shimmer effect - similar to PCB Motor Advantages but slightly different */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent shimmer" />
                    </div>

                    <div className={`${slide.highlights.length === 0 ? 'flex flex-col items-center justify-center p-8 md:p-12' : 'grid md:grid-cols-2 gap-8 p-8 md:p-12 items-stretch'} relative flex-1`}>
                      {slide.highlights.length === 0 ? (
                        // Top-bottom layout for comparison slide
                        <>
                          <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center mb-8"
                          >
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                              {slide.title}
                            </h3>
                          </motion.div>

                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex items-center justify-center"
                          >
                            <div className="relative w-full max-w-3xl">
                              {/* Glowing backdrop */}
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse" />
                              
                              {/* Image container */}
                              <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4">
                                <img 
                                  src={slide.image} 
                                  alt={slide.title}
                                  className="w-full h-auto object-contain"
                                  loading="lazy"
                                />
                              </div>

                              {/* Circuit corner accents */}
                              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                            </div>
                          </motion.div>
                        </>
                      ) : (
                        // Original left-right layout
                        <>
                      {/* Left side - Text content */}
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center space-y-6 ml-12"
                      >
                        <div className="space-y-3">
                          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight whitespace-pre-line">
                            {slide.title}
                          </h3>
                          <p className="text-lg text-primary/90 font-semibold">
                            {slide.subtitle}
                          </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4">
                          {slide.highlights.map((highlight, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary relative">
                                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                                </div>
                              </div>
                              <p className="text-foreground/90 leading-relaxed group-hover/item:text-foreground transition-colors">
                                {highlight}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Right side - Image or Special Layout */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex items-center justify-center"
                      >
                        {slide.isNewLayout && slide.newLayoutImages ? (
                          // New layout for "PCB定子轴向电机"
                          <div className="relative w-full max-w-2xl">
                            {/* Glowing backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse" />
                            
                            {/* Content container */}
                            <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-6">
                              {/* Top section: Title + First Image */}
                              <div className="mb-6">
                                {/* Title at top left */}
                                <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-left">
                                  {slide.newLayoutTitle}
                                </h4>
                                
                                {/* First image centered with label */}
                                <div className="relative flex justify-center">
                                  <div className="relative inline-block">
                                    <img 
                                      src={slide.newLayoutImages[0]} 
                                      alt="PCB定子轴向磁通电机爆炸图"
                                      className="w-full max-w-lg h-auto object-contain"
                                      loading="lazy"
                                    />
                                    {/* Label at bottom-right of image */}
                                    <span className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md font-medium shadow-lg">
                                      实物爆炸图
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Middle section: Subtitle */}
                              <div className="mb-6">
                                <p className="text-center text-lg md:text-xl font-semibold text-accent">
                                  {slide.newLayoutSubtitle}
                                </p>
                              </div>
                              
                              {/* Bottom section: Two column layout */}
                              <div className="grid grid-cols-2 gap-6">
                                {/* Left column */}
                                <div className="flex flex-col items-center text-center space-y-3">
                                  <div className="w-full flex justify-center">
                                    <img 
                                      src={slide.newLayoutImages[1]} 
                                      alt="PCB定子实物"
                                      className="w-full max-w-[200px] h-auto object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-sm md:text-base font-medium text-foreground">
                                    PCB定子实物
                                  </p>
                                </div>
                                
                                {/* Right column */}
                                <div className="flex flex-col items-center text-center space-y-3">
                                  <div className="w-full flex justify-center">
                                    <img 
                                      src={slide.newLayoutImages[2]} 
                                      alt="PCB定子截面"
                                      className="w-full max-w-[200px] h-auto object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-sm md:text-base font-medium text-foreground">
                                    PCB定子截面
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Circuit corner accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                          </div>
                        ) : slide.isSpecialLayout && slide.images && slide.textLabels ? (
                          // Special layout for "PCB电机两种结构形式"
                          <div className="relative w-full max-w-2xl">
                            {/* Glowing backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse" />
                            
                            {/* Content container */}
                            <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4">
                              {/* Top title bar */}
                              <div className="bg-[#1e3a5f] py-3 px-6 rounded-lg mb-4">
                                <h4 className="text-white text-xl font-bold text-center">
                                  {slide.textLabels.mainTitle}
                                </h4>
                              </div>
                              
                              {/* Exploded view image */}
                              <div className="flex justify-center mb-4">
                                <img 
                                  src={slide.images[0]} 
                                  alt="PCB定子轴向电机结构"
                                  className="w-full max-w-lg h-auto object-contain"
                                  loading="lazy"
                                />
                              </div>
                              
                              {/* Two column comparison */}
                              <div className="grid grid-cols-2 gap-4">
                                {/* Left column - 有铁芯 */}
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <h5 className="text-lg font-bold text-foreground">
                                    {slide.textLabels.leftTitle}
                                  </h5>
                                  <div className="w-full flex justify-center">
                                    <img 
                                      src={slide.images[1]} 
                                      alt="有铁芯结构"
                                      className="w-full max-w-[200px] h-auto object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {slide.textLabels.leftDesc}
                                  </p>
                                </div>
                                
                                {/* Right column - 无铁芯 */}
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <h5 className="text-lg font-bold text-foreground">
                                    {slide.textLabels.rightTitle}
                                  </h5>
                                  <div className="w-full flex justify-center">
                                    <img 
                                      src={slide.images[2]} 
                                      alt="无铁芯结构"
                                      className="w-full max-w-[160px] h-auto object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {slide.textLabels.rightDesc}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Circuit corner accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                          </div>
                        ) : slide.isComparisonLayout ? (
                          // Comparison layout for "径向磁通 vs 轴向磁通"
                          <div className={`relative w-full max-w-xl`}>
                            {/* Glowing backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse" />
                            
                            {/* Image container */}
                            <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 pt-8 pb-4 px-4">
                              <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="w-full h-auto object-contain"
                              />
                              
                              {/* Labels overlay - positioned for both left and right halves of comparison image */}
                              <div className="absolute inset-0 pointer-events-none">
                                {/* Left side labels - 径向磁通电机 */}
                                {/* Top banner - 径向磁通电机 (centered horizontally in left half, at very top) */}
                                <div className="absolute top-[2%] left-[12%] md:top-[1.5%] md:left-[10%]">
                                  <div className="bg-primary rounded-lg py-1.5 px-3 md:py-2 md:px-4 shadow-lg">
                                    <p className="text-xs md:text-sm font-medium text-primary-foreground whitespace-nowrap">径向磁通电机</p>
                                  </div>
                                </div>
                                
                                {/* Bottom label - 线圈定子实物 (centered horizontally in left half, below stator coil image) */}
                                <div className="absolute bottom-[6%] left-[25%] -translate-x-1/2 md:bottom-[5%] md:left-[25%] md:-translate-x-1/2">
                                  <p className="text-xs md:text-sm font-medium text-accent text-center whitespace-nowrap">线圈定子实物</p>
                                </div>
                                
                                {/* Right side labels - 轴向磁通电机 */}
                                {/* Top banner - 轴向磁通电机 (centered horizontally in right half, at very top) */}
                                <div className="absolute top-[2%] right-[12%] md:top-[1.5%] md:right-[10%]">
                                  <div className="bg-primary rounded-lg py-1.5 px-3 md:py-2 md:px-4 shadow-lg">
                                    <p className="text-xs md:text-sm font-medium text-primary-foreground whitespace-nowrap">轴向磁通电机</p>
                                  </div>
                                </div>
                                
                                {/* Bottom label - 线圈定子实物 (centered horizontally in right half, below stator coil image) */}
                                <div className="absolute bottom-[6%] right-[25%] translate-x-1/2 md:bottom-[5%] md:right-[25%] md:translate-x-1/2">
                                  <p className="text-xs md:text-sm font-medium text-accent text-center whitespace-nowrap">线圈定子实物</p>
                                </div>
                              </div>
                            </div>

                            {/* Circuit corner accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                          </div>
                        ) : (
                          // Default image layout
                          <div className={`relative w-full max-w-xl`}>
                            {/* Glowing backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse" />
                            
                            {/* Image container */}
                            <div className="relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4">
                              <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="w-full h-auto object-contain"
                              />
                            </div>

                            {/* Circuit corner accents */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
                          </div>
                        )}
                      </motion.div>
                        </>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <Button 
              onClick={scrollPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="上一张幻灯片"
            >
              <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
            <Button 
              onClick={scrollNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="下一张幻灯片"
            >
              <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
            </Carousel>
          </div>

          {/* Dots indicator with glow */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index 
                    ? "bg-primary w-10 shadow-lg shadow-primary/50" 
                    : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                aria-label={`跳转到第 ${index + 1} 张幻灯片`}
                aria-current={current === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};
