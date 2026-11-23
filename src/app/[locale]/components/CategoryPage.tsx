'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link as LocalizedLink } from '@/i18n/navigation';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Machine {
  id?: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface CategoryPageProps {
  categoryName: string;
  categoryDescription: string;
  machines: Machine[];
  onMachineSelect?: (machineId: string) => void;
}

export function CategoryPage({
  categoryName,
  categoryDescription,
  machines,
}: CategoryPageProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const t = useTranslations('categoryPage');
  const params = useParams();
  const category = (params?.category as string) || 'filling-dosing';

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#0E131D] selection:text-white">
      <Header />

      <main>
        {/* Clean Category Hero */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-14 lg:py-20">
          <InteractivePrecisionField theme="light" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-medium text-[#5C6575]"
            >
              <LocalizedLink href="/" className="transition-colors hover:text-[#1E3A5F]">
                {isEs ? 'Inicio' : 'Home'}
              </LocalizedLink>
              <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1]" />
              <span className="font-semibold text-[#1E3A5F]">{categoryName}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="h-[3px] w-14 bg-[#9E1C28]" />
              <h1 className="mt-5 text-4xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-5xl">
                {categoryName}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
                {categoryDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Studio Machines Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={cn(
                'grid gap-7',
                machines.length === 1
                  ? 'max-w-xl mx-auto'
                  : machines.length === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3',
              )}
            >
              {machines.map((machine, index) => (
                <motion.article
                  key={machine.id || index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] shadow-[0_12px_32px_-16px_rgba(9,24,46,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2D5B]/25 hover:shadow-[0_24px_48px_-18px_rgba(11,45,91,0.18)]"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-[#9E1C28] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE8E1] p-7">
                      <div className="relative h-full w-full">
                        <Image
                          src={machine.image}
                          alt={machine.name}
                          fill
                          sizes="(min-width:1024px) 32vw, 95vw"
                          className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h2 className="text-xl font-black tracking-tight text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]">
                        {machine.name}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                        {machine.description}
                      </p>

                      {machine.features?.length > 0 && (
                        <ul className="mt-5 space-y-2">
                          {machine.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs font-medium text-[#334155]"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9E1C28]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#0F141E]/[0.09] px-6 py-4 sm:px-7">
                    {machine.id ? (
                      <Link
                        href={`/${locale}/machines/${category}/${machine.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] transition-colors hover:text-[#9E1C28]"
                      >
                        <span>{t('viewDetails')}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span />
                    )}

                    <LocalizedLink
                      href="/contact"
                      className="rounded-[2px] bg-[#0E131D] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#9E1C28]"
                    >
                      {isEs ? 'Cotizar' : 'Quote'}
                    </LocalizedLink>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Custom Machinery CTA */}
        <section className="border-t border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-[#0F141E] sm:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#475569]">
              {t('ctaSubtitle')}
            </p>
            <div className="mt-8">
              <LocalizedLink
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-[2px] bg-[#9E1C28] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_14px_30px_-10px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0E131D]"
              >
                <span>{t('ctaButton')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LocalizedLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
