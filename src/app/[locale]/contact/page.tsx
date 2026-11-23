import React, { Suspense } from 'react';
import Contact from '../features/Contact/components/Contact';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E]">
      <Header />
      <Suspense fallback={<div className="min-h-[60vh] bg-[#F4F3EF]" />}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}
