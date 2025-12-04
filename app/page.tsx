'use client'

import { Hero } from "@/components/Hero";
import { CompanyInfo } from "@/components/CompanyInfo";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <Hero />
        <CompanyInfo />
      </main>
    </div>
  );
}

