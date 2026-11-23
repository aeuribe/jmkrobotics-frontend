'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import { Locale } from '@/features/Home/data/catalogData';
import {
  INSTALLATIONS_FEED,
  INSTALLATION_CATEGORIES,
  InstallationCategory,
  InstallationEntry,
} from '@/features/InAction/data/installationsData';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface InstallationViewerModalProps {
  entry: InstallationEntry | null;
  initialSlide: number;
  locale: Locale;
  onClose: () => void;
}

function InstallationViewerModal({
  entry,
  initialSlide,
  locale,
  onClose,
}: InstallationViewerModalProps) {
  const isEs = locale === 'es';
  const [slideIdx, setSlideIdx] = useState(initialSlide);

  useEffect(() => {
    setSlideIdx(initialSlide);
  }, [entry, initialSlide]);

  const totalSlides = entry?.slides.length ?? 0;

  const goPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!entry) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [entry, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {entry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={entry.title[locale]}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090D14]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="obsidian-stage chamfer-stage relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-white/[0.12] text-[#F4F3EF] shadow-[0_32px_90px_-16px_rgba(0,0,0,0.8)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.09] px-6 py-4">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#D15A65]">
                  <span>{entry.categoryLabel[locale]}</span>
                  <span className="text-white/25">·</span>
                  <span className="text-[#94A3B8]">{entry.location}</span>
                </div>
                <h2 className="mt-1 truncate text-base font-bold text-[#FAF9F6] sm:text-lg">
                  {entry.title[locale]}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={isEs ? 'Cerrar visor' : 'Close viewer'}
                className="p-2 text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto">
              {/* Active Slide Viewport */}
              <div className="relative aspect-video w-full bg-[#090D14]">
                {entry.slides[slideIdx]?.type === 'youtube' ? (
                  <iframe
                    key={entry.slides[slideIdx].url}
                    src={entry.slides[slideIdx].url}
                    title={entry.slides[slideIdx].caption[locale]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : entry.slides[slideIdx]?.type === 'video' ? (
                  <video
                    key={entry.slides[slideIdx].url}
                    src={entry.slides[slideIdx].url}
                    poster={entry.slides[slideIdx].poster}
                    controls
                    autoPlay
                    muted={Boolean(entry.slides[slideIdx].mutedLoop)}
                    loop={Boolean(entry.slides[slideIdx].mutedLoop)}
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="relative h-full w-full bg-[#EAE8E1]">
                    <Image
                      src={entry.slides[slideIdx].url}
                      alt={entry.slides[slideIdx].caption[locale]}
                      fill
                      sizes="(min-width:1024px) 80vw, 95vw"
                      className="object-contain p-4"
                    />
                  </div>
                )}

                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label={isEs ? 'Anterior' : 'Previous slide'}
                      className="absolute left-3 top-1/2 -translate-y-1/2 border border-white/15 bg-[#090D14]/75 p-2.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label={isEs ? 'Siguiente' : 'Next slide'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 border border-white/15 bg-[#090D14]/75 p-2.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Slide Indicator Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#151C2B]/70 px-6 py-3">
                <p className="text-xs text-[#CBD5E1]">
                  {entry.slides[slideIdx]?.caption[locale]}
                </p>
                {totalSlides > 1 && (
                  <div className="flex items-center gap-2">
                    {entry.slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSlideIdx(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={cn(
                          'h-1.5 transition-all',
                          idx === slideIdx
                            ? 'w-6 bg-[#9E1C28]'
                            : 'w-2 bg-white/25 hover:bg-white/50',
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Summary + Highlights + CTA */}
              <div className="grid gap-6 p-6 md:grid-cols-12">
                <div className="md:col-span-7 space-y-4">
                  <p className="text-sm leading-relaxed text-[#CBD5E1]">
                    {entry.summary[locale]}
                  </p>
                  {entry.story && entry.story.length > 0 && (
                    <div className="space-y-3 border-t border-white/[0.08] pt-3">
                      {entry.story.map((block, bIdx) => (
                        <div key={bIdx} className="space-y-1">
                          {block.heading && (
                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#D15A65]">
                              {block.heading[locale]}
                            </h4>
                          )}
                          <p className="text-xs leading-relaxed text-[#CBD5E1]/90">
                            {block.body[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <ul className="space-y-2 pt-1">
                    {entry.highlights[locale].map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D15A65]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-4 md:col-span-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#94A3B8]">
                      {isEs ? 'Equipo instalado' : 'Commissioned system'}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#FAF9F6]">
                      {entry.equipmentTag[locale]}
                    </p>
                  </div>

                  <Link
                    href={
                      entry.machineSlug
                        ? { pathname: '/contact', query: { machine: entry.machineSlug } }
                        : '/contact'
                    }
                    onClick={onClose}
                    className="chamfer-btn btn-satin-crimson inline-flex items-center justify-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
                  >
                    <span>
                      {isEs ? 'Cotizar un proyecto similar' : 'Quote a similar project'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface InstallationCardProps {
  entry: InstallationEntry;
  index: number;
  locale: Locale;
  onOpen: (entry: InstallationEntry, slideIndex: number) => void;
}

function InstallationCard({ entry, index, locale, onOpen }: InstallationCardProps) {
  const isEs = locale === 'es';
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = entry.slides[activeSlide];
  const hasMultiple = entry.slides.length > 1;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % entry.slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + entry.slides.length) % entry.slides.length);
  };

  const isVideoSlide = currentSlide.type === 'video' || currentSlide.type === 'youtube';
  const previewSrc = isVideoSlide
    ? currentSlide.poster || '/hero-portrait.webp'
    : currentSlide.url;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.05 }}
      className="chamfer-card surface-card-elevated group flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Multi-Slide CAD Viewport */}
        <div className="p-3 bg-transparent">
          <div
            onClick={() => onOpen(entry, activeSlide)}
            className="cad-viewport relative aspect-video w-full cursor-pointer overflow-hidden"
          >
            <Image
              src={previewSrc}
              alt={entry.title[locale]}
              fill
              sizes="(min-width:1024px) 32vw, 95vw"
              className={cn(
                'transition-transform duration-500 group-hover:scale-[1.04]',
                currentSlide.type === 'image' &&
                  previewSrc.endsWith('.webp') &&
                  !previewSrc.includes('/media/')
                  ? 'object-contain p-5 mix-blend-multiply'
                  : 'object-cover',
              )}
            />

            {isVideoSlide && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#090D14]/25 transition-colors group-hover:bg-[#090D14]/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#0E131D]/90 text-[#FAF9F6] shadow-lg transition-all group-hover:scale-110 group-hover:bg-[#9E1C28]">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </span>
              </div>
            )}

            {/* Slide Counter Pill */}
            {hasMultiple && (
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/15 bg-[#0E131D]/80 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#FAF9F6] backdrop-blur">
                <Layers className="h-3 w-3 text-[#D15A65]" />
                <span>
                  {activeSlide + 1} / {entry.slides.length}
                </span>
              </div>
            )}

            {/* Quick Inline Slide Arrows */}
            {hasMultiple && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={isEs ? 'Slide anterior' : 'Previous slide'}
                  className="border border-white/15 bg-[#0E131D]/80 p-1.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={isEs ? 'Siguiente slide' : 'Next slide'}
                  className="border border-white/15 bg-[#0E131D]/80 p-1.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="px-6 pb-5 pt-2">
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
            <span className="text-[#9E1C28]">{entry.categoryLabel[locale]}</span>
            <span className="inline-flex items-center gap-1 font-mono text-[#5C6575]">
              <MapPin className="h-3 w-3" />
              {entry.location}
            </span>
          </div>

          <h2 className="mt-2.5 text-xl font-black leading-snug tracking-[-0.025em] text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]">
            {entry.title[locale]}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#475263]">
            {entry.summary[locale]}
          </p>

          <ul className="mt-4 space-y-1.5">
            {entry.highlights[locale].slice(0, 2).map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-[#475263]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E3A5F]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-3 border-t border-[#0F141E]/[0.08] px-6 py-4">
        <button
          type="button"
          onClick={() => onOpen(entry, activeSlide)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] transition-colors hover:text-[#9E1C28]"
        >
          <span>{isEs ? 'Ver instalación completa' : 'Inspect installation'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <span className="font-mono text-[10px] font-semibold text-[#5C6575]">
          {entry.year}
        </span>
      </div>
    </motion.article>
  );
}

export default function InActionPage() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [activeCategory, setActiveCategory] = useState<InstallationCategory>('all');
  const [viewerState, setViewerState] = useState<{
    entry: InstallationEntry;
    slide: number;
  } | null>(null);

  const filteredEntries =
    activeCategory === 'all'
      ? INSTALLATIONS_FEED
      : activeCategory === 'featured'
        ? INSTALLATIONS_FEED.filter((entry) => entry.featured)
        : INSTALLATIONS_FEED.filter((entry) => entry.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#1E3A5F] selection:text-[#FAF9F6]">
      <Header />

      <main>
        {/* Architectural Hero */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 lg:py-22">
          <InteractivePrecisionField theme="light" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E1C28]">
                {isEs ? 'En Acción · Instalaciones y Puestas en Marcha' : 'In Action · Installations & Commissioning'}
              </p>
              <div className="mt-4 h-[2px] w-14 bg-gradient-to-r from-[#9E1C28] to-[#1E3A5F]" />
              <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.03em] text-[#0F141E] sm:text-5xl lg:text-6xl">
                {isEs
                  ? 'Maquinaria entregada y operando en plantas reales.'
                  : 'Machinery delivered and running in real plants.'}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475263] sm:text-lg">
                {isEs
                  ? 'Registro de nuevas instalaciones, pruebas con envases reales y puestas en marcha de equipos y líneas completas suministradas por JMK Robotics.'
                  : 'A growing archive of new equipment installations, pre-shipment container trials, and complete production line startups delivered by JMK Robotics.'}
              </p>
            </div>

            {/* Category Filter Bar */}
            <div
              role="tablist"
              aria-label={isEs ? 'Filtrar instalaciones' : 'Filter installations'}
              className="mt-10 inline-flex flex-wrap items-center gap-1 border border-[#0F141E]/[0.10] bg-[#F4F3EF] p-1.5"
            >
              {INSTALLATION_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors',
                      isSelected ? 'text-[#FAF9F6]' : 'text-[#525E70] hover:text-[#0F141E]',
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="in-action-tab-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 bg-[#0E131D]"
                      />
                    )}
                    <span className="relative z-10">{cat.label[locale]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Installations Mosaic Grid */}
        <section className="py-16 lg:py-22">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredEntries.map((entry, idx) => (
                  <InstallationCard
                    key={entry.id}
                    entry={entry}
                    index={idx}
                    locale={locale}
                    onOpen={(selected, slide) => setViewerState({ entry: selected, slide })}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredEntries.length === 0 && (
              <div className="border border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 text-center">
                <p className="text-base font-bold text-[#0F141E]">
                  {isEs
                    ? 'Próximamente publicaremos instalaciones en esta categoría.'
                    : 'New installations for this category are being added soon.'}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="btn-satin-obsidian chamfer-btn mt-4 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
                >
                  {isEs ? 'Ver todas' : 'View all'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Obsidian CTA */}
        <section className="obsidian-stage border-t border-white/[0.08] py-16 text-[#F4F3EF] lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black tracking-[-0.025em] text-[#FAF9F6] sm:text-3xl">
                {isEs
                  ? '¿Listo para instalar nueva maquinaria en tu planta?'
                  : 'Planning a new machine or production line?'}
              </h2>
              <p className="mt-2 text-sm text-[#94A3B8] sm:text-base">
                {isEs
                  ? 'Envíanos tus envases para realizar una prueba grabada o solicita una cotización directa con nuestro equipo.'
                  : 'Send us sample containers for a recorded trial or request a tailored proposal from our engineering team.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="chamfer-btn btn-satin-crimson group inline-flex shrink-0 items-center gap-2 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
            >
              <span>{isEs ? 'Solicitar cotización' : 'Request a quote'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <InstallationViewerModal
        entry={viewerState?.entry ?? null}
        initialSlide={viewerState?.slide ?? 0}
        locale={locale}
        onClose={() => setViewerState(null)}
      />
    </div>
  );
}
