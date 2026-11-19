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
import {
  ArrowRight,
  Play,
  Maximize2,
  Sliders,
  Video,
} from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';
import {
  LINE_STAGES,
  MARQUEE_APPLICATIONS,
  Locale,
} from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface InteractiveHardwareStageProps {
  locale: Locale;
  onExpandVideo: () => void;
}

function InteractiveHardwareStage({ locale, onExpandVideo }: InteractiveHardwareStageProps) {
  const isEs = locale === 'es';
  const [stageMode, setStageMode] = useState<'studio' | 'reel'>('studio');
  const [activeIdx, setActiveIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 22,
  });

  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (stageMode !== 'studio' || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % LINE_STAGES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [stageMode, isPaused]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
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
    <motion.div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-[#0B2D5B]/10 bg-white shadow-[0_28px_70px_-24px_rgba(9,24,46,0.18)]"
    >
      {/* Clean Top Stage Bar */}
      <div className="flex items-center justify-between border-b border-[#0B2D5B]/8 bg-[#F8FAFC] px-5 py-3.5">
        <span className="text-xs font-bold tracking-wide text-[#0B2D5B]">
          {stageMode === 'studio'
            ? activeStage.stageName[locale]
            : isEs
              ? 'Operación en Planta'
              : 'Factory Floor'}
        </span>

        <div className="inline-flex items-center rounded-full border border-[#0B2D5B]/12 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setStageMode('studio')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all',
              stageMode === 'studio'
                ? 'bg-[#0B2D5B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#09182E]',
            )}
          >
            <Sliders className="h-3 w-3" />
            <span>{isEs ? 'Soluciones' : 'Systems'}</span>
          </button>
          <button
            type="button"
            onClick={() => setStageMode('reel')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all',
              stageMode === 'reel'
                ? 'bg-[#B81D2B] text-white shadow-sm'
                : 'text-[#64748B] hover:text-[#09182E]',
            )}
          >
            <Video className="h-3 w-3" />
            <span>{isEs ? 'Video' : 'Video'}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-white">
        <AnimatePresence mode="wait">
          {stageMode === 'studio' ? (
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative flex h-full w-full items-center justify-center p-6 pb-20 sm:p-10 sm:pb-24"
            >
              <div className="relative h-full w-full">
                <Image
                  src={activeStage.image}
                  alt={activeStage.roleTitle[locale]}
                  fill
                  priority
                  sizes="(min-width:1024px) 44vw, 95vw"
                  className="object-contain mix-blend-multiply drop-shadow-[0_18px_24px_rgba(9,24,46,0.10)]"
                />
              </div>

              {/* Clean Category Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl border border-[#0B2D5B]/10 bg-white/92 px-4 py-3 backdrop-blur-md shadow-sm">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#09182E] truncate">
                    {activeStage.roleTitle[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-[#64748B] truncate">
                    {activeStage.rangeLabel[locale]}
                  </p>
                </div>
                <Link
                  href={activeStage.link}
                  className="shrink-0 rounded-full bg-[#F1F5F9] px-3 py-1.5 text-[11px] font-bold text-[#0B2D5B] transition-colors hover:bg-[#0B2D5B] hover:text-white"
                >
                  {isEs ? 'Explorar' : 'Explore'}
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="factory-reel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative h-full w-full bg-[#071A36]"
            >
              <video
                src="/video-hero.webm"
                poster="/hero-portrait.webp"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071A36]/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 right-5">
                <button
                  type="button"
                  onClick={onExpandVideo}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#09182E] shadow-lg transition-transform hover:scale-105"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-[#B81D2B]" />
                  <span>{isEs ? 'Ver video completo' : 'Watch full video'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Interactive Process Selector Strip */}
      <div className="grid grid-cols-4 divide-x divide-[#0B2D5B]/8 border-t border-[#0B2D5B]/8 bg-[#F8FAFC]">
        {LINE_STAGES.map((stage, idx) => {
          const isSelected = stageMode === 'studio' && activeIdx === idx;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setStageMode('studio');
                setActiveIdx(idx);
              }}
              className={cn(
                'relative px-2.5 py-3 text-left transition-colors',
                isSelected ? 'bg-white' : 'hover:bg-white/60',
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="hero-stage-indicator"
                  className="absolute inset-x-0 top-0 h-[2.5px] bg-[#B81D2B]"
                  transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  'block truncate text-[11px] font-bold',
                  isSelected ? 'text-[#0B2D5B]' : 'text-[#475569]',
                )}
              >
                {stage.stageName[locale]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const marqueeItems = MARQUEE_APPLICATIONS[locale];

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] pt-10 lg:pt-16">
      <div className="precision-dots pointer-events-none absolute inset-0 opacity-55" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 75% 30%, rgba(11, 45, 91, 0.055), transparent 70%), linear-gradient(to bottom, transparent 78%, #F8FAFC 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column — Clean, Confident Positioning (No Metrics Clutter) */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B2D5B]"
            >
              JMK Robotics · Miami, Florida
            </motion.p>

            {/* Logo-inspired Crimson Precision Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
              style={{ transformOrigin: 'left' }}
              className="mt-4 h-[3px] w-14 bg-[#B81D2B]"
            />

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
              className="mt-5 text-4xl font-black leading-[1.04] tracking-[-0.035em] text-[#09182E] sm:text-5xl xl:text-[3.7rem]"
            >
              {isEs ? (
                <>
                  Maquinaria industrial de envasado para{' '}
                  <span className="text-[#0B2D5B]">escalar su producción.</span>
                </>
              ) : (
                <>
                  Industrial packaging machinery built to{' '}
                  <span className="text-[#0B2D5B]">scale your plant.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#475569]"
            >
              {isEs
                ? 'Desde equipos individuales hasta líneas automatizadas de alta capacidad — suministrados, probados con su producto y respaldados desde Miami por Services JMK LLC.'
                : 'From standalone packaging equipment to high-capacity automated lines — supplied, tested with your product, and backed out of Miami by Services JMK LLC.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.32 }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0B2D5B] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_-8px_rgba(11,45,91,0.45)] transition-all hover:bg-[#B81D2B] hover:shadow-[0_12px_28px_-8px_rgba(184,29,43,0.45)] active:scale-[0.98]"
              >
                <span>{isEs ? 'Solicitar Cotización' : 'Request a Quote'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#0B2D5B]/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#09182E] shadow-sm transition-all hover:border-[#B81D2B]/40 hover:bg-[#F8FAFC]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B81D2B]/10 text-[#B81D2B] transition-colors group-hover:bg-[#B81D2B] group-hover:text-white">
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>
                <span>{isEs ? 'Ver equipos en acción' : 'Watch in operation'}</span>
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <InteractiveHardwareStage
              locale={locale}
              onExpandVideo={() => setIsVideoOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Industry Ribbon */}
      <div className="border-y border-[#0B2D5B]/10 bg-white py-3.5 overflow-hidden">
        <div className="animate-marquee items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2D5B]/75">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#B81D2B]" aria-hidden="true" />
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
