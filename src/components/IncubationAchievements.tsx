import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import chipEmbedded from "@/assets/incubation-chip-embedded-new.png";
import motor from "@/assets/incubation-motor-applications-new.png";
import embeddedProcess from "@/assets/incubation-embedded-process.png";
import designThermal from "@/assets/incubation-design-thermal.png";
const achievements = [{
  name: "芯片嵌入式PCB解决方案",
  description: "集成SiC芯片的先进PCB嵌入技术",
  highlights: ["降低热阻，更短散热路径", "更高的集成度、功率密度、散热效率", "降低系统复杂性", "更少组件，连接和预定断点", "更高产品稳定性和寿命"],
  image: chipEmbedded
}, {
  name: "轴向电机解决方案",
  description: "革命性的PCB定子轴向电机技术",
  highlights: ["适用于工业电机（风机、水泵等）", "机器人（仿生机器人、机械臂）", "无人机，发电机", "新能源汽车驱动", "交通运输与船舶应用"],
  image: motor
}, {
  name: "埋嵌工艺产品",
  description: "先进的埋嵌工艺技术平台",
  highlights: ["更小尺寸与重量", "更少铜耗与碳排放", "降低功耗", "有/无磁芯设计灵活性", "加工成本降低"],
  image: embeddedProcess
}, {
  name: "设计制造与散热工艺",
  description: "全流程技术支持与热管理方案",
  highlights: ["更小尺寸与重量", "更少铜耗与碳排放", "降低功耗", "有/无磁芯设计", "加工成本降低"],
  image: designThermal
}];
export const IncubationAchievements = () => {
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
  return <section id="incubation-achievements" className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Subtle circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative inline-block">
              技术中心孵化成果
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground">
              前沿技术创新与产业化应用
            </p>
          </motion.div>

          <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent>
              {achievements.map((achievement, index) => <CarouselItem key={index}>
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 backdrop-blur-sm overflow-hidden relative group hover:border-primary/30 transition-all duration-700">
                  {/* Shimmer effect - always active */}
                  <div className="absolute inset-0 opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent shimmer-effect" />
                  </div>

                    <div className={`grid ${index === 1 ? 'md:grid-cols-[5fr_7fr]' : index === 2 ? 'md:grid-cols-[4fr_8fr]' : index === 3 ? 'md:grid-cols-[5fr_7fr]' : 'md:grid-cols-2'} gap-8 p-8 md:p-12 relative items-center w-full`}>
                      {/* Left side - Text content */}
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center space-y-6 ml-12"
                      >
                        <div className="space-y-4">
                          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                            {achievement.name}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4">
                          {achievement.highlights.map((highlight, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="mt-1.5">
                                <div className="w-2 h-2 rounded-full bg-primary/80 relative">
                                  <div className="absolute inset-0 rounded-full bg-primary/60 animate-ping opacity-40" />
                                </div>
                              </div>
                              <p className="text-foreground/90 leading-relaxed group-hover/item:text-foreground transition-colors">
                                {highlight}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Right side - Visual element */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex items-center justify-center"
                      >
                        <div className={`relative w-full ${index === 2 ? 'max-w-3xl' : index === 3 ? 'max-w-xl' : index === 1 ? 'max-w-xl' : 'max-w-md'}`}>
                          {/* Glowing backdrop - softer and slower */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl blur-3xl group-hover:scale-105 transition-transform duration-1000" />
                          
                          {/* Image container with double border effect - no animation */}
                          <div className={`relative w-fit rounded-2xl overflow-hidden border-2 border-primary/20 backdrop-blur-sm bg-background/5 transition-all duration-700`}>
                            {/* Inner border glow */}
                            <div className="absolute inset-2 border border-primary/10 rounded-xl pointer-events-none" />
                            
                            <img 
                              src={achievement.image} 
                              alt={achievement.name} 
                              className="w-full h-auto object-contain p-6"
                              style={{ imageRendering: 'crisp-edges' }}
                              loading="lazy"
                            />
                          </div>

                          {/* Decorative dots in corners - no animation */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary/40" />
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            {/* Custom triangle navigation buttons */}
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
            {achievements.map((_, index) => (
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
        @keyframes shimmer-effect {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-effect {
          animation: shimmer-effect 2s infinite linear;
        }
      `}</style>
    </section>;
};