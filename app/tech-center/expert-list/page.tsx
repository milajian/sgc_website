'use client'

import { useEffect } from "react";

export default function ExpertListPage() {
  useEffect(() => {
    // 使用 window.location 进行重定向，更可靠
    // 这样可以确保锚点导航正常工作
    if (typeof window !== 'undefined') {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const targetUrl = basePath ? `${basePath}/#expert-team` : '/#expert-team';
      window.location.href = targetUrl;
    }
  }, []);
  
  return null;
}

