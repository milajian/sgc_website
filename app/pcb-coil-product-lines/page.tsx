'use client'

import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { PCBStatorProductionTech } from "@/components/PCBStatorProductionTech";
import { ProductionTechnologySlider } from "@/components/ProductionTechnologySlider";

export default function ProductLinesPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <Hero />
        <ProductLines />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
      </main>
    </div>
  );
}

