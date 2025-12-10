'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll';

export default function PCBMotorIntroPage() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到主页面并滚动到对应锚点
    router.replace('/pcb-coil-axial');
    setTimeout(() => {
      scrollToSection('pcb-motor-intro');
    }, 100);
  }, [router]);

  return null;
}

