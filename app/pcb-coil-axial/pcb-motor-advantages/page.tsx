'use client'

import { Hero } from "@/components/Hero";
import { PCBMotorAdvantages } from "@/components/PCBMotorAdvantages";
import { PCBStatorProductionTech } from "@/components/PCBStatorProductionTech";
import { ProductionTechnologySlider } from "@/components/ProductionTechnologySlider";

export default function PCBMotorAdvantagesPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <Hero />
        <PCBMotorAdvantages />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
      </main>
    </div>
  );
}

