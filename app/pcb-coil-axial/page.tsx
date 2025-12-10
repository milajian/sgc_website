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
import { useState, useEffect, useRef } from "react";

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
  const [activeSection, setActiveSection] = useState<string>(navigationItems[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    // 延迟初始化，确保所有section都已渲染
    const initObserver = () => {
      // 初始化 Intersection Observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              sectionRefs.current.set(entry.target.id, entry);
            } else {
              sectionRefs.current.delete(entry.target.id);
            }
          });

          // 找到最靠近顶部的可见section
          const visibleSections = Array.from(sectionRefs.current.values());
          if (visibleSections.length > 0) {
            // 按距离顶部的距离排序，选择最近的（考虑Header高度约100px）
            visibleSections.sort((a, b) => {
              const headerOffset = 100;
              const aTop = a.boundingClientRect.top - headerOffset;
              const bTop = b.boundingClientRect.top - headerOffset;
              // 优先选择在Header下方且最接近的section
              if (aTop >= 0 && bTop < 0) return -1;
              if (aTop < 0 && bTop >= 0) return 1;
              return Math.abs(aTop) - Math.abs(bTop);
            });
            
            const topSection = visibleSections[0];
            if (topSection && topSection.target.id) {
              setActiveSection(topSection.target.id);
            }
          }
        },
        {
          rootMargin: '-100px 0px -60% 0px', // 考虑Header高度，当section进入视口顶部100px以下时认为可见
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      // 观察所有section
      navigationItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    };

    // 等待DOM渲染完成
    const timeoutId = setTimeout(() => {
      initObserver();
    }, 100);

    // 初始化时检查URL hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash && navigationItems.some(item => item.id === hash)) {
        setActiveSection(hash);
      }
    }

    // 清理函数
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* 导航按钮组 */}
        <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-primary/20 shadow-lg shadow-primary/5 py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => handleSectionClick(item.id)}
                      variant="outline"
                      className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:border-primary/90'
                          : 'border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}
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

