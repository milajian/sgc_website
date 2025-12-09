'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExpertListPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到主页的PCB电机团队架构锚点
    router.replace('/#expert-team');
  }, [router]);
  
  return null;
}

