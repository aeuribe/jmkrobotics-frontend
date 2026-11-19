'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/features/Home/components/HeroSection';
import { PackagingLineExplorer } from '@/features/Home/components/PackagingLineExplorer';
import { MachineCatalogShowcase } from '@/features/Home/components/MachineCatalogShowcase';
import { VideoDemosSection } from '@/features/Home/components/VideoDemosSection';
import { AuthorityAdvantage } from '@/features/Home/components/AuthorityAdvantage';
import { QuickQuoteSection } from '@/features/Home/components/QuickQuoteSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#09182E] selection:bg-[#0B2D5B] selection:text-white">
      <Header />

      <main>
        <HeroSection />
        <PackagingLineExplorer />
        <MachineCatalogShowcase />
        <VideoDemosSection />
        <AuthorityAdvantage />
        <QuickQuoteSection />
      </main>

      <Footer />
    </div>
  );
}
