'use client'

import { PCBMotorSlider } from "@/components/PCBMotorSlider";
import { PCBMotorAdvantages } from "@/components/PCBMotorAdvantages";
import { ApplicationScenes } from "@/components/ApplicationScenes";
import { CaseStudySlider } from "@/components/CaseStudySlider";

export default function AxialMotorStatorPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <PCBMotorSlider />
        <PCBMotorAdvantages />
        <ApplicationScenes />
        <CaseStudySlider />
      </main>
    </div>
  );
}

