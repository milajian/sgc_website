'use client'

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

