'use client'

import { Card } from "@/components/ui/card";
import { Users, Network, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AdminSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

const adminSections: AdminSection[] = [
  {
    id: 'expert-list',
    title: '专家列表管理',
    description: '管理专家团队成员信息，包括姓名、角色、教育背景、成就和照片',
    icon: Users,
    href: '/admin/expert-list',
    color: 'from-primary to-accent'
  },
  {
    id: 'research-structure',
    title: '研发架构管理',
    description: '管理组织架构信息，包括中心标题、领导层、部门和产学研合作单位',
    icon: Network,
    href: '/admin/research-structure',
    color: 'from-accent to-primary'
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* 页面标题 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                管理后台
              </h1>
              <p className="text-muted-foreground text-lg">
                选择要管理的模块
              </p>
            </motion.div>

            {/* Section 卡片列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={section.href}>
                      <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                        <div className="flex flex-col h-full">
                          {/* 图标 */}
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* 标题 */}
                          <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {section.title}
                          </h2>

                          {/* 描述 */}
                          <p className="text-muted-foreground mb-4 flex-1">
                            {section.description}
                          </p>

                          {/* 进入按钮 */}
                          <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                            <span className="font-medium">进入管理</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

