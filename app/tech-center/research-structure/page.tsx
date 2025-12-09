'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

export default function ResearchStructurePage() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到主页并滚动到 research-structure section
    router.push('/');
    // 等待页面加载后滚动
    setTimeout(() => {
      scrollToSection('research-structure');
    }, 100);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-muted-foreground">正在跳转到主页...</div>
    </div>
  );
}
