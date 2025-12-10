'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll';

export default function HistoryPage() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到主页并滚动到历史发展部分（如果有对应的锚点）
    router.replace('/');
    setTimeout(() => {
      // 如果主页有历史发展锚点，可以滚动到那里
      // 否则就停留在顶部
      const historySection = document.getElementById('history');
      if (historySection) {
        scrollToSection('history');
      }
    }, 100);
  }, [router]);

  return null;
}

