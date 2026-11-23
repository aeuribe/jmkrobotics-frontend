'use client';

import React, { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, FileText, Shield } from 'lucide-react';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';

type LegalPageLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  lastUpdated: string;
  icon: 'terms' | 'privacy';
  onBack?: () => void;
};

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  children,
  title,
  subtitle,
  lastUpdated,
  icon,
}) => {
  const IconComponent = icon === 'terms' ? FileText : Shield;

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E]">
      <Header />

      <main>
        {/* Clean Porcelain Hero */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-14 lg:py-20">
          <InteractivePrecisionField theme="light" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-[#475569] transition-colors hover:text-[#1E3A5F]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to JMK Robotics</span>
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-[#0E131D]/8 text-[#1E3A5F]">
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="rounded-[2px] border border-[#0F141E]/[0.11] bg-[#F4F3EF] px-3 py-1 text-xs font-medium text-[#475569]">
                Last updated: {lastUpdated}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Legal Document Surface (Maritime Navy preserves high contrast for legal body styles) */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2px] border border-[#0F141E]/[0.13] obsidian-stage shadow-[0_24px_60px_-24px_rgba(7,26,54,0.35)]">
              <div className="h-[3px] w-full bg-gradient-to-r from-[#0B2D5B] via-[#B81D2B] to-[#0B2D5B]" />
              <div className="p-6 sm:p-10 lg:p-12">{children}</div>
            </div>
          </div>
        </section>

        {/* Questions Card */}
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] p-8 text-center">
              <h2 className="text-xl font-bold text-[#0F141E]">Questions or Concerns?</h2>
              <p className="mt-2 text-sm text-[#475569]">
                If you have any questions about our{' '}
                {icon === 'terms' ? 'Terms of Service' : 'Privacy Policy'}, reach out to our team.
              </p>
              <a
                href="mailto:info@servicesjmk.com"
                className="mt-4 inline-block text-sm font-bold text-[#9E1C28] hover:text-[#1E3A5F]"
              >
                info@servicesjmk.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
