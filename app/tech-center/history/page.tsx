'use client'

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, Award, Target } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* 页面标题 */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  历史发展
                </h1>
              </div>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                了解明阳电路技术中心的发展历程与重要里程碑
              </p>
            </motion.div>

            {/* 占位内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-sm p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                      <Clock className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      内容即将上线
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg">
                      我们正在准备精彩的历史发展内容，敬请期待
                    </p>
                  </div>

                  {/* 占位卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">发展历程</h3>
                        <p className="text-sm text-muted-foreground">技术中心的成长轨迹</p>
                      </div>
                    </Card>

                    <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                          <Award className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">重要成就</h3>
                        <p className="text-sm text-muted-foreground">里程碑式的重要成果</p>
                      </div>
                    </Card>

                    <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">未来展望</h3>
                        <p className="text-sm text-muted-foreground">技术中心的发展方向</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}


