'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductJourneyPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到轴向磁通电机定子页面的产品历程锚点
    router.replace('/pcb-coil-axial#product-journey');
  }, [router]);
  
  return null;
}


