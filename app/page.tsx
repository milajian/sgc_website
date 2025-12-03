'use client'

import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { IncubationAchievements } from "@/components/IncubationAchievements";
import { ProductJourney } from "@/components/ProductJourney";
import { CompanyInfo } from "@/components/CompanyInfo";
import { SimulationTestSlider } from "@/components/SimulationTestSlider";
import { ProtectionThermalSlider } from "@/components/ProtectionThermalSlider";
import { PCBStatorProductionTech } from "@/components/PCBStatorProductionTech";
import { ProductionTechnologySlider } from "@/components/ProductionTechnologySlider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <Hero />
        <ProductLines />
        <IncubationAchievements />
        <ProductJourney />
        <SimulationTestSlider />
        <ProtectionThermalSlider />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
        <CompanyInfo />
      </main>
    </div>
  );
}

