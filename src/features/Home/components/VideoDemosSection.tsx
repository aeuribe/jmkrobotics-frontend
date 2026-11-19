'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Maximize2, ArrowUpRight, Film } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';
import { DEMO_VIDEOS, Locale } from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function VideoDemosSection() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeDemo = DEMO_VIDEOS[selectedIdx];

  const handleSelectChapter = (idx: number) => {
    setSelectedIdx(idx);
    setIsPlayingInline(false);
  };

  return (
    <section
      id="demos"
      className="blueprint-navy relative overflow-hidden bg-[#071A36] py-22 text-white lg:py-30"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B2D5B] via-[#B81D2B] to-[#0B2D5B]" />

      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #B81D2B, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F87171]">
              {isEs ? 'En Operación' : 'In Operation'}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-[1.04] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              {isEs
                ? 'Vea nuestros equipos trabajando en planta.'
                : 'See our machinery running on the floor.'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {isEs
                ? 'Pruebas reales de taller y calibración con envases antes de cada entrega.'
                : 'Actual shop-floor testing and container calibration recorded prior to delivery.'}
            </p>
          </div>

          <a
            href="https://www.youtube.com/@servicesjmk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#B81D2B] hover:bg-[#B81D2B]"
          >
            <Film className="h-3.5 w-3.5" />
            <span>{isEs ? 'Más videos en YouTube' : 'More Videos on YouTube'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#040E20] shadow-[0_28px_70px_-20px_rgba(0,0,0,0.65)]">
              <div className="relative aspect-video w-full">
                <AnimatePresence mode="wait">
                  {isPlayingInline ? (
                    <motion.video
                      key={`${activeDemo.id}-video`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={activeDemo.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key={`${activeDemo.id}-poster`}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="group relative h-full w-full cursor-pointer"
                      onClick={() => setIsPlayingInline(true)}
                    >
                      <Image
                        src={activeDemo.thumbnail}
                        alt={activeDemo.title[locale]}
                        fill
                        sizes="(min-width:1024px) 58vw, 100vw"
                        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040E20] via-[#040E20]/25 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-18 w-18 items-center justify-center rounded-full border border-white/30 bg-[#B81D2B]/95 text-white shadow-[0_0_40px_rgba(184,29,43,0.55)] transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-1 h-7 w-7 fill-current" />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                        className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-[#071A36]"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{isEs ? 'Expandir' : 'Expand'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 bg-[#0A2246]/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeDemo.title[locale]}</h3>
                  <p className="mt-0.5 text-xs text-slate-300">{activeDemo.application[locale]}</p>
                </div>
                <span className="w-fit shrink-0 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-200">
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
                    'group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all',
                    isSelected
                      ? 'border-[#B81D2B]/70 bg-[#0E2B57] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.5)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="video-chapter-bar"
                      className="absolute inset-y-0 left-0 w-1 bg-[#B81D2B]"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    />
                  )}

                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
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
                          isSelected ? 'text-[#F87171]' : 'text-white/80',
                        )}
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-bold text-white">
                        {demo.title[locale]}
                      </p>
                      <span className="shrink-0 font-mono text-[10px] text-slate-400">
                        {demo.duration}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                      {demo.application[locale]}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-xs text-slate-300">
              <p className="font-semibold text-white">
                {isEs ? 'Pruebas con sus propios envases' : 'Testing with your own containers'}
              </p>
              <p className="mt-1 leading-relaxed text-slate-300">
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
