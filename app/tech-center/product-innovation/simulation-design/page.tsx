'use client'

import { SimulationTestSlider } from "@/components/SimulationTestSlider";
import { ProtectionThermalSlider } from "@/components/ProtectionThermalSlider";

export default function SimulationDesignPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <SimulationTestSlider />
        <ProtectionThermalSlider />
      </main>
    </div>
  );
}


