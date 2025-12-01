'use client'
import { Card } from "@/components/ui/card";
import { getImagePath } from "@/lib/image-path";
import { motion } from "framer-motion";
interface ApplicationItem {
  title: string;
  status: string;
  statusColor: string;
  image: string;
}

const applications: ApplicationItem[] = [
  {
    title: "工业电机",
    status: "已量产",
    statusColor: "bg-emerald-500/90",
    image: getImagePath("/assets/app-industrial-motor.png")
  },
  {
    title: "汽车电子",
    status: "已打样",
    statusColor: "bg-blue-500/90",
    image: getImagePath("/assets/app-automotive.png")
  },
  {
    title: "机器人关节",
    status: "已打样",
    statusColor: "bg-blue-500/90",
    image: getImagePath("/assets/app-robot-joint.png")
  },
  {
    title: "发电机",
    status: "已打样",
    statusColor: "bg-blue-500/90",
    image: getImagePath("/assets/app-generator.png")
  },
  {
    title: "无人机",
    status: "规划中",
    statusColor: "bg-cyan-500/90",
    image: getImagePath("/assets/app-drone.png")
  },
  {
    title: "助力骑行",
    status: "规划中",
    statusColor: "bg-cyan-500/90",
    image: getImagePath("/assets/app-ebike.png")
  }
];

export const ApplicationScenes = () => {
  return (
    <section id="application-scenes" className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative inline-block">
              应用场景
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground">
              多领域深度应用，赋能智能制造未来
            </p>
          </motion.div>

          {/* Application Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
              {applications.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/40 backdrop-blur-md overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-full">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    
                    <div className="relative p-4 flex items-center gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-xl" />
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-primary/20 bg-background/20">
                          <img 
                            src={app.image} 
                            alt={app.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground mb-2">
                          {app.title}
                        </h4>
                        
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${app.statusColor} shadow-lg`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
