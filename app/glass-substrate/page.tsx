'use client'

import { motion } from "framer-motion";
import { Square } from "lucide-react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function GlassSubstratePage() {
  const router = useRouter();
  const pathname = usePathname();

  // 强制路由更新：确保路径正确匹配
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      // 如果 pathname 不正确，强制更新路由
      if (pathname !== '/glass-substrate' && currentPath === '/glass-substrate') {
        // 强制触发路由更新
        router.replace('/glass-substrate');
        return;
      }
      
      // 标准化路径：移除尾部斜杠，避免403错误和路径不一致
      if (currentPath !== '/glass-substrate' && currentPath.endsWith('/')) {
        const normalizedPath = currentPath.replace(/\/$/, '');
        if (normalizedPath === '/glass-substrate') {
          // 使用 replaceState 而不是 router.replace，避免在静态导出模式下出现问题
          window.history.replaceState(null, '', '/glass-substrate');
          // 触发路径更新事件，让 Header 组件知道路径变化
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    }
  }, [router, pathname]);

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
                  <Square className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    玻璃基板
                  </h1>
                </motion.div>
                <motion.p 
                  className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  玻璃基板技术介绍
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

