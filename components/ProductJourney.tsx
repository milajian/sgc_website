'use client'
import { motion } from "framer-motion";
import { Wrench, Package, TrendingUp, Zap, Users, FlaskConical, Handshake, Lightbulb, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
const manufacturingTimeline = [{
  period: "20.10–21.02",
  title: "产品开发",
  achievements: ["解决压合次数", "解决板厚公差", "可控制阻抗值"],
  icon: Wrench
}, {
  period: "21.03–21.07",
  title: "打样",
  achievements: ["解决压合层偏问题", "进一步降低阻值公差", "提升阻值良率"],
  icon: Package
}, {
  period: "21.08–21.11",
  title: "小批量",
  achievements: ["提升整体良率", "缩短制作周期"],
  icon: TrendingUp
}, {
  period: "22.03–至今",
  title: "批量",
  achievements: ["阻值良率可达到100%", "制作周期进一步缩短"],
  icon: Zap
}];
const designMilestones = [{
  period: "25.01",
  title: "自主方案设计",
  points: ["为客户提供设计方案", "针对初稿进行电磁及热仿真和定子测试"],
  icon: Lightbulb
}, {
  period: "25.03",
  title: "联合开发",
  points: ["与头部车厂 / 机器人公司联合开发"],
  icon: Handshake
}, {
  period: "25.05",
  title: "联合实验室",
  points: ["与高校团队建立电机仿真联合实验室"],
  icon: FlaskConical
}, {
  period: "25.7–至今",
  title: "多用户打样验证",
  points: ["与超过20家客户进行打样验证，覆盖多个领域"],
  icon: Users
}];
export const ProductJourney = () => {
  return <section id="product-journey" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzJiZDljMyIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }}>
              <Map className="w-8 h-8 text-primary" />
              <h2 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))'
                }}
              >
                PCB电机产品历程
              </h2>
            </motion.div>
            <motion.p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              5年进阶，明阳电路实现 PCB 定子从制造向方案设计的专精深入
            </motion.p>
            <motion.div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" initial={{
            width: 0
          }} whileInView={{
            width: 96
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} />
          </div>

          {/* Manufacturing Timeline */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="text-white px-6 py-2 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30">
                PCB定子制造
              </div>
            </div>

            <div className="relative">
              {/* Timeline connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 relative z-10">
                {manufacturingTimeline.map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }}>
                    <Card className="p-6 h-full bg-gradient-to-br from-card to-muted/30 hover:shadow-xl hover:scale-105 transition-all border-primary/20 group min-h-[200px]">
                      <div className="flex flex-col h-full">
                        {/* Icon - centered */}
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Title and Date */}
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-foreground mb-1">{item.title}</h4>
                          <div className="text-xs font-semibold text-accent">{item.period}</div>
                        </div>
                        
                        {/* Achievements - centered */}
                        <ul className="space-y-2 text-sm text-muted-foreground flex-1 max-w-[75%] mx-auto">
                          {item.achievements.map((achievement, i) => <li key={i} className="flex items-start">
                              <span className="text-primary mr-2 flex-shrink-0 mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>)}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* Connection between sections */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-accent" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-accent to-primary" />
            </div>
          </div>

          {/* Design Evolution Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-white px-6 py-2 rounded-full font-bold text-lg bg-gradient-to-r from-accent to-primary shadow-lg shadow-accent/30">
                PCB定子设计
              </div>
            </div>

            <div className="relative">
              {/* Timeline connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/30 via-accent/50 to-accent/30 -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 relative z-10">
                {designMilestones.map((milestone, index) => <motion.div key={index} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }}>
                  <Card className="p-6 h-full bg-gradient-to-br from-card to-muted/30 hover:shadow-xl hover:scale-105 transition-all border-primary/20 group min-h-[200px]">
                    <div className="flex flex-col h-full">
                      {/* Icon - centered */}
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
                          <milestone.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Title and Date */}
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-foreground mb-1">{milestone.title}</h4>
                        <div className="text-xs font-semibold text-accent">{milestone.period}</div>
                      </div>
                      
                      {/* Points - centered */}
                      <ul className="space-y-2 text-sm text-muted-foreground flex-1 max-w-[75%] mx-auto">
                        {milestone.points.map((point, i) => <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 flex-shrink-0 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>)}
                      </ul>
                    </div>
                  </Card>
                </motion.div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
