'use client'
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Network, Settings, LayoutGrid, FlaskConical, Building2 } from "lucide-react";

export interface ResearchStructureData {
  center: {
    title: string;
  };
  leadership: Array<{
    name: string;
  }>;
  departments: Array<{
    id: string;
    name: string;
    icon: string;
    groups?: string[];
    functions?: string[];
  }>;
  partners: Array<{
    id: string;
    name: string;
    logo: string;
  }>;
}

interface ResearchStructureProps {
  data: ResearchStructureData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  network: Network,
  gear: Settings,
  squares: LayoutGrid,
  flask: FlaskConical,
};

export const ResearchStructure = ({ data }: ResearchStructureProps) => {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Network;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* 主标题 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            明阳电路技术中心
          </h1>
        </motion.div>

        {/* 组织架构图 */}
        <div className="max-w-7xl mx-auto">
          {/* 中心：技术中心 SGC Labs */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-primary text-white px-8 py-6 border-0 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                {data.center.title}
              </h2>
            </Card>
          </motion.div>

          {/* 连接线 - 从中心到领导层 */}
          <div className="hidden md:block relative h-8 mb-4">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <line 
                x1="50%" 
                y1="0" 
                x2="25%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.4"
              />
              <line 
                x1="50%" 
                y1="0" 
                x2="75%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          {/* 第二层：总工程师和技术委员会 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {data.leadership.map((leader, idx) => (
              <Card 
                key={idx}
                className="bg-accent text-white px-6 py-4 border-0 shadow-lg text-center"
              >
                <h3 className="text-xl md:text-2xl font-bold">
                  {leader.name}
                </h3>
              </Card>
            ))}
          </motion.div>

          {/* 连接线 - 从领导层到部门 */}
          <div className="hidden md:block relative h-8 mb-4">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <line 
                x1="25%" 
                y1="0" 
                x2="12.5%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.3"
              />
              <line 
                x1="25%" 
                y1="0" 
                x2="37.5%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.3"
              />
              <line 
                x1="75%" 
                y1="0" 
                x2="62.5%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.3"
              />
              <line 
                x1="75%" 
                y1="0" 
                x2="87.5%" 
                y2="100%" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* 第三层：四个部门 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {data.departments.map((dept, idx) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <Card className="bg-primary/10 border-primary/30 hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="p-6">
                    {/* 部门图标和名称 */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        {getIcon(dept.icon)}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-primary">
                        {dept.name}
                      </h3>
                    </div>

                    {/* 子组/功能列表 */}
                    <div className="space-y-2">
                      {(dept.groups || dept.functions || []).map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="text-sm text-foreground/80 border border-dashed border-primary/30 rounded-lg px-3 py-2 bg-background/50"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* 产学研合作单位 */}
          <motion.div
            className="mt-16 pt-12 border-t border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              产学研合作单位
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.partners.map((partner) => {
                const PartnerLogo = ({ logo, name }: { logo: string; name: string }) => {
                  const [imageError, setImageError] = useState(false);
                  
                  if (!logo || imageError) {
                    return (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                        <Building2 className="w-10 h-10 text-primary/40" />
                      </div>
                    );
                  }
                  
                  return (
                    <img 
                      src={logo} 
                      alt={name}
                      className="max-h-20 max-w-full object-contain"
                      onError={() => setImageError(true)}
                    />
                  );
                };
                
                return (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center justify-center">
                      <div className="mb-4 h-20 w-full flex items-center justify-center">
                        <PartnerLogo logo={partner.logo} name={partner.name} />
                      </div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground">
                        {partner.name}
                      </h4>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

