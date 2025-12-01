'use client'
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
import { useCarouselAutoPlay } from "@/hooks/useCarouselAutoPlay";
import { useRef, useEffect } from "react";

interface CaseStudy {
  title: string;
  application: string;
  specs: {
    label: string;
    value: string;
  }[];
  imagePlaceholder?: string;
  image?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "水泵",
    application: "300W",
    specs: [
      { label: "应用领域", value: "水泵" },
      { label: "功率", value: "300W" },
      { label: "额定电流", value: "23A" },
      { label: "转速", value: "5000rpm" },
      { label: "额定效率", value: ">87%" },
      { label: "层数", value: "10层" },
      { label: "内层铜厚", value: "4/4 Oz" },
      { label: "成品板厚", value: "2.4mm" },
      { label: "成品尺寸", value: "∅103.75mm" },
    ],
    image: getImagePath("/assets/水泵300新2.png"),
  },
  {
    title: "水泵",
    application: "400W",
    specs: [
      { label: "应用领域", value: "水泵" },
      { label: "功率", value: "400W" },
      { label: "额定电流", value: "40A" },
      { label: "转速", value: "4500rpm" },
      { label: "额定扭矩", value: "0.85N·m" },
      { label: "层数", value: "20层" },
      { label: "内层铜厚", value: "6/6 Oz" },
      { label: "成品板厚", value: "6.9mm" },
      { label: "成品尺寸", value: "∅87.89*89mm" },
    ],
    image: getImagePath("/assets/水泵4001.png"),
  },
  {
    title: "风机",
    application: "400W",
    specs: [
      { label: "应用领域", value: "风机" },
      { label: "功率", value: "400W" },
      { label: "额定电流", value: "1A" },
      { label: "转速", value: "1800rpm" },
      { label: "层数", value: "14层" },
      { label: "内层铜厚", value: "4/4 Oz" },
      { label: "成品板厚", value: "3.8mm" },
      { label: "成品尺寸", value: "∅154.5mm" },
    ],
    image: getImagePath("/assets/风机1.png"),
  },
  {
    title: "大型服务器风机",
    application: "6000W",
    specs: [
      { label: "应用领域", value: "主驱电机" },
      { label: "功率", value: "6000W" },
      { label: "额定电流", value: "15A" },
      { label: "转速", value: "3600rpm" },
      { label: "层数", value: "26层" },
      { label: "内层铜厚", value: "4/4 Oz" },
      { label: "成品板厚", value: "6.5mm" },
      { label: "成品尺寸", value: "∅400mm" },
    ],
    image: getImagePath("/assets/大型风机.png"),
  },
  {
    title: "发电机",
    application: "500W",
    specs: [
      { label: "应用领域", value: "发电机" },
      { label: "功率", value: "500W" },
      { label: "额定电流", value: "12A" },
      { label: "转速", value: "500rpm" },
      { label: "层数", value: "32层" },
      { label: "内层铜厚", value: "4/4 Oz" },
      { label: "成品板厚", value: "7.9mm" },
      { label: "成品尺寸", value: "∅250mm" },
    ],
    image: getImagePath("/assets/发电机.png"),
  },
  {
    title: "机器人关节电机",
    application: "200W",
    specs: [
      { label: "应用领域", value: "机器人关节电机" },
      { label: "功率", value: "200W" },
      { label: "额定电流", value: "9A" },
      { label: "转速", value: "7200rpm" },
      { label: "层数", value: "26层" },
      { label: "内层铜厚", value: "4/4 Oz" },
      { label: "成品板厚", value: "5.7mm" },
      { label: "成品尺寸", value: "∅68.5mm" },
    ],
    image: getImagePath("/assets/机器人.png"),
  },
  {
    title: "机器人指关节电机",
    application: "25W",
    specs: [
      { label: "应用领域", value: "机器人指关节电机" },
      { label: "功率", value: "25W" },
      { label: "额定电流", value: "1A" },
      { label: "转速", value: "3600rpm" },
      { label: "层数", value: "12层+5阶HDI" },
      { label: "内层铜厚", value: "2/2 Oz" },
      { label: "成品板厚", value: "2.1mm" },
      { label: "成品尺寸", value: "∅19mm" },
    ],
    image: getImagePath("/assets/机器人2.png"),
  },
  {
    title: "直线电机（磁悬浮）",
    application: "1000W",
    specs: [
      { label: "应用领域", value: "直线电机（磁悬浮）" },
      { label: "功率", value: "1000W" },
      { label: "额定电流", value: "10A" },
      { label: "层数", value: "12层" },
      { label: "内层铜厚", value: "5/5 Oz" },
      { label: "成品板厚", value: "3.35mm" },
      { label: "成品尺寸", value: "129mm*496mm" },
    ],
    image: getImagePath("/assets/磁悬浮.png"),
  },
  {
    title: "直线电机（医疗）",
    application: "100W",
    specs: [
      { label: "应用领域", value: "直线电机（医疗）" },
      { label: "功率", value: "100W" },
      { label: "额定电流", value: "5A" },
      { label: "层数", value: "16层" },
      { label: "内层铜厚", value: "3/3 Oz" },
      { label: "成品板厚", value: "2.7mm" },
      { label: "成品尺寸", value: "140mm*26mm" },
    ],
    image: getImagePath("/assets/医疗.png"),
  },
  {
    title: "平板电机",
    application: "500W",
    specs: [
      { label: "应用领域", value: "平板电机" },
      { label: "功率", value: "500W" },
      { label: "额定电流", value: "1A" },
      { label: "层数", value: "16层" },
      { label: "内层铜厚", value: "7/7 Oz" },
      { label: "成品板厚", value: "5.1mm" },
      { label: "成品尺寸", value: "321mm*321mm" },
    ],
    image: getImagePath("/assets/平面电机.png"),
  },
];

export const CaseStudySlider = () => {
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
    <section id="case-study" className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background section-fade-top-gradient section-fade-bottom-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PCB电机案例分析
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            深入的行业落地能力，形成强工程信任背书
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent className="h-full items-stretch">
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="h-full">
                  <Card 
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 backdrop-blur-sm overflow-hidden relative group hover:border-primary/35 transition-all duration-500"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent shimmer" />
                    
                    <div className="grid md:grid-cols-[1fr,2fr] gap-2 md:gap-8 pt-6 md:pt-8 px-6 md:px-8 pb-0 relative z-10 flex-1 items-center">
                      {/* Left: Text Content */}
                      <div className="flex flex-col justify-center space-y-6">
                        <div>
                          <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-pre-line">
                            {study.title}
                          </h3>
                          <p className="text-2xl md:text-3xl text-accent font-bold">
                            {study.application}
                          </p>
                        </div>

                        {/* 规格参数表格 */}
                        <div className="rounded-lg border border-primary/20 overflow-hidden bg-background/50 backdrop-blur-sm">
                          <table className="w-full text-[10px] sm:text-base">
                            <tbody>
                              {Array.from({ length: Math.ceil(study.specs.length / 2) }).map((_, rowIndex) => {
                                const leftSpec = study.specs[rowIndex * 2];
                                const rightSpec = study.specs[rowIndex * 2 + 1];
                                const isEven = rowIndex % 2 === 0;
                                return (
                                  <tr 
                                    key={rowIndex} 
                                    className={`
                                      border-b border-primary/10 last:border-b-0
                                      transition-colors duration-200
                                      ${isEven ? 'bg-primary/5' : 'bg-transparent'}
                                      hover:bg-accent/10
                                    `}
                                  >
                                    {/* 左列 - 标签 */}
                                    <td className="py-2.5 px-2 sm:px-3 md:px-4 text-muted-foreground text-[10px] sm:text-base md:text-sm font-medium whitespace-normal sm:whitespace-nowrap w-auto sm:w-[20%]">
                                      {leftSpec?.label}
                                    </td>
                                    {/* 左列 - 值 */}
                                    <td className="py-2.5 px-2 sm:px-3 md:px-4 font-semibold text-primary text-xs sm:text-base border-r border-primary/10 w-auto sm:w-[30%]">
                                      {leftSpec?.value}
                                    </td>
                                    {/* 右列 - 标签 */}
                                    <td className="py-2.5 px-2 sm:px-3 md:px-4 text-muted-foreground text-[10px] sm:text-base md:text-sm font-medium whitespace-normal sm:whitespace-nowrap w-auto sm:w-[20%]">
                                      {rightSpec?.label}
                                    </td>
                                    {/* 右列 - 值 */}
                                    <td className="py-2.5 px-2 sm:px-3 md:px-4 font-semibold text-primary text-xs sm:text-base w-auto sm:w-[30%]">
                                      {rightSpec?.value}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right: Image */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500 -mb-2 md:-mb-3">
                        {study.image ? (
                          <img 
                            src={study.image} 
                            alt={study.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-center p-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <p className="text-lg font-medium text-muted-foreground">
                              {study.imagePlaceholder}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button 
              onClick={scrollPrev}
              className="h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="上一张幻灯片"
            >
              <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>

            {/* Dots indicator with glow */}
            <div className="flex gap-2">
              {caseStudies.map((_, index) => (
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

            <Button 
              onClick={scrollNext}
              className="h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="下一张幻灯片"
            >
              <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
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
