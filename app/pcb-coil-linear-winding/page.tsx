'use client'

import { LinearMotorSlider } from "@/components/LinearMotorSlider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LinearMotorWindingPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* 返回按钮 */}
        <div className="container mx-auto px-4 md:px-6 pt-6 pb-4">
          <Link href="/pcb-coil-product-lines#product-lines">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回五大产品线
            </Button>
          </Link>
        </div>
        {/* PCB电机案例分析 */}
        <LinearMotorSlider />
      </main>
    </div>
  );
}

