'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll';

export default function CaseStudyPage() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到主页面并滚动到对应锚点
    router.replace('/pcb-coil-axial');
    setTimeout(() => {
      scrollToSection('case-study');
    }, 100);
  }, [router]);

  return null;
}

