'use client'

import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// 加载占位符组件
const LoadingPlaceholder = () => (
  <div className="py-20 bg-background">
    <div className="container mx-auto px-4 text-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
    </div>
  </div>
);

// 动态导入非首屏组件，实现代码分割和懒加载
const PCBStatorProductionTech = dynamic(
  () => import("@/components/PCBStatorProductionTech").then(mod => ({ default: mod.PCBStatorProductionTech })),
  { 
    loading: () => <LoadingPlaceholder />,
    ssr: true  // 静态导出模式下，保持 SSR 以确保内容在构建时生成
  }
);

const ProductionTechnologySlider = dynamic(
  () => import("@/components/ProductionTechnologySlider").then(mod => ({ default: mod.ProductionTechnologySlider })),
  { 
    loading: () => <LoadingPlaceholder />,
    ssr: true
  }
);

export default function ProductLinesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const expectedPath = '/pcb-coil-product-lines';

  // 强制路由更新：确保路径正确匹配
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      // 如果 pathname 不正确，强制更新路由
      if (pathname !== expectedPath && currentPath === expectedPath) {
        // 强制触发路由更新
        router.replace(expectedPath);
        return;
      }
      
      // 标准化路径：移除尾部斜杠，避免403错误和路径不一致
      if (currentPath !== expectedPath && currentPath.endsWith('/')) {
        const normalizedPath = currentPath.replace(/\/$/, '');
        if (normalizedPath === expectedPath) {
          // 使用 replaceState 而不是 router.replace，避免在静态导出模式下出现问题
          window.history.replaceState(null, '', expectedPath);
          // 触发路径更新事件，让 Header 组件知道路径变化
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    }
  }, [router, pathname, expectedPath]);

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <Hero />
        <ProductLines />
        <PCBStatorProductionTech />
        <ProductionTechnologySlider />
      </main>
      <ScrollToTopButton />
    </div>
  );
}

