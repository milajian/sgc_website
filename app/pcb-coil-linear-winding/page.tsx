'use client'

import { LinearMotorSlider } from "@/components/LinearMotorSlider";

export default function LinearMotorWindingPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* PCB电机案例分析 */}
        <LinearMotorSlider />
      </main>
    </div>
  );
}

