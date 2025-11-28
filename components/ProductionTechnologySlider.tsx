'use client'
import { useState, useEffect } from "react";
import { getImagePath } from "@/lib/image-path";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
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
    image: getImagePath("/assets/production-thick-copper-etching.png")
  }]
}, {
  title: "6-10 oz厚铜压合填胶",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/production-thick-copper-lamination.png")
  }]
}, {
  title: "厚铜激光钻孔&电镀填孔（一）",
  subtitle: "占位内容",
  content: [{
    title: "占位标题",
    description: "占位描述",
    items: [],
    image: getImagePath("/assets/production-laser-drilling-plating-1.png")
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
    }, 2000);
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

  return <section id="production-technology" className="py-16 bg-background relative overflow-hidden">
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
          <CarouselContent>
            {slides.map((slide, index) => <CarouselItem key={index}>
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
            }}>
                  <Card className="border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm relative overflow-hidden px-8 pt-2 pb-4 md:px-12 md:pt-3 md:pb-6">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
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
                        <div className="relative rounded-lg overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
                          {/* Gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                          
                          {/* Image */}
                          <img src={slide.content[0]?.image} alt={slide.title} className="relative w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>)}
          </CarouselContent>

          {/* Navigation Arrows */}
          <Button onClick={() => {
          setIsAutoPlay(false);
          api?.scrollPrev();
        }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="上一张幻灯片">
            <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
          </Button>
          <Button onClick={() => {
          setIsAutoPlay(false);
          api?.scrollNext();
        }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="下一张幻灯片">
            <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
          </Button>
        </Carousel>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`h-2 rounded-full transition-all duration-300 ${current === index ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"}`} aria-label={`跳转到第 ${index + 1} 张幻灯片`} aria-current={current === index ? "true" : undefined} />)}
        </div>
      </div>
    </section>;
};
