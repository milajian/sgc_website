'use client'
import { useState, useEffect } from "react";
import { getImagePath } from "@/lib/image-path";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Microscope } from "lucide-react";
import { motion } from "framer-motion";

interface SimulationSlide {
  title: string;
  subtitle: string;
  highlights: string[];
  images: string[];
}

const simulationSlides: SimulationSlide[] = [
  {
    title: "PCB电机电磁仿真",
    subtitle: "与高校成立联合实验室",
    highlights: [
      "空载相电势峰值/V",
      "磁场分布",
      "气隙磁密",
      "输出转矩/N·m"
    ],
    images: [getImagePath("/assets/simulation-electromagnetic-4.png"), getImagePath("/assets/simulation-electromagnetic-3.png"), getImagePath("/assets/simulation-electromagnetic-2.jpg"), getImagePath("/assets/simulation-electromagnetic-1.jpg")]
  },
  {
    title: "PCB电机定子热仿真",
    subtitle: "红外热成像与热仿真测试",
    highlights: [
      "自然降温\n5 A，114 °C",
      "风冷降温\n5 A，53 °C",
      "水冷降温\n5 A，27 °C\n(20 A最高88 °C)",
      "PCB板级热仿真\n负载电流:5A AC；冷却方式:自然对流\n红外实测温度:114 °C\n仿真与实测结果基本一致"
    ],
    images: [getImagePath("/assets/simulation-thermal-2.jpg"), getImagePath("/assets/simulation-thermal-3.jpg"), getImagePath("/assets/simulation-thermal-4.png"), getImagePath("/assets/simulation-thermal-1.jpg")]
  }
];

export const SimulationTestSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || !isAutoPlay) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [api, isAutoPlay]);

  // 自动恢复播放：用户暂停后 5 秒自动恢复
  useEffect(() => {
    if (isAutoPlay) return;
    
    const restoreTimer = setTimeout(() => {
      setIsAutoPlay(true);
    }, 5000);

    return () => clearTimeout(restoreTimer);
  }, [isAutoPlay]);

  return (
    <section id="simulation-test" className="py-16 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Microscope className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              仿真测试
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            工程能力、研发能力、仿真验证能力的专业展示
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {simulationSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 backdrop-blur-sm overflow-hidden relative group hover:border-primary/35 transition-all duration-500">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent shimmer" />
                    
                    <div className="relative z-10 p-6 md:p-8">
                      {/* Top: Title and Subtitle */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-6"
                      >
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {slide.title}
                        </h3>
                        <p className="text-xl text-muted-foreground font-semibold">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      {/* Bottom: Images Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`grid grid-cols-1 ${index === 0 ? 'gap-6 md:grid-cols-2' : 'gap-4 md:grid-cols-3'}`}
                      >
                        {slide.images.slice(0, index === 0 ? 2 : 3).map((image, imgIdx) => (
                          <div 
                            key={imgIdx}
                            className={`flex flex-col gap-3 ${index === 0 ? '' : 'max-w-[220px]'} ${index === 1 && imgIdx === 0 ? 'ml-16' : index === 1 && imgIdx === 1 ? 'ml-8' : ''}`}
                          >
                            <div className={`relative rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md group hover:shadow-xl transition-all duration-500 flex items-center justify-center ${index === 0 ? 'h-[190px]' : 'h-[160px]'}`}>
                              {/* Gradient background */}
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                              <img 
                                src={image} 
                                alt={`${slide.title} 图${imgIdx + 1}`}
                                className="w-full h-full object-contain hover:scale-[1.03] transition-transform duration-500 relative z-10"
                                loading="lazy"
                              />
                              {/* Glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            {/* Image Caption - Outside the image frame */}
                            <p className="text-sm font-semibold text-foreground text-center">
                              {slide.highlights[imgIdx] || `图片 ${imgIdx + 1}`}
                            </p>
                          </div>
                        ))}
                      </motion.div>

                      {/* Second Row */}
                      {slide.images.length > (index === 0 ? 2 : 3) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className={`grid grid-cols-1 ${index === 0 ? 'mt-4 gap-6 md:grid-cols-2' : 'mt-4 gap-4 md:grid-cols-3'}`}
                        >
                          {index === 0 ? (
                            // Electromagnetic simulation: 2 images in second row
                            slide.images.slice(2, 4).map((image, imgIdx) => (
                              <div key={imgIdx + 2} className="flex flex-col gap-3">
                                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md group hover:shadow-xl transition-all duration-500 flex items-center justify-center h-[190px]">
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                                  <img 
                                    src={image} 
                                    alt={`${slide.title} 图${imgIdx + 3}`}
                                    className="w-full h-full object-contain hover:scale-[1.03] transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <p className="text-sm font-semibold text-foreground text-center">
                                  {slide.highlights[imgIdx + 2] || `图片 ${imgIdx + 3}`}
                                </p>
                              </div>
                            ))
                          ) : (
                            // Thermal simulation: 1 image + conclusion text
                            <>
                              <div className={`flex flex-col gap-3 ${index === 0 ? '' : 'max-w-[220px]'} ${index === 1 ? 'ml-16' : ''}`}>
                                <div className={`relative rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md group hover:shadow-xl transition-all duration-500 flex items-center justify-center ${index === 0 ? 'h-[190px]' : 'h-[160px]'}`}>
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                                  <img 
                                    src={slide.images[3]} 
                                    alt={`${slide.title} 图4`}
                                    className="w-full h-full object-contain hover:scale-[1.03] transition-transform duration-500 relative z-10"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <p className="text-sm font-semibold text-foreground text-center whitespace-pre-line">
                                  {slide.highlights[3] || `图片 4`}
                                </p>
                              </div>
                              
                              <div className="md:col-span-2 flex items-center">
                                <div className="relative rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 p-4 backdrop-blur-sm">
                                  <p className="text-base font-semibold text-foreground leading-relaxed">
                                    <span className="text-primary font-bold">结论：</span>
                                    风冷时，功率可提升2倍；水冷时，功率可至少提升4倍，因此提高PCB定子的散热及防水效果，在功率提升等方面至关重要。
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <Button 
              onClick={() => {
                setIsAutoPlay(false);
                api?.scrollPrev();
              }} 
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="上一张幻灯片"
            >
              <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
            <Button 
              onClick={() => {
                setIsAutoPlay(false);
                api?.scrollNext();
              }} 
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
              variant="ghost"
              aria-label="下一张幻灯片"
            >
              <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
          </Carousel>

          {/* Dots indicator with glow */}
          <div className="flex justify-center gap-2 mt-6">
            {simulationSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
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
