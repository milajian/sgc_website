'use client'
import { getImagePath } from "@/lib/image-path";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCarouselAutoPlay } from "@/hooks/useCarouselAutoPlay";
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

// 分离"埋嵌工艺产品"到独立变量
const embeddedProcessProduct = achievements[2];
// Carousel 中只包含其他3个卡片
const carouselAchievements = achievements.filter((_, index) => index !== 2);

// 埋嵌工艺产品图片和文字数据
const embeddedProcessItems = [
  {
    image: getImagePath("/assets/maiqian1.png"),
    label: "埋嵌SiC功率芯片"
  },
  {
    image: getImagePath("/assets/maiqian2.png"),
    label: "埋嵌分立式电容"
  },
  {
    image: getImagePath("/assets/maiqian3.png"),
    label: "埋嵌分立式电阻"
  },
  {
    image: getImagePath("/assets/maiqian4.png"),
    label: "散热铜排"
  },
  {
    image: getImagePath("/assets/maiqian5.png"),
    label: "埋嵌薄膜式电容"
  },
  {
    image: getImagePath("/assets/maiqian6.png"),
    label: "埋嵌薄膜式电阻"
  }
];
export const IncubationAchievements = () => {
  const { api, setApi, current, scrollPrev, scrollNext, scrollTo } = useCarouselAutoPlay({
    autoPlayInterval: 4200,
    restoreDelay: 5000
  });
  return <section id="incubation-achievements" className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient">
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
              {carouselAchievements.map((achievement, index) => <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 backdrop-blur-sm overflow-hidden relative group hover:border-primary/30 transition-all duration-500">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shimmer-effect" />
                    </div>

                    {/* 其他卡片 - 参考 PCBMotorAdvantages 的布局 */}
                    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                      {/* Left: Content */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center space-y-6"
                      >
                        {/* Title */}
                        <div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
                            {achievement.name}
                          </h3>
                          {achievement.description && (
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              {achievement.description}
                            </p>
                          )}
                        </div>

                        {/* Highlights */}
                        {achievement.highlights.length > 0 && (
                          <div className="space-y-3">
                            {achievement.highlights.map((highlight, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 group-hover/item:scale-150 transition-transform relative">
                                  <div className="absolute inset-0 rounded-full bg-accent/60 animate-ping opacity-40" />
                                </div>
                                <span className="text-foreground/90 leading-relaxed flex-1">
                                  {highlight}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      {/* Right: Image */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center"
                      >
                        <div className="relative w-full aspect-square max-w-md">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl group-hover:scale-110 transition-transform duration-700" />
                          
                          {/* Image container */}
                          <div className="relative w-full h-full rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm flex items-center justify-center p-8 group-hover:border-accent/60 transition-all duration-500 group-hover:scale-105 overflow-hidden shadow-lg shadow-accent/20">
                            <img 
                              src={achievement.image} 
                              alt={achievement.name} 
                              className="w-full h-full object-contain"
                              style={{ imageRendering: 'crisp-edges' }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>)}
            </CarouselContent>
            {/* Custom triangle navigation buttons */}
            <Button onClick={scrollPrev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="上一张幻灯片">
              <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
            <Button onClick={scrollNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" variant="ghost" aria-label="下一张幻灯片">
              <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
            </Button>
          </Carousel>

          {/* Dots indicator with glow */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselAchievements.map((_, index) => (
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

          {/* 埋嵌工艺产品 - 独立展示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-col items-center"
          >
            {/* 标题在上 */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {embeddedProcessProduct.name}
              </h3>
            </motion.div>

            {/* 图片网格布局 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-0 w-full max-w-5xl items-stretch">
              {embeddedProcessItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center group h-full"
                >
                  {/* 图片容器 */}
                  <div className="relative w-full h-40 md:h-48 mb-1 flex-shrink-0">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                    
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-2xl border border-accent/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm flex items-center justify-center p-0 group-hover:border-accent/50 transition-all duration-300 group-hover:scale-105 overflow-hidden shadow-md shadow-accent/10">
                      <img 
                        src={item.image} 
                        alt={item.label} 
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'crisp-edges' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* 文字标签 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="text-sm md:text-base font-medium text-foreground text-center h-12 md:h-14 flex items-center justify-center"
                  >
                    {item.label}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
        .shimmer-effect {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>;
};
