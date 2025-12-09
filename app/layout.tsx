'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <title>明阳电路 PCB电机 | SGCircuits PCB Motor Technology</title>
        <meta name="description" content="明阳电路PCB电机采用创新PCB定子技术，更轻、更高效、更可靠。效率提升10-15%，重量减轻30-60%，引领新一代电机技术革命。" />
        <meta name="author" content="SGCircuits" />
        <meta name="keywords" content="PCB电机, PCB定子, 电机技术, 节能电机, 明阳电路, SGCircuits, PCB Motor, PCB Stator" />

        <meta property="og:title" content="明阳电路 PCB电机 | SGCircuits PCB Motor Technology" />
        <meta property="og:description" content="创新PCB定子技术，更轻、更高效、更可靠。效率提升10-15%，重量减轻30-60%。" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Lovable" />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
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
            <TooltipProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

