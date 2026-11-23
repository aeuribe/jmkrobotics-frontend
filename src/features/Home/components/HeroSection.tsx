'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';
import {
  LINE_STAGES,
  MARQUEE_APPLICATIONS,
  Locale,
} from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_CAPABILITIES: Record<Locale, string[]> = {
  en: [
    'Filling & Multihead Dosing',
    'VFFS & Doypack Packaging',
    'Rotary Capping & Sealing',
    'Labeling & QC Inspection',
    'Case Sealing & Palletizing',
    'Turnkey Commissioning',
  ],
  es: [
    'Llenado y Pesaje Multicabezal',
    'Envasado VFFS y Doypack',
    'Tapado Rotativo e Inducción',
    'Etiquetado e Inspección QC',
    'Precintado y Envolvedoras',
    'Instalación Llave en Mano',
  ],
};

interface InteractiveSystemsCardProps {
  locale: Locale;
}

function InteractiveSystemsCard({ locale }: InteractiveSystemsCardProps) {
  const isEs = locale === 'es';
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 180,
    damping: 22,
  });

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % LINE_STAGES.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeStage = LINE_STAGES[activeIdx];

  return (
    <div className="relative">
      {/* Ambient Radial Spotlight — scenic depth behind the machinery instrument panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse 68% 64% at 52% 48%, rgba(30, 58, 95, 0.18) 0%, rgba(158, 28, 40, 0.06) 44%, rgba(244, 243, 239, 0) 74%)',
        }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1100,
          boxShadow: 'var(--shadow-float-stage)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
        className="chamfer-stage relative flex flex-col overflow-hidden border border-[#0F141E]/[0.11] bg-[#FAF9F6]/92 backdrop-blur-xl"
      >
        {/* Luxury Instrument Control Header */}
        <div className="flex items-center justify-between border-b border-[#0F141E]/[0.08] bg-gradient-to-b from-[#FAF9F6] to-[#F2F0EA] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[#9E1C28]" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F141E]">
              {activeStage.stageName[locale]}
            </span>
          </div>
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#6E7787] tabular-nums">
            {activeStage.step} / 0{LINE_STAGES.length}
          </span>
        </div>

        {/* Technical CAD Viewport Frame — Live Plant-Floor Video */}
        <div className="p-3 bg-[#FAF9F6]">
          <div className="cad-viewport relative aspect-[4/3] w-full overflow-hidden bg-[#0E131D]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="relative h-full w-full"
              >
                {activeStage.videoUrl ? (
                  <video
                    key={activeStage.videoUrl}
                    src={activeStage.videoUrl}
                    poster={activeStage.poster || activeStage.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={activeStage.image}
                    alt={activeStage.roleTitle[locale]}
                    fill
                    priority
                    sizes="(min-width:1024px) 44vw, 95vw"
                    className="object-cover"
                  />
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E131D]/70 via-transparent to-[#0E131D]/15"
                />

                {/* Live Floor Indicator Pill */}
                <div className="pointer-events-none absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 border border-white/15 bg-[#0E131D]/75 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.14em] text-[#FAF9F6] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span>{isEs ? 'En Planta' : 'Live Floor'}</span>
                </div>

                {/* Floating Specification Readout Bar */}
                <div
                  className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-4 border border-[#0F141E]/[0.12] bg-[#FAF9F6]/96 px-4 py-3 backdrop-blur-md"
                  style={{
                    boxShadow:
                      '0 6px 20px -8px rgba(14,19,29,0.22), inset 0 1px 0 rgba(255,255,255,0.85)',
                  }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold tracking-[-0.015em] text-[#0F141E]">
                      {activeStage.roleTitle[locale]}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[#5C6575]">
                      {activeStage.rangeLabel[locale]}
                    </p>
                  </div>
                  <Link
                    href={activeStage.link}
                    className="btn-satin-obsidian chamfer-btn shrink-0 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
                  >
                    {isEs ? 'Explorar' : 'Explore'}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Machined Bottom Instrument Control Tabs */}
        <div className="grid grid-cols-4 divide-x divide-[#0F141E]/[0.08] border-t border-[#0F141E]/[0.09] bg-[#EAE8E1]/85">
          {LINE_STAGES.map((stage, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'instrument-tab relative px-3 py-3.5 text-left',
                  isSelected
                    ? 'active bg-[#FFFFFF]'
                    : 'bg-transparent',
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="hero-stage-indicator"
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#1E3A5F] to-[#9E1C28]"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    'block font-mono text-[9px] tracking-[0.12em] mb-0.5',
                    isSelected ? 'text-[#9E1C28] font-bold' : 'text-[#5C6575]',
                  )}
                >
                  {stage.step}
                </span>
                <span
                  className={cn(
                    'block truncate text-[11px] font-bold tracking-[-0.01em]',
                    isSelected ? 'text-[#0F141E]' : 'text-[#475263]',
                  )}
                >
                  {stage.stageName[locale]}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const marqueeItems = MARQUEE_APPLICATIONS[locale];

  return (
    <section className="relative overflow-hidden bg-[#F4F3EF]">
      {/* Full-Bleed Atmospheric Factory Video Dissolved Into Warm Alabaster */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          src="/video-hero.webm"
          poster="/hero-portrait.webp"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center opacity-45 scale-[1.02] saturate-[0.75]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(102deg, rgba(244,243,239,0.98) 0%, rgba(244,243,239,0.93) 44%, rgba(244,243,239,0.64) 74%, rgba(14,19,29,0.22) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-20"
          style={{
            background: 'linear-gradient(to bottom, #F4F3EF 0%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background: 'linear-gradient(to top, #F4F3EF 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-22">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column — immediate first paint for fast LCP */}
          <div className="lg:col-span-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E3A5F]">
              JMK Robotics · Miami, Florida
            </p>

            <div className="mt-4 h-[2px] w-14 bg-gradient-to-r from-[#9E1C28] to-[#1E3A5F]" />

            <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.03em] text-[#0F141E] sm:text-5xl xl:text-[3.75rem]">
              {isEs ? (
                <>
                  Maquinaria industrial y{' '}
                  <span className="text-[#1E3A5F]">líneas de producción completas.</span>
                </>
              ) : (
                <>
                  Industrial machinery and{' '}
                  <span className="text-[#1E3A5F]">complete production lines.</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475263]">
              {isEs
                ? 'Diseñamos, suministramos y ponemos en marcha desde equipos independientes hasta líneas automatizadas llave en mano — probadas con su producto y respaldadas desde Miami.'
                : 'We engineer, supply, and commission everything from standalone industrial machines to complete turnkey lines — tested with your product and backed out of Miami.'}
            </p>

            {/* Integrated Capabilities Matrix (replaces standalone Capabilities section) */}
            <ul className="mt-6 grid max-w-xl grid-cols-1 gap-x-4 gap-y-2 border-y border-[#0F141E]/[0.09] py-4 sm:grid-cols-2">
              {HERO_CAPABILITIES[locale].map((cap) => (
                <li key={cap} className="flex items-center gap-2 text-xs font-semibold text-[#1F2937]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#9E1C28]" aria-hidden="true" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                className="chamfer-btn btn-satin-obsidian group inline-flex items-center gap-2.5 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6] active:scale-[0.98]"
              >
                <span>{isEs ? 'Cotizar Mi Proyecto' : 'Quote My Production Line'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center gap-2.5 border border-[#0F141E]/[0.14] bg-[#FAF9F6]/85 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F141E] backdrop-blur-md transition-all hover:border-[#1E3A5F] hover:bg-[#FAF9F6]"
              >
                <Play className="h-3.5 w-3.5 fill-current text-[#9E1C28]" />
                <span>{isEs ? 'Ver video completo' : 'Watch full video'}</span>
              </button>
            </div>

            {/* Lead-Capture Engineering Invitation */}
            <p className="mt-4 max-w-lg text-xs leading-relaxed text-[#5C6575]">
              {isEs
                ? '¿Listo para escalar su planta? Cuéntenos su producto, envase y velocidad objetivo — reciba propuesta técnica y layout en 24h.'
                : 'Ready to scale output? Share your product, container, and target speed — get a technical layout & quote from our Miami team in 24h.'}
            </p>
          </div>

          {/* Right Column — Luxury Engineering Instrument Panel */}
          <div className="lg:col-span-6">
            <InteractiveSystemsCard locale={locale} />
          </div>
        </div>
      </div>

      {/* Architectural Industry Ribbon */}
      <div className="relative z-10 border-y border-[#0F141E]/[0.09] bg-[#FAF9F6] py-3.5 overflow-hidden">
        <div className="animate-marquee items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#475263]">
                {item}
              </span>
              <span className="h-1 w-1 bg-[#9E1C28]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="/videos/line_vial_filler.mp4"
        title={isEs ? 'Línea de Envasado en Operación' : 'Packaging Line in Operation'}
        description={
          isEs
            ? 'Pruebas de funcionamiento y calibración realizadas antes del despacho.'
            : 'Calibration and production testing prior to dispatch.'
        }
        machineSlug="vial-bottling-line"
      />
    </section>
  );
}
