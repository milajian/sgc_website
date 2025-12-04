'use client'

import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

export default function PlanarMotorWindingPage() {
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
              {/* 标题区域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  <LayoutGrid className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    平面电机绕组
                  </h1>
                </motion.div>
                <motion.p 
                  className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  PCB线圈技术在平面电机绕组中的应用
                </motion.p>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>

              {/* 占位section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-background/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-12 text-center"
              >
                <p className="text-lg text-muted-foreground">
                  内容即将更新...
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

