'use client'
import { Card } from "@/components/ui/card";
import { Cpu, Factory, Wind, Car, Home, Plane } from "lucide-react";

const applications = [
  { icon: Factory, title: "工业自动化", description: "精密制造、机器人、传送系统" },
  { icon: Wind, title: "暖通空调", description: "风机、泵、压缩机系统" },
  { icon: Car, title: "电动汽车", description: "驱动系统、辅助电机" },
  { icon: Plane, title: "航空航天", description: "轻量化动力系统" },
  { icon: Home, title: "智能家居", description: "家用电器、智能设备" },
  { icon: Cpu, title: "新能源", description: "储能系统、可再生能源" },
];

export const Applications = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-accent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            应用领域
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            广泛应用于多个行业的创新解决方案
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {applications.map((app, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 bg-card group"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: "var(--shadow-card)"
              }}
            >
              <div className="mb-6 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <app.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {app.title}
              </h3>
              <p className="text-muted-foreground">
                {app.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
