'use client'
import { getImagePath } from "@/lib/image-path";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Feather, Zap, Droplet, DollarSign, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useCarouselAutoPlay } from "@/hooks/useCarouselAutoPlay";
import { useRef, useEffect } from "react";

interface Advantage {
  title: string;
  description: string;
  highlights: string[];
  icon: typeof Feather;
  gradient: string;
  imagePlaceholder: string;
}

const advantages: Advantage[] = [
  {
    title: "轻量化",
    description: "对比传统径向电机，PCB电机在同等功率下实现显著的尺寸和重量优势",
    highlights: [
      "轴向长度减少 60%",
      "重量减轻 60-80%",
      "同等体积下功率提升约 30%",
      "轴向尺寸：PCB电机 87.5mm vs 传统电机 200mm",
      "重量对比：PCB电机 11kg vs 传统电机 20kg"
    ],
    icon: Feather,
    gradient: "from-cyan-500/20 via-primary/10 to-accent/20",
    imagePlaceholder: "占位图：轻量化对比图 - 显示传统径向电机与PCB电机的尺寸和重量对比"
  },
  {
    title: "功率密度高",
    description: "PCB定子采用创新设计，铜满率远超传统圆线和扁线方案",
    highlights: [
      "PCB定子铜满率可达 35%-60%",
      "圆线绕组铜满率：30-40%",
      "扁线绕组铜满率：60%",
      "设计灵活 + 高可制造性 + 工艺成熟",
      "多种散热工艺，提升整体散热能力，在等热条件下功率密度提升"
    ],
    icon: Zap,
    gradient: "from-blue-500/20 via-primary/10 to-cyan-500/20",
    imagePlaceholder: "占位图：铜满率对比图 - 显示圆线/扁线/PCB定子横截面对比及铜满率数据"
  },
  {
    title: "防水性好",
    description: "PCB定子独特的结构设计，支持浸液冷却和微流道散热技术",
    highlights: [
      "PCB定子可浸液设计",
      "可加入微流道增强散热能力",
      "根本解决IP68实现方式",
      "增强散热能力的同时提升防护等级",
      "适用于恶劣环境和高可靠性应用"
    ],
    icon: Droplet,
    gradient: "from-teal-500/20 via-primary/10 to-blue-500/20",
    imagePlaceholder: "占位图：防水设计示意图 - 显示PCB定子浸液设计和微流道结构"
  },
  {
    title: "加工成本低",
    description: "相比传统轴向通磁电机，PCB电机方案具有显著的制造成本优势",
    highlights: [
      "自动化定子绕线，如Yasa几亿美金自动定子线",
      "传统铁芯压铸工艺复杂，PCB方案更简单",
      "规模化生产成本优势明显",
      "减少人工成本，提高生产效率",
      "标准化PCB制造工艺，质量稳定可靠"
    ],
    icon: DollarSign,
    gradient: "from-emerald-500/20 via-primary/10 to-teal-500/20",
    imagePlaceholder: "占位图：自动化生产图 - 显示Yasa自动化生产线和传统轴向电机制造对比"
  }
];

export const PCBMotorAdvantages = () => {
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
    <section id="pcb-motor-advantages" className="py-16 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/10 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PCB电机优势
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              突破传统电机限制，引领电机技术革新
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
          <div className="relative max-w-6xl mx-auto">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="h-full items-stretch">
                {advantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <CarouselItem key={index} className="h-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                      >
                        <Card 
                          ref={(el) => {
                            cardRefs.current[index] = el;
                          }}
                          className={`h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br ${advantage.gradient} backdrop-blur-sm overflow-hidden relative group hover:border-primary/40 transition-all duration-500`}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shimmer" />
                          </div>

                          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 flex-1 items-center">
                            {/* Left: Content */}
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="flex flex-col justify-center space-y-6"
                            >
                              {/* Icon & Title */}
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                                  <Icon className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                                  {advantage.title}
                                </h3>
                              </div>

                              {/* Description */}
                              <p className="text-lg text-muted-foreground leading-relaxed">
                                {advantage.description}
                              </p>

                              {/* Highlights */}
                              <div className="space-y-3">
                                {advantage.highlights.map((highlight, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                                    className="flex items-start gap-3 group/item"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-foreground/90 leading-relaxed flex-1">
                                      {highlight}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            {/* Right: Image */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                              className="flex items-center justify-center"
                            >
                              {index === 1 ? (
                                /* 功率密度高 - 特殊布局 */
                                <div className="relative w-full max-w-md flex flex-col items-center space-y-6">
                                  {/* 顶部：组合图片 */}
                                  <div className="relative w-full">
                                    <div className="relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden">
                                      <img 
                                        src={getImagePath("/assets/gonglvmidu.png")} 
                                        alt="功率密度对比图" 
                                        className="w-full h-auto object-contain"
                                        loading="lazy"
                                      />
                                    </div>
                                  </div>

                                  {/* 中间：三个文字标签 */}
                                  <div className="flex justify-around w-full gap-2">
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.5 }}
                                      className="text-center flex-1"
                                    >
                                      <p className="text-sm md:text-base font-medium text-foreground">圆线横截</p>
                                    </motion.div>
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.6 }}
                                      className="text-center flex-1"
                                    >
                                      <p className="text-sm md:text-base font-medium text-foreground">扁线横截</p>
                                    </motion.div>
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.7 }}
                                      className="text-center flex-1"
                                    >
                                      <p className="text-sm md:text-base font-medium text-foreground">PCB定子槽横截面</p>
                                    </motion.div>
                                  </div>

                                  {/* 底部：铜满率对比 */}
                                  <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full py-6 group/copper-rate">
                                    {/* SVG 圆弧线容器 - 使用绝对定位覆盖整个区域 */}
                                    <svg 
                                      className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 group-hover/copper-rate:opacity-100" 
                                      style={{ height: 'calc(100% + 60px)', top: '-30px' }}
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                    >
                                      <defs>
                                        {/* 线条渐变定义 */}
                                        <linearGradient id="lineGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                                          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
                                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                                        </linearGradient>
                                        <linearGradient id="lineGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
                                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                                          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
                                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                                        </linearGradient>
                                        {/* 线条阴影滤镜 */}
                                        <filter id="lineGlow">
                                          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                                          <feMerge>
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                          </feMerge>
                                        </filter>
                                      </defs>
                                      
                                      {/* 左侧上方线 - 从圆圈左侧偏上起笔，向左上方延伸 */}
                                      <path
                                        d="M 42 45 Q 35 35, 12 25"
                                        stroke="url(#lineGradientLeft)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeOpacity="0.6"
                                        strokeLinecap="round"
                                        filter="url(#lineGlow)"
                                        className="transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                      />
                                      {/* 左侧下方线 - 从圆圈左侧偏下起笔，向左下方延伸 */}
                                      <path
                                        d="M 42 55 Q 35 65, 12 75"
                                        stroke="url(#lineGradientLeft)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeOpacity="0.6"
                                        strokeLinecap="round"
                                        filter="url(#lineGlow)"
                                        className="transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                      />
                                      {/* 右侧上方线 - 从圆圈右侧偏上起笔，向右上方延伸（对称） */}
                                      <path
                                        d="M 58 45 Q 65 35, 88 25"
                                        stroke="url(#lineGradientRight)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeOpacity="0.6"
                                        strokeLinecap="round"
                                        filter="url(#lineGlow)"
                                        className="transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                      />
                                      {/* 右侧下方线 - 从圆圈右侧偏下起笔，向右下方延伸（对称） */}
                                      <path
                                        d="M 58 55 Q 65 65, 88 75"
                                        stroke="url(#lineGradientRight)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        strokeOpacity="0.6"
                                        strokeLinecap="round"
                                        filter="url(#lineGlow)"
                                        className="transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                      />
                                    </svg>

                                    {/* 左侧：圆线百分比 */}
                                    <motion.div
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.8 }}
                                      className="text-center relative z-10 group/item-left"
                                    >
                                      <p className="text-sm md:text-base font-medium text-foreground mb-1 group-hover/item-left:text-primary transition-colors">圆线</p>
                                      <p className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover/item-left:scale-105 transition-transform duration-300">30-40%</p>
                                    </motion.div>

                                    {/* 中间：铜满率圆圈 */}
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 0.9 }}
                                      className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 relative z-10 transition-all duration-300 hover:scale-105"
                                    >
                                      <p className="text-sm md:text-base lg:text-lg font-bold text-primary-foreground text-center">铜满率</p>
                                    </motion.div>

                                    {/* 右侧：扁线百分比 */}
                                    <motion.div
                                      initial={{ opacity: 0, x: 20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: 1.0 }}
                                      className="text-center relative z-10 group/item-right"
                                    >
                                      <p className="text-sm md:text-base font-medium text-foreground mb-1 group-hover/item-right:text-primary transition-colors">扁线</p>
                                      <p className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover/item-right:scale-105 transition-transform duration-300">60%</p>
                                    </motion.div>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-full aspect-square max-w-md">
                                  {/* Glow effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl group-hover:scale-110 transition-transform duration-700" />
                                  
                                  {/* Image or Placeholder */}
                                  <div className="relative w-full h-full rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm flex items-center justify-center p-8 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-105 overflow-hidden">
                                    {index === 0 ? (
                                      /* 轻量化 - 两个图片左右布局 */
                                      <div className="relative w-full max-w-md flex flex-row items-stretch gap-4 h-full">
                                        {/* 第一个图片：径向电机 */}
                                        <div className="relative flex-1 flex flex-col items-center justify-between">
                                          {/* 电机图片 */}
                                          <div className="relative w-full flex-1 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden flex items-center justify-center min-h-0 p-4">
                                            <img 
                                              src={getImagePath("/assets/qinglianghua1.png")} 
                                              alt="径向电机" 
                                              className="w-full h-full object-contain"
                                              loading="lazy"
                                            />
                                          </div>
                                          
                                          {/* 标题横幅 */}
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                            className="w-full mt-3"
                                          >
                                            <div className="bg-accent rounded-lg py-2 px-4">
                                              <p className="text-xs md:text-sm font-medium text-accent-foreground text-center">径向电机</p>
                                            </div>
                                          </motion.div>
                                          
                                          {/* 规格信息 */}
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.6 }}
                                            className="w-full mt-3 space-y-2"
                                          >
                                            {/* 轴向尺寸 */}
                                            <div className="flex items-center justify-between border-b border-border/50 pb-1">
                                              <span className="text-xs md:text-sm text-muted-foreground">轴向尺寸</span>
                                              <span className="text-xs md:text-sm font-medium text-foreground">200mm</span>
                                            </div>
                                            {/* 重量 */}
                                            <div className="flex items-center justify-between border-b border-border/50 pb-1">
                                              <span className="text-xs md:text-sm text-muted-foreground">重量</span>
                                              <span className="text-xs md:text-sm font-medium text-foreground">20kg</span>
                                            </div>
                                          </motion.div>
                                        </div>

                                        {/* 第二个图片：PCB电机 */}
                                        <div className="relative flex-1 flex flex-col items-center justify-between">
                                          {/* 电机图片 */}
                                          <div className="relative w-full flex-1 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden flex items-center justify-center min-h-0 p-4">
                                            <img 
                                              src={getImagePath("/assets/qinglianghua2.png")} 
                                              alt="PCB电机" 
                                              className="w-full h-full object-contain"
                                              loading="lazy"
                                            />
                                          </div>
                                          
                                          {/* 标题横幅 */}
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.7 }}
                                            className="w-full mt-3"
                                          >
                                            <div className="bg-accent rounded-lg py-2 px-4">
                                              <p className="text-xs md:text-sm font-medium text-accent-foreground text-center">PCB电机</p>
                                            </div>
                                          </motion.div>
                                          
                                          {/* 规格信息 */}
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.8 }}
                                            className="w-full mt-3 space-y-2"
                                          >
                                            {/* 轴向尺寸 */}
                                            <div className="flex items-center justify-between border-b border-border/50 pb-1">
                                              <span className="text-xs md:text-sm text-muted-foreground">轴向尺寸</span>
                                              <span className="text-xs md:text-sm font-medium text-foreground">87.5mm</span>
                                            </div>
                                            {/* 重量 */}
                                            <div className="flex items-center justify-between border-b border-border/50 pb-1">
                                              <span className="text-xs md:text-sm text-muted-foreground">重量</span>
                                              <span className="text-xs md:text-sm font-medium text-foreground">11kg</span>
                                            </div>
                                          </motion.div>
                                        </div>
                                      </div>
                                    ) : index === 2 ? (
                                      <img 
                                        src={getImagePath("/assets/waterproof-demonstration.png")} 
                                        alt="PCB定子防水性展示" 
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                      />
                                    ) : index === 3 ? (
                                      /* 加工成本低 - 两个图片左右布局 */
                                      <div className="relative w-full max-w-md flex flex-row items-start gap-4">
                                        {/* 第一个图片：Yasa */}
                                        <div className="relative flex-1 flex flex-col items-center">
                                          <div className="relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden">
                                            <img 
                                              src={getImagePath("/assets/yasa.png")} 
                                              alt="Yasa自动化生产线" 
                                              className="w-full h-auto object-contain"
                                              loading="lazy"
                                            />
                                          </div>
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                            className="text-center mt-3"
                                          >
                                            <p className="text-xs md:text-sm font-medium text-foreground">Yasa 几亿美金自动定子线</p>
                                          </motion.div>
                                        </div>

                                        {/* 第二个图片：轴向电机铁芯压铸工艺 */}
                                        <div className="relative flex-1 flex flex-col items-center">
                                          <div className="relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden">
                                            <img 
                                              src={getImagePath("/assets/zhouxiang.png")} 
                                              alt="轴向电机铁芯压铸工艺" 
                                              className="w-full h-auto object-contain"
                                              loading="lazy"
                                            />
                                          </div>
                                          <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.6 }}
                                            className="text-center mt-3"
                                          >
                                            <p className="text-xs md:text-sm font-medium text-foreground">和轴向电机铁芯压铸工艺难</p>
                                          </motion.div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-center space-y-4">
                                        <Icon className="w-24 h-24 mx-auto text-primary/40 group-hover:text-primary/60 transition-colors" />
                                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                                          {advantage.imagePlaceholder}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Navigation Buttons */}
              <Button 
                onClick={scrollPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
                variant="ghost"
              >
                <ChevronLeft strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
              </Button>
              <Button 
                onClick={scrollNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0" 
                variant="ghost"
              >
                <ChevronRight strokeWidth={3} className="h-12 w-12 transition-colors text-[#2dc2b3]" />
              </Button>
            </Carousel>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {advantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "bg-primary w-10 shadow-lg shadow-primary/50"
                      : "bg-primary/30 w-2 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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
