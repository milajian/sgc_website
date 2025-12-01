'use client'
import { Card } from "@/components/ui/card";
import { Zap, TrendingUp, Leaf, Settings, Award, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "高功率密度",
    description: "紧凑的设计实现更高的功率输出，体积减小50%的同时保持强劲性能。",
  },
  {
    icon: TrendingUp,
    title: "优化效率",
    description: "消除齿槽转矩和涡流损耗，系统效率提升10-15%，达到IE4和IE5标准。",
  },
  {
    icon: Leaf,
    title: "可持续方案",
    description: "使用66%更少的铜材，运输排放降低30%，模块化设计便于维护和回收。",
  },
  {
    icon: Settings,
    title: "精密制造",
    description: "采用先进的PCB制造工艺，确保高一致性和可靠性，批量生产误差小于0.1mm。",
  },
  {
    icon: Award,
    title: "卓越性能",
    description: "低噪音运行，振动小，热管理优异，适合高转速和高频应用场景。",
  },
  {
    icon: Shield,
    title: "持久可靠",
    description: "可靠性是传统铁芯定子的10倍，使用寿命长，维护成本低。",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            核心优势
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            创新PCB定子技术带来的突破性改进
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 bg-gradient-accent"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
