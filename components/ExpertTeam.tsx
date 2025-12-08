'use client'

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/image-path";
import { GraduationCap, Award, Briefcase, Users } from "lucide-react";
import { Expert } from "@/lib/types";

interface ExpertTeamProps {
  experts: Expert[];
}

export const ExpertTeam = ({ experts }: ExpertTeamProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Subtle circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* 主标题 */}
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
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PCB电机团队架构
              </h2>
            </motion.div>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* 顶部角色栏 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-accent/90 to-accent p-4 border-2 border-accent/50 shadow-lg">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white mb-1">{expert.roleTitle}</p>
                    <p className="text-base font-bold text-white">{expert.name}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* 详细信息卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full border-2 border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden relative group hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* 照片 */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          {expert.image ? (
                            <img 
                              src={expert.image.startsWith('http') ? expert.image : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${expert.image}`}
                              alt={expert.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                // 如果图片加载失败，显示占位符
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20"><svg class="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                              <Briefcase className="w-12 h-12 text-primary/50" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 信息 */}
                      <div className="flex-1 space-y-4">
                        {/* 角色和姓名 */}
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                            {expert.name}
                          </h3>
                          <p className="text-base md:text-lg text-accent font-semibold">
                            {expert.role}
                          </p>
                        </div>

                        {/* 教育背景 */}
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">教育背景</p>
                            <p className="text-sm text-foreground">{expert.education}</p>
                          </div>
                        </div>

                        {/* 成就 */}
                        <div className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">主要成就</p>
                            <p className="text-sm text-foreground">{expert.achievements}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

