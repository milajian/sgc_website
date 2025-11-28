import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { IncubationAchievements } from "@/components/IncubationAchievements";
import { PCBMotorSlider } from "@/components/PCBMotorSlider";
import { ProductJourney } from "@/components/ProductJourney";
import { CompanyInfo } from "@/components/CompanyInfo";
import { Footer } from "@/components/Footer";
import { ApplicationScenes } from "@/components/ApplicationScenes";
import { PCBMotorAdvantages } from "@/components/PCBMotorAdvantages";
import { CaseStudySlider } from "@/components/CaseStudySlider";
import { SimulationTestSlider } from "@/components/SimulationTestSlider";
import { ProtectionThermalSlider } from "@/components/ProtectionThermalSlider";
import { PCBStatorProductionTech } from "@/components/PCBStatorProductionTech";
import { ProductionTechnologySlider } from "@/components/ProductionTechnologySlider";

const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Hero />
        <IncubationAchievements />
        <PCBMotorSlider />
        <PCBMotorAdvantages />
        <ProductLines />
        <ApplicationScenes />
        <ProductJourney />
        <CaseStudySlider />
        <SimulationTestSlider />
        <ProtectionThermalSlider />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
        <CompanyInfo />
      </main>
      <Footer />
    </div>;
};
export default Index;