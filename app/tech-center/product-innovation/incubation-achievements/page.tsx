'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IncubationAchievementsPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到主页的孵化成果锚点
    router.replace('/#incubation-achievements');
  }, [router]);
  
  return null;
}


