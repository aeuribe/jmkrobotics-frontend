'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
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
      className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E1C28]">
            {isEs ? 'Soluciones por Etapa' : 'Packaging Process'}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-4xl lg:text-5xl">
            {isEs ? 'Cubrimos cada etapa de su línea.' : 'Every stage of your packaging line.'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#475263] sm:text-base">
            {isEs
              ? 'Desde maquinaria compacta hasta sistemas industriales de alta velocidad. Seleccione una etapa para conocer nuestras capacidades.'
              : 'From compact standalone units to high-speed industrial systems. Select a stage to explore what we supply.'}
          </p>
        </div>

        {/* Interactive 4-Stage Rail */}
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-10 right-10 top-6 hidden h-px bg-[#0F141E]/[0.12] md:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#0F141E] via-[#1E3A5F] to-[#9E1C28]"
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
                    'group relative flex flex-col items-start border p-4 text-left transition-all',
                    isActive
                      ? 'border-[#0E131D] bg-gradient-to-b from-[#1A2232] to-[#0E131D] text-[#FAF9F6] shadow-[0_14px_30px_-14px_rgba(14,19,29,0.45)]'
                      : 'border-[#0F141E]/[0.09] bg-[#F4F3EF] text-[#0F141E] hover:border-[#0F141E]/[0.18] hover:bg-[#FAF9F6]',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center font-mono text-[11px] font-bold transition-colors',
                      isActive
                        ? 'bg-[#9E1C28] text-[#FAF9F6]'
                        : isPassed
                          ? 'bg-[#1E3A5F] text-[#FAF9F6]'
                          : 'border border-[#0F141E]/[0.12] bg-[#FAF9F6] text-[#1E3A5F]',
                    )}
                  >
                    {stage.step}
                  </span>
                  <p className="mt-3 text-sm font-bold tracking-[-0.015em]">
                    {stage.stageName[locale]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Process Showcase Panel */}
        <div
          className="chamfer-card mt-8 grid grid-cols-1 overflow-hidden border border-[#0F141E]/[0.10] bg-[#F4F3EF] lg:grid-cols-12"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {/* Recessed CAD Viewport Stage */}
          <div className="p-4 lg:col-span-6 lg:p-6 bg-[#FAF9F6]">
            <div className="cad-viewport relative flex h-full min-h-[280px] items-center justify-center overflow-hidden p-6 lg:p-10">
              <InteractivePrecisionField theme="light" />
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
                      className="object-contain mix-blend-multiply drop-shadow-[0_22px_28px_rgba(14,19,29,0.12)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Process Capabilities */}
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
                    {currentStage.rangeLabel[locale]}
                  </p>
                  <h3 className="mt-2.5 text-2xl font-black tracking-[-0.025em] text-[#0F141E] sm:text-3xl">
                    {currentStage.roleTitle[locale]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475263] sm:text-base">
                    {currentStage.description[locale]}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {currentStage.highlights[locale].map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#2D3748]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E3A5F]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 border border-[#0F141E]/[0.09] bg-[#FAF9F6] px-5 py-4 text-xs leading-relaxed text-[#475263]">
                {isEs
                  ? '¿Busca mayor capacidad o un equipo especializado que aún no aparece publicado? Configuramos soluciones industriales a medida según su producción.'
                  : 'Need higher capacity or specialized machinery not yet listed online? We source and configure industrial systems tailored to your output.'}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link
                href={currentStage.link}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1E3A5F] transition-colors hover:text-[#9E1C28]"
              >
                <span>{isEs ? 'Ver equipos de referencia' : 'See reference equipment'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="chamfer-btn btn-satin-obsidian inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
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
