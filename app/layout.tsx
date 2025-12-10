'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RouteLoadingIndicator } from "@/components/RouteLoadingIndicator";
import { RouteLoadingProvider } from "@/lib/route-loading-context";
import "./globals.css";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  // 全局路径标准化：移除所有页面的尾部斜杠（除了根路径），避免403错误
  // 注意：主要处理在 HTML 头部的内联脚本中完成，这里作为后备处理
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const normalizePath = () => {
        const currentPath = window.location.pathname;
        // 如果路径带尾部斜杠且不是根路径，重定向
        if (currentPath !== '/' && currentPath.endsWith('/')) {
          const normalizedPath = currentPath.replace(/\/$/, '');
          // 使用 replace 进行真正的重定向，避免在历史记录中留下带斜杠的路径
          const newUrl = normalizedPath + window.location.search + window.location.hash;
          window.location.replace(newUrl);
          return true; // 表示已重定向
        }
        return false;
      };

      // 初始检查（如果内联脚本没有处理）
      if (normalizePath()) {
        return; // 如果已重定向，不需要继续执行
      }

      // 监听路径变化（用于浏览器前进/后退）
      window.addEventListener('popstate', normalizePath);

      return () => {
        window.removeEventListener('popstate', normalizePath);
      };
    }
  }, []);

  // 注意：移除了路由错误检查 useEffect，因为：
  // 1. 使用客户端路由后，不再需要检查路由是否正确初始化
  // 2. 1.5 秒延迟检查会影响页面加载性能
  // 3. Next.js 的路由系统会自动处理路由匹配

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicon 和图标 */}
        <link rel="icon" type="image/jpeg" href="/assets/logo.jpg" />
        <link rel="apple-touch-icon" href="/assets/logo.jpg" />
        {/* 内联脚本：在页面加载前处理路径，避免403错误 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                if (path !== '/' && path.endsWith('/')) {
                  var normalizedPath = path.replace(/\\/$/, '');
                  var newUrl = normalizedPath + window.location.search + window.location.hash;
                  window.location.replace(newUrl);
                }
              })();
            `,
          }}
        />
        <title>明阳电路技术中心 | SGCircuits Technology Center</title>
        <meta name="description" content="明阳电路PCB电机采用创新PCB定子技术，更轻、更高效、更可靠。效率提升10-15%，重量减轻30-60%，引领新一代电机技术革命。" />
        <meta name="author" content="SGCircuits" />
        <meta name="keywords" content="PCB电机, PCB定子, 电机技术, 节能电机, 明阳电路, SGCircuits, PCB Motor, PCB Stator" />

        <meta property="og:title" content="明阳电路技术中心 | SGCircuits Technology Center" />
        <meta property="og:description" content="PCB工艺基础研究、PCB应用产品研发及半导体领域技术运用" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="//47.106.73.160/" />
        <meta property="og:image" content="https://raw.githubusercontent.com/milajian/sgc_website/main/public/assets/showimage.png?v=3" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="SGCircuits 明阳电路" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="明阳电路技术中心 | SGCircuits Technology Center" />
        <meta name="twitter:description" content="PCB工艺基础研究、PCB应用产品研发及半导体领域技术运用" />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/milajian/sgc_website/main/public/assets/showimage.png?v=3" />
        
        {/* Content Security Policy 由 Nginx 配置，避免与 HTML meta 标签冲突 */}
        {/* CSP 配置在 nginx-main-server.conf 中统一管理 */}
        </head>
      <body suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem={false}
            disableTransitionOnChange={false}
            storageKey="sgc-theme"
          >
            <RouteLoadingProvider>
              <TooltipProvider>
                <RouteLoadingIndicator />
                <Header />
                {children}
                <Footer />
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </RouteLoadingProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

