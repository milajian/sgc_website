'use client'
import { useState, useEffect } from "react";
import { getImagePath } from "@/lib/image-path";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const achievements = [{
  name: "芯片嵌入式PCB解决方案",
  description: "集成SiC芯片的先进PCB嵌入技术",
  highlights: ["降低热阻，更短散热路径", "更高的集成度、功率密度、散热效率", "降低系统复杂性", "更少组件，连接和预定断点", "更高产品稳定性和寿命"],
  image: getImagePath("/assets/embedded PCB.png")
}, {
  name: "轴向电机解决方案",
  description: "革命性的PCB定子轴向电机技术",
  highlights: ["适用于工业电机（风机、水泵等）", "机器人（仿生机器人、机械臂）", "无人机，发电机", "新能源汽车驱动", "交通运输与船舶应用"],
  image: getImagePath("/assets/PCB solution.png")
}, {
  name: "埋嵌工艺产品",
  description: "",
  highlights: [],
  image: getImagePath("/assets/incubation-embedded-process.png")
}, {
  name: "设计制造与散热工艺",
  description: "全流程技术支持与热管理方案",
  highlights: ["更小尺寸与重量", "更少铜耗与碳排放", "降低功耗", "有/无磁芯设计", "加工成本降低"],
  image: getImagePath("/assets/design1.png")
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
          <div className="text-center mb-6">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FlaskConical className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                技术中心孵化成果
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              前沿技术创新与产业化应用
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent>
              {achievements.map((achievement, index) => <CarouselItem key={index}>
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 backdrop-blur-sm overflow-hidden relative group hover:border-primary/30 transition-all duration-700 h-[420px] md:h-[400px] lg:h-[480px]">
                  {/* Shimmer effect - always active */}
                  <div className="absolute inset-0 opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent shimmer-effect" />
                  </div>

                  {index === 2 ? (
                    /* 埋嵌工艺产品 - 始终上下布局 */
                    <div className="flex flex-col p-4 md:p-6 lg:p-8 relative w-full h-full overflow-hidden">
                      {/* 标题在上 */}
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-4 flex-shrink-0"
                      >
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                          {achievement.name}
                        </h3>
                      </motion.div>

                      {/* 图片在下 - 自适应容器 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex-1 flex items-center justify-center min-h-0"
                      >
                        <div className="relative w-fit mx-auto">
                          {/* Glowing backdrop */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-1000" />
                          
                          {/* Image container - 自适应图片尺寸 */}
                          <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border-2 border-primary/20 backdrop-blur-sm bg-background/5 transition-all duration-700">
                            {/* Inner border glow */}
                            <div className="absolute inset-2 border border-primary/10 rounded-lg lg:rounded-xl pointer-events-none" />
                            
                            <img 
                              src={achievement.image} 
                              alt={achievement.name} 
                              className="max-h-[340px] md:max-h-[300px] lg:max-h-[380px] w-auto object-contain p-4"
                              style={{ imageRendering: 'crisp-edges' }}
                              loading="lazy"
                            />
                          </div>

                          {/* Decorative dots in corners */}
                          <div className="hidden md:block absolute -top-1 -left-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary/40" />
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    /* 其他卡片 - 响应式布局：小屏上下，中屏及以上左右 */
                    <div className="flex flex-col justify-center md:grid md:grid-cols-[2fr_3fr] gap-3 md:gap-4 lg:gap-8 p-4 md:p-5 lg:p-10 relative items-center w-full h-full">
                      {/* Text content */}
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center items-center md:items-start space-y-2 md:space-y-2 lg:space-y-4 md:ml-4 lg:ml-8 w-full"
                      >
                        <div className="space-y-1 md:space-y-1.5 lg:space-y-3 text-center md:text-left w-full">
                          <h3 className="text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight">
                            {achievement.name}
                          </h3>
                          {achievement.description && (
                            <p className="text-xs md:text-sm lg:text-lg text-muted-foreground leading-relaxed">
                              {achievement.description}
                            </p>
                          )}
                        </div>

                        {/* Highlights */}
                        {achievement.highlights.length > 0 && (
                          <div className="space-y-0.5 md:space-y-1 lg:space-y-2 w-full flex flex-col items-center md:items-start">
                            {achievement.highlights.map((highlight, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                                className="flex items-start gap-1.5 md:gap-2 lg:gap-3 group/item justify-center md:justify-start"
                              >
                                <div className="mt-1 md:mt-1 lg:mt-1.5 flex-shrink-0">
                                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 rounded-full bg-accent relative">
                                    <div className="absolute inset-0 rounded-full bg-accent/60 animate-ping opacity-40" />
                                  </div>
                                </div>
                                <p className="text-xs md:text-sm lg:text-base text-foreground/90 leading-snug lg:leading-relaxed group-hover/item:text-foreground transition-colors text-center md:text-left">
                                  {highlight}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      {/* Visual element - 自适应图片容器 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex items-center justify-center w-full md:h-full"
                      >
                        <div className="relative w-fit mx-auto">
                          {/* Glowing backdrop */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl lg:rounded-2xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-1000" />
                          
                          {/* Image container - 自适应图片尺寸 */}
                          <div className="relative rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden border-2 border-primary/20 backdrop-blur-sm bg-background/5 transition-all duration-700">
                            {/* Inner border glow */}
                            <div className="absolute inset-1.5 md:inset-2 border border-primary/10 rounded-md md:rounded-lg lg:rounded-xl pointer-events-none" />
                            
                            <img 
                              src={achievement.image} 
                              alt={achievement.name} 
                              className="max-h-[140px] md:max-h-[260px] lg:max-h-[340px] w-auto object-contain p-3 md:p-4"
                              style={{ imageRendering: 'crisp-edges' }}
                              loading="lazy"
                            />
                          </div>

                          {/* Decorative dots in corners */}
                          <div className="hidden md:block absolute -top-1 -left-1 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -bottom-1 -left-1 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary/40" />
                          <div className="hidden md:block absolute -bottom-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primary/40" />
                        </div>
                      </motion.div>
                    </div>
                  )}
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
