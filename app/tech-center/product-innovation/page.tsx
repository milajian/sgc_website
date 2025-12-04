'use client'

import { PCBStatorProductionTech } from "@/components/PCBStatorProductionTech";
import { ProductionTechnologySlider } from "@/components/ProductionTechnologySlider";

export default function ProductInnovationPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
      </main>
    </div>
  );
}

