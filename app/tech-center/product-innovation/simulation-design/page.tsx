'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimulationDesignPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到轴向磁通电机定子页面的仿真测试锚点
    router.replace('/pcb-coil-axial#simulation-test');
  }, [router]);
  
  return null;
}


