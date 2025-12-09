'use client'

import { PCBMotorSlider } from "@/components/PCBMotorSlider";
import { PCBMotorAdvantages } from "@/components/PCBMotorAdvantages";
import { ApplicationScenes } from "@/components/ApplicationScenes";
import { CaseStudySlider } from "@/components/CaseStudySlider";
import { ProductJourney } from "@/components/ProductJourney";
import { SimulationTestSlider } from "@/components/SimulationTestSlider";
import { ProtectionThermalSlider } from "@/components/ProtectionThermalSlider";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { motion } from "framer-motion";

const navigationItems = [
  { id: 'pcb-motor-intro', label: 'PCB电机产品介绍' },
  { id: 'pcb-motor-advantages', label: 'PCB电机优势' },
  { id: 'application-scenes', label: '应用场景' },
  { id: 'case-study', label: 'PCB电机案例分析' },
  { id: 'product-journey', label: 'PCB电机产品历程' },
  { id: 'protection-thermal', label: '防护与散热设计' },
  { id: 'simulation-test', label: '仿真测试' },
];

export default function AxialMotorStatorPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* 导航按钮组 */}
        <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-primary/20 shadow-lg shadow-primary/5 py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Button
                    onClick={() => scrollToSection(item.id)}
                    variant="outline"
                    className="text-xs md:text-sm font-medium border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <PCBMotorSlider />
        <PCBMotorAdvantages />
        <ApplicationScenes />
        <CaseStudySlider />
        <ProductJourney />
        <ProtectionThermalSlider />
        <SimulationTestSlider />
      </main>
    </div>
  );
}

