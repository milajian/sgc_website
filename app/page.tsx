'use client'

import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { IncubationAchievements } from "@/components/IncubationAchievements";
import { PCBMotorSlider } from "@/components/PCBMotorSlider";
import { ProductJourney } from "@/components/ProductJourney";
import { CompanyInfo } from "@/components/CompanyInfo";
import { ApplicationScenes } from "@/components/ApplicationScenes";
import { PCBMotorAdvantages } from "@/components/PCBMotorAdvantages";
import { CaseStudySlider } from "@/components/CaseStudySlider";
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
        <PCBMotorSlider />
        <PCBMotorAdvantages />
        <ApplicationScenes />
        <ProductJourney />
        <CaseStudySlider />
        <SimulationTestSlider />
        <ProtectionThermalSlider />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
        <CompanyInfo />
      </main>
    </div>
  );
}

