'use client'
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Shield, Layers, Box, Flame, Droplets, GitBranch, Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
interface ProtectionThermalSlide {
  title: string;
  subtitle: string;
  summary: string;
  methods: {
    name: string;
    description: string[];
    cost: string;
    delivery: string;
    image?: string;
    icon?: React.ElementType;
  }[];
}
const slides: ProtectionThermalSlide[] = [{
  title: "防护设计",
  subtitle: "应对多场景防护需求",
  summary: "PCB 电机定子可通过多层材料结构实现 IP 级别防护，满足不同应用场景",
  methods: [{
    name: "覆铜层防护",
    description: ["覆铜油墨防水", "可短时间内浸没水中", "B级绝缘"],
    cost: "低",
    delivery: "正常交付",
    image: getImagePath("/assets/protection-semi-cured-sheet-new.png")
  }, {
    name: "压半固化片防护",
    description: ["可满足高压，3 mil 可满足 2700V 耐压", "防水等级更高，能够抵御高压蒸汽", "F级绝缘"],
    cost: "中等",
    delivery: "增加 1-2 天",
    image: getImagePath("/assets/protection-flexible-pcb-new.png")
  }, {
    name: "多层板组合防护",
    description: ["可将电控与定子用微柔性板连接", "柔性板可忍受多次弯折，一体化", "支持整机浸没水中运行", "可满足不同的绝缘等级"],
    cost: "中等",
    delivery: "增加 1-2 天",
    image: getImagePath("/assets/protection-waterproof-demo.jpg")
  }]
}, {
  title: "散热设计",
  subtitle: "多模式散热方案",
  summary: "PCB 定子可通过材料、结构与液冷技术实现多模式高效散热",
  methods: [{
    name: "增加残铜率",
    description: ["通过设计，增加PCB定子残铜率，达到散热效果"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-copper-via.png"),
    icon: Layers
  }, {
    name: "埋铜",
    description: ["在板子中间埋入铜块/铜排", "利用铜的高热导率增加散热"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-buried-copper.png"),
    icon: Box
  }, {
    name: "导热材料",
    description: ["使用高热导率 PP 代替普通 PP"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-materials.png"),
    icon: Flame
  }, {
    name: "水冷",
    description: ["对成品板进行防水设计", "使定子可以长时间浸没水中"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-water-cooling.png"),
    icon: Droplets
  }, {
    name: "微流道",
    description: ["在PP上制作微流道区域", "增加散热通道"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-water-cooling.png"),
    icon: GitBranch
  }, {
    name: "陶瓷材料",
    description: ["使用陶瓷芯板增加热导率"],
    cost: "",
    delivery: "",
    image: getImagePath("/assets/thermal-materials.png"),
    icon: Hexagon
  }]
}];
export const ProtectionThermalSlider = () => {
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

  return <section id="protection-thermal" className="py-16 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              防护与散热设计
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            专业的防护与散热解决方案，满足严苛环境需求
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
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
                delay: index * 0.1
              }}>
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 backdrop-blur-sm overflow-hidden relative group hover:border-primary/35 transition-all duration-500">
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent shimmer" />
                      
                      <div className="relative z-10 p-6 md:p-8">
                        {/* Top: Title and Subtitle */}
                        <motion.div initial={{
                      opacity: 0,
                      y: -20
                    }} whileInView={{
                      opacity: 1,
                      y: 0
                    }} viewport={{
                      once: true
                    }} transition={{
                      duration: 0.6,
                      delay: 0.2
                    }} className="text-center mb-4">
                          <div className="flex items-center justify-center gap-3 flex-wrap">
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              {slide.title}
                            </h3>
                            <p className="text-xl text-muted-foreground font-semibold">
                              {slide.subtitle}
                            </p>
                          </div>
                        </motion.div>

                        {/* Methods Grid */}
                        <motion.div initial={{
                      opacity: 0,
                      y: 20
                    }} whileInView={{
                      opacity: 1,
                      y: 0
                    }} viewport={{
                      once: true
                    }} transition={{
                      duration: 0.6,
                      delay: 0.3
                    }} className={`grid grid-cols-1 ${index === 0 ? 'md:grid-cols-3 gap-3' : 'md:grid-cols-3 gap-3'}`}>
                          {slide.methods.map((method, methodIdx) => <div key={methodIdx} className="flex flex-col h-full">
                              {/* Method Card */}
                              <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md group hover:shadow-xl transition-all duration-500 flex flex-col min-h-[280px]">
                                {/* Icon for thermal slide (left-right layout) or Image for protection slide (top-bottom layout) */}
                                {index === 1 && method.icon ? <div className="flex gap-3 p-3">
                                    {/* Icon on the left */}
                                    <div className="flex-shrink-0">
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <method.icon className="w-6 h-6 text-primary" />
                                      </div>
                                    </div>
                                    
                                    {/* Content on the right */}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-base font-bold text-foreground mb-2">
                                        {method.name}
                                      </h4>
                                      <ul className="space-y-1.5">
                                        {method.description.map((desc, descIdx) => <li key={descIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-0.5">•</span>
                                            <span>{desc}</span>
                                          </li>)}
                                      </ul>
                                    </div>
                                  </div> : <>
                                    {/* Protection slide: top-bottom layout with image */}
                                    <div className="relative h-[120px] flex items-center justify-center overflow-hidden">
                                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                                      {method.image && <img src={method.image} alt={method.name} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500 relative z-10" loading="lazy" />}
                                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    
                                    {/* Method Details */}
                                    <div className="p-3 flex flex-col flex-1">
                                      <h4 className="text-lg font-bold text-foreground mb-2 text-center">
                                        {method.name}
                                      </h4>
                                      <ul className="space-y-1.5 flex-1">
                                        {method.description.map((desc, descIdx) => <li key={descIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-0.5">•</span>
                                            <span>{desc}</span>
                                          </li>)}
                                      </ul>
                                      {method.cost && <div className="flex justify-between text-xs text-muted-foreground border-t border-border/30 pt-2 mt-2">
                                          <span><strong>成本:</strong> {method.cost}</span>
                                          <span><strong>周期:</strong> {method.delivery}</span>
                                        </div>}
                                    </div>
                                  </>}
                              </div>
                            </div>)}
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>)}
            </CarouselContent>

            {/* Navigation buttons */}
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

          {/* Dots indicator with glow */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`h-2 rounded-full transition-all duration-300 ${current === index ? "bg-primary w-10 shadow-lg shadow-primary/50" : "bg-primary/30 w-2 hover:bg-primary/50"}`} aria-label={`跳转到第 ${index + 1} 张幻灯片`} aria-current={current === index ? "true" : undefined} />)}
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
    </section>;
};
