'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/features/Home/components/HeroSection';
import { PackagingLineExplorer } from '@/features/Home/components/PackagingLineExplorer';
import { MachineCatalogShowcase } from '@/features/Home/components/MachineCatalogShowcase';
import { VideoDemosSection } from '@/features/Home/components/VideoDemosSection';
import { QuickQuoteSection } from '@/features/Home/components/QuickQuoteSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#1E3A5F] selection:text-[#FAF9F6]">
      <Header />

      <main>
        <HeroSection />
        <PackagingLineExplorer />
        <MachineCatalogShowcase />
        <VideoDemosSection />
        <QuickQuoteSection />
      </main>

      <Footer />
    </div>
  );
}
