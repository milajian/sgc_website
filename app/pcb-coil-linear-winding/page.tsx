'use client'

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LinearMotorWindingPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                  直线电机绕组
                </h1>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  PCB线圈技术在直线电机绕组中的应用
                </p>
              </motion.div>
              
              <Card className="p-8 bg-background/50 border-primary/20">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">内容即将更新...</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

