'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Maximize2, ArrowUpRight, Film } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import { DEMO_VIDEOS, Locale } from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function VideoDemosSection() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeDemo = DEMO_VIDEOS[selectedIdx];

  const handleSelectChapter = (idx: number) => {
    setSelectedIdx(idx);
  };

  return (
    <section
      id="demos"
      className="obsidian-stage relative overflow-hidden py-22 text-[#F4F3EF] lg:py-30"
    >
      <InteractivePrecisionField theme="dark" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Subtle Ambient Cobalt/Crimson Stage Glow */}
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1E3A5F, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D15A65]">
              {isEs ? 'En Operación' : 'In Operation'}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-[1.04] tracking-[-0.03em] text-[#FAF9F6] sm:text-4xl lg:text-5xl">
              {isEs
                ? 'Vea nuestros equipos trabajando en planta.'
                : 'See our machinery running on the floor.'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              {isEs
                ? 'Pruebas reales de taller y calibración con envases antes de cada entrega.'
                : 'Actual shop-floor testing and container calibration recorded prior to delivery.'}
            </p>
          </div>

          <Link
            href="/in-action"
            className="chamfer-btn inline-flex w-fit items-center gap-2 border border-white/[0.16] bg-white/[0.05] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6] transition-all hover:border-white/30 hover:bg-white/[0.12]"
          >
            <Film className="h-3.5 w-3.5 text-[#D15A65]" />
            <span>{isEs ? 'Ver todas las instalaciones' : 'View all installations'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="chamfer-stage relative overflow-hidden border border-white/[0.10] bg-[#090D14] shadow-[0_32px_72px_-20px_rgba(0,0,0,0.72)]">
              <div className="relative aspect-video w-full bg-[#090D14]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeDemo.id}-live`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative h-full w-full"
                  >
                    <video
                      key={activeDemo.videoUrl}
                      src={activeDemo.videoUrl}
                      poster={activeDemo.thumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090D14]/65 via-transparent to-[#090D14]/20" />

                    <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 border border-white/15 bg-[#090D14]/75 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6] backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                      <span>{isEs ? 'En Planta' : 'Live Floor'}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="absolute right-5 top-5 inline-flex items-center gap-1.5 border border-white/[0.18] bg-[#090D14]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FAF9F6] backdrop-blur transition-colors hover:bg-[#FAF9F6] hover:text-[#0E131D]"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{isEs ? 'Expandir' : 'Expand'}</span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/[0.08] bg-[#151C2B]/75 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold tracking-[-0.015em] text-[#FAF9F6]">
                    {activeDemo.title[locale]}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">{activeDemo.application[locale]}</p>
                </div>
                <span className="w-fit shrink-0 border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] font-medium text-[#CBD5E1]">
                  {activeDemo.specs}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 lg:col-span-5">
            {DEMO_VIDEOS.map((demo, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className={cn(
                    'group relative flex items-center gap-4 overflow-hidden border p-4 text-left transition-all',
                    isSelected
                      ? 'border-white/[0.18] bg-[#151C2B] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55)]'
                      : 'border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.05]',
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="video-chapter-bar"
                      className="absolute inset-y-0 left-0 w-[2px] bg-[#9E1C28]"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    />
                  )}

                  <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-white/[0.10] bg-black">
                    <Image
                      src={demo.thumbnail}
                      alt={demo.title[locale]}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play
                        className={cn(
                          'h-4 w-4 fill-current',
                          isSelected ? 'text-[#D15A65]' : 'text-white/80',
                        )}
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-bold text-[#FAF9F6]">
                        {demo.title[locale]}
                      </p>
                      <span className="shrink-0 font-mono text-[10px] text-[#94A3B8]">
                        {demo.duration}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[#94A3B8]">
                      {demo.application[locale]}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="border border-white/[0.08] bg-white/[0.025] px-5 py-4 text-xs text-[#94A3B8]">
              <p className="font-semibold text-[#FAF9F6]">
                {isEs ? 'Pruebas con sus propios envases' : 'Testing with your own containers'}
              </p>
              <p className="mt-1 leading-relaxed">
                {isEs
                  ? 'Envíenos muestras de sus frascos, tapas o bolsas a Miami y grabaremos una prueba dedicada para su equipo.'
                  : 'Send sample bottles, caps, or pouches to our Miami team — we run a recorded calibration test for your project.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={activeDemo.videoUrl}
        title={activeDemo.title[locale]}
        description={activeDemo.application[locale]}
        machineSlug={activeDemo.slug}
      />
    </section>
  );
}
