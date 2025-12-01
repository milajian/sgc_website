'use client'
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
import { Factory } from "lucide-react";
import { Card } from "@/components/ui/card";
const processSteps = [
  {
    title: "线路蚀刻",
    description: "精密线路加工",
    items: ["蚀刻均匀性", "蚀刻因子", "线路补偿", "线宽/线距能力"],
    image: getImagePath("/assets/production-etching.png")
  },
  {
    title: "压合",
    description: "多层板压合",
    items: ["压合填胶", "压合偏位控制", "板厚均匀性"],
    image: getImagePath("/assets/production-lamination.png")
  },
  {
    title: "钻孔",
    description: "机械钻孔",
    items: ["孔壁质量", "孔位精度"],
    image: getImagePath("/assets/production-drilling.png")
  },
  {
    title: "激光钻孔、填孔",
    description: "激光精密加工",
    items: ["高深径比激光钻孔", "激光盲孔填孔"],
    image: getImagePath("/assets/production-laser.png")
  },
  {
    title: "测试",
    description: "全面质量检测",
    items: ["开短路测试", "电感测试", "耐电压测试", "可靠性测试"],
    image: getImagePath("/assets/production-testing.png")
  }
];

export const PCBStatorProductionTech = () => {
  return (
    <section id="pcb-stator-production-tech" className="py-20 bg-background relative overflow-hidden section-fade-top section-fade-bottom">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.6;
          }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Factory className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PCB定子生产技术
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm relative overflow-visible px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:pt-3 lg:pb-12">
            
            {/* ===== 小屏幕：网格布局 ===== */}
            <div className="lg:hidden">
              {/* 中心标题 */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/30 mx-auto">
                  <div className="w-24 h-24 rounded-full bg-background flex flex-col items-center justify-center text-center p-2 border-4 border-primary/20">
                    <p className="text-xs font-bold text-foreground leading-tight">
                      轴向电机<br />
                      PCB定子
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">
                      生产工艺
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 网格卡片 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {processSteps.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Card className="p-3 bg-background/95 border-primary/30 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent" />
                            </div>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {item.title}
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {item.items.map((feature, featureIdx) => (
                              <li key={featureIdx} className="flex items-start gap-1.5 text-xs">
                                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                <span className="text-muted-foreground leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary/20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ===== 大屏幕：环形布局 ===== */}
            <div className="hidden lg:block relative w-full max-w-5xl mx-auto pt-8" style={{ minHeight: '420px' }}>
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line x1="50%" y1="60%" x2="12%" y2="72%" stroke="url(#lineGradient)" strokeWidth="2.5" />
                <line x1="50%" y1="60%" x2="12%" y2="22%" stroke="url(#lineGradient)" strokeWidth="2.5" />
                <line x1="50%" y1="60%" x2="50%" y2="12%" stroke="url(#lineGradient)" strokeWidth="2.5" />
                <line x1="50%" y1="60%" x2="88%" y2="22%" stroke="url(#lineGradient)" strokeWidth="2.5" />
                <line x1="50%" y1="60%" x2="88%" y2="72%" stroke="url(#lineGradient)" strokeWidth="2.5" />
              </svg>
              
              {/* Center Circle */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40 h-40">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl pulse-glow" />
                </div>
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
                  <div className="w-36 h-36 rounded-full bg-background flex flex-col items-center justify-center text-center p-3 border-4 border-primary/20">
                    <p className="text-sm font-bold text-foreground leading-tight">
                      轴向电机<br />
                      PCB定子
                    </p>
                    <p className="text-base font-bold text-primary mt-1">
                      生产工艺
                    </p>
                  </div>
                </div>
              </div>

              {/* Radial Process Cards */}
              {processSteps.map((item, idx) => {
                const positions = [
                  { top: '55%', left: '2%' },
                  { top: '18%', left: '2%' },
                  { top: '2%', left: 'calc(50% - 7rem)' },
                  { top: '18%', right: '2%' },
                  { top: '55%', right: '2%' }
                ];

                return (
                  <motion.div
                    key={idx}
                    className="absolute"
                    style={positions[idx]}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  >
                    <Card className="w-56 p-3 bg-background/95 border-primary/30 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 group overflow-visible">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent" />
                            </div>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {item.title}
                            </h4>
                          </div>
                          <ul className="space-y-1.5">
                            {item.items.map((feature, featureIdx) => (
                              <li key={featureIdx} className="flex items-start gap-1.5 text-xs">
                                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                <span className="text-muted-foreground leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary/20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
