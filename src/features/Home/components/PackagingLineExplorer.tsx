'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LINE_STAGES, Locale } from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function PackagingLineExplorer() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [activeIndex, setActiveIndex] = useState(0);

  const currentStage = LINE_STAGES[activeIndex];
  const progressPercent = (activeIndex / (LINE_STAGES.length - 1)) * 100;

  return (
    <section
      id="line-flow"
      className="relative overflow-hidden bg-white py-20 lg:py-28 border-b border-[#0B2D5B]/8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header (No Auto-Cycle button, No AI-numbered prefix) */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B81D2B]">
            {isEs ? 'Soluciones por Etapa' : 'Packaging Process'}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#09182E] sm:text-4xl lg:text-5xl">
            {isEs ? 'Cubrimos cada etapa de su línea.' : 'Every stage of your packaging line.'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">
            {isEs
              ? 'Desde maquinaria compacta hasta sistemas industriales de alta velocidad. Seleccione una etapa para conocer nuestras capacidades.'
              : 'From compact standalone units to high-speed industrial systems. Select a stage to explore what we supply.'}
          </p>
        </div>

        {/* Interactive 4-Stage Rail */}
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-10 right-10 top-6 hidden h-[2px] bg-[#E2E8F0] md:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#0B2D5B] to-[#B81D2B]"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {LINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all',
                    isActive
                      ? 'border-[#0B2D5B] bg-[#0B2D5B] text-white shadow-[0_14px_32px_-12px_rgba(11,45,91,0.45)]'
                      : 'border-[#0B2D5B]/10 bg-[#F8FAFC] text-[#09182E] hover:border-[#0B2D5B]/30 hover:bg-white',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors',
                      isActive
                        ? 'bg-[#B81D2B] text-white'
                        : isPassed
                          ? 'bg-[#0B2D5B] text-white'
                          : 'bg-white text-[#0B2D5B] border border-[#0B2D5B]/15',
                    )}
                  >
                    {stage.step}
                  </span>
                  <p className="mt-3 text-sm font-bold tracking-tight">
                    {stage.stageName[locale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Process Showcase Panel */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-3xl border border-[#0B2D5B]/10 bg-[#F8FAFC] lg:grid-cols-12">
          {/* Studio Image Stage */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2F7] p-8 lg:col-span-6 lg:p-12">
            <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative aspect-[4/3] w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, x: 18, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -18, scale: 0.96 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentStage.image}
                    alt={currentStage.roleTitle[locale]}
                    fill
                    sizes="(min-width:1024px) 42vw, 90vw"
                    className="object-contain mix-blend-multiply drop-shadow-[0_20px_28px_rgba(9,24,46,0.12)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Process Capabilities (Broad, Not Locked to Entry Models) */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B81D2B]">
                    {currentStage.rangeLabel[locale]}
                  </p>
                  <h3 className="mt-2.5 text-2xl font-black tracking-tight text-[#09182E] sm:text-3xl">
                    {currentStage.roleTitle[locale]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">
                    {currentStage.description[locale]}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {currentStage.highlights[locale].map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#334155]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B81D2B]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Subtle note for higher-capacity / custom machinery */}
              <div className="mt-7 rounded-2xl border border-[#0B2D5B]/10 bg-white px-5 py-4 text-xs leading-relaxed text-[#475569]">
                {isEs
                  ? '¿Busca mayor capacidad o un equipo especializado que aún no aparece publicado? Configuramos soluciones industriales a medida según su producción.'
                  : 'Need higher capacity or specialized machinery not yet listed online? We source and configure industrial systems tailored to your output.'}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link
                href={currentStage.link}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B2D5B] transition-colors hover:text-[#B81D2B]"
              >
                <span>{isEs ? 'Ver equipos de referencia' : 'See reference equipment'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#B81D2B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_24px_-8px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0B2D5B]"
              >
                <span>{isEs ? 'Consultar esta etapa' : 'Inquire about this stage'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
