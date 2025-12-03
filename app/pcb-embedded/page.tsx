'use client'

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
import { Layers } from "lucide-react";

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

export default function PCBEmbeddedPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
          {/* Subtle circuit background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-7xl mx-auto">
              {/* Page Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <motion.div 
                  className="flex items-center justify-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Layers className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    PCB 埋嵌
                  </h1>
                </motion.div>
                <motion.p 
                  className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  先进的PCB埋嵌工艺技术，实现更高集成度和性能
                </motion.p>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>

              {/* 埋嵌工艺产品 - 优化展示 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2">
                    埋嵌工艺产品
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    采用先进的PCB埋嵌技术，将电子元件直接嵌入PCB板内，实现更高的集成度和可靠性
                  </p>
                </motion.div>

                {/* 产品网格布局 - 使用Card组件优化 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {embeddedProcessItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 backdrop-blur-sm overflow-hidden relative group hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shimmer-effect" />
                        </div>

                        {/* 图片容器 */}
                        <div className="relative w-full h-48 md:h-56 mb-4 flex-shrink-0 p-4">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                          
                          {/* Image container */}
                          <div className="relative w-full h-full rounded-2xl border border-accent/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm flex items-center justify-center p-4 group-hover:border-accent/50 transition-all duration-300 group-hover:scale-105 overflow-hidden shadow-md shadow-accent/10">
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
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          className="px-4 pb-4 flex-1 flex items-center justify-center"
                        >
                          <p className="text-base md:text-lg font-semibold text-foreground text-center">
                            {item.label}
                          </p>
                        </motion.div>
                      </Card>
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
        </section>
      </main>
    </div>
  );
}

