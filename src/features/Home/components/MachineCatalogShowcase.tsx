'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Play, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoModal } from '@/components/ui/VideoModal';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import {
  MACHINE_CATALOG,
  MachineCatalogItem,
  CatalogTabId,
  Locale,
} from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

const TAB_LABELS: Record<CatalogTabId, Record<Locale, string>> = {
  all: { en: 'All Systems', es: 'Todos' },
  filling: { en: 'Filling & Dosing', es: 'Llenado' },
  capping: { en: 'Capping', es: 'Tapado' },
  labeling: { en: 'Labeling', es: 'Etiquetado' },
  line: { en: 'Turnkey Lines', es: 'Líneas' },
};
const TAB_ORDER: CatalogTabId[] = ['all', 'filling', 'capping', 'labeling', 'line'];

interface VideoSelection {
  url: string;
  title: string;
  description: string;
  slug: string;
}

interface MachineCardProps {
  machine: MachineCatalogItem;
  index: number;
  locale: Locale;
  featured: boolean;
  onPlay: (video: VideoSelection) => void;
}

function MachineStudioCard({ machine, index, locale, featured, onPlay }: MachineCardProps) {
  const isEs = locale === 'es';
  const labels = isEs
    ? { speed: 'Velocidad', acc: 'Precisión', build: 'Construcción', specs: 'Ficha técnica', quote: 'Cotizar', video: 'Ver Video' }
    : { speed: 'Output', acc: 'Accuracy', build: 'Build', specs: 'Full specs', quote: 'Get quote', video: 'Watch Demo' };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      className={cn(
        'chamfer-card surface-card-elevated group relative flex overflow-hidden hover:-translate-y-1',
        featured ? 'lg:col-span-2 flex-col lg:flex-row' : 'flex-col',
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#1E3A5F] to-[#9E1C28] transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />

      {/* Recessed CAD Viewport Stage */}
      <div
        className={cn(
          'p-3 bg-transparent',
          featured ? 'lg:w-[52%]' : '',
        )}
      >
        <div
          className={cn(
            'cad-viewport relative h-full w-full overflow-hidden',
            featured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-[320px]' : 'aspect-[4/3]',
          )}
        >
        {machine.isStudioCutout ? (
          <Image
            src={machine.image}
            alt={machine.title}
            fill
            sizes={featured ? '(min-width:1024px) 42vw, 100vw' : '(min-width:1024px) 30vw, 100vw'}
            className="object-contain p-7 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <Image
            src={machine.image}
            alt={machine.title}
            fill
            sizes={featured ? '(min-width:1024px) 42vw, 100vw' : '(min-width:1024px) 30vw, 100vw'}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        )}

        {machine.videoUrl && (
          <button
            type="button"
            onClick={() =>
              onPlay({
                url: machine.videoUrl as string,
                title: machine.title,
                description: machine.subtitle[locale],
                slug: machine.id,
              })
            }
            className="btn-satin-obsidian absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FAF9F6]"
          >
            <Play className="h-3 w-3 fill-current text-[#E04F5C]" aria-hidden="true" />
            <span>{labels.video}</span>
          </button>
        )}
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col justify-between p-6', featured && 'lg:p-9')}>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
            {machine.categoryLabel[locale]}
          </span>
          <h3
            className={cn(
              'mt-2 font-black tracking-[-0.025em] text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]',
              featured ? 'text-2xl lg:text-3xl' : 'text-xl',
            )}
          >
            {machine.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#475263]">
            {machine.subtitle[locale]}
          </p>

          {featured && (
            <ul className="mt-5 space-y-2">
              {machine.highlights[locale].map((point) => (
                <li key={point} className="flex items-center gap-2 text-xs font-medium text-[#2D3748]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#1E3A5F]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-3 divide-x divide-[#0F141E]/[0.09] border border-[#0F141E]/[0.08] bg-[#EAE8E1]/75 py-2.5 text-center">
            <div className="px-2">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5C6575]">
                {labels.speed}
              </div>
              <div className="mt-0.5 font-mono text-xs font-bold tabular-nums text-[#0F141E]">
                {machine.specs.speed}
              </div>
            </div>
            <div className="px-2">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5C6575]">
                {labels.acc}
              </div>
              <div className="mt-0.5 font-mono text-xs font-bold tabular-nums text-[#0F141E]">
                {machine.specs.accuracy}
              </div>
            </div>
            <div className="px-2">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#5C6575]">
                {labels.build}
              </div>
              <div className="mt-0.5 font-mono text-xs font-bold text-[#0F141E]">
                {machine.specs.material}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Link
              href={machine.link}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1E3A5F] transition-colors hover:text-[#9E1C28]"
            >
              <span>{labels.specs}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href={{ pathname: '/contact', query: { machine: machine.id } }}
              className="btn-satin-obsidian chamfer-btn px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
            >
              {labels.quote}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function MachineCatalogShowcase() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';
  const [activeTab, setActiveTab] = useState<CatalogTabId>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoSelection | null>(null);

  const filteredMachines =
    activeTab === 'all'
      ? MACHINE_CATALOG.slice(0, 3)
      : MACHINE_CATALOG.filter((m) => m.category === activeTab);

  return (
    <section
      id="catalog"
      className="relative overflow-hidden bg-[#F4F3EF] py-20 lg:py-28"
    >
      <InteractivePrecisionField theme="light" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E1C28]">
              {isEs ? 'Catálogo Destacado' : 'Featured Equipment'}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-[1.04] tracking-[-0.03em] text-[#0F141E] sm:text-4xl lg:text-5xl">
              {isEs ? 'Equipos listos para ' : 'Machinery built for '}
              <span className="text-[#1E3A5F]">
                {isEs ? 'producción continua.' : 'continuous output.'}
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#475263] sm:text-base">
              {isEs
                ? 'Una selección de nuestros equipos en línea. Contamos con modelos de mayor velocidad y soluciones industriales adicionales bajo solicitud.'
                : 'A featured selection of our equipment. Additional high-speed models and industrial configurations are available on request.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={isEs ? 'Categorías de maquinaria' : 'Machinery categories'}
            className="inline-flex flex-wrap items-center gap-1 border border-[#0F141E]/[0.10] bg-[#FAF9F6] p-1.5 shadow-sm"
          >
            {TAB_ORDER.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'relative px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors',
                    isSelected ? 'text-[#FAF9F6]' : 'text-[#525E70] hover:text-[#0F141E]',
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="catalog-active-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 bg-[#0E131D]"
                    />
                  )}
                  <span className="relative z-10">{TAB_LABELS[tab][locale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredMachines.map((machine, idx) => (
              <MachineStudioCard
                key={machine.id}
                machine={machine}
                index={idx}
                locale={locale}
                featured={activeTab === 'all' && idx === 0}
                onPlay={setSelectedVideo}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Direct Link to Full /machines Catalog */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 border border-[#0F141E]/[0.10] bg-[#FAF9F6] px-6 py-6 sm:flex-row sm:px-8"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div>
            <p className="text-base font-bold tracking-[-0.015em] text-[#0F141E]">
              {isEs ? '¿Quieres explorar toda nuestra maquinaria?' : 'Want to explore our complete equipment lineup?'}
            </p>
            <p className="mt-0.5 text-sm text-[#525E70]">
              {isEs
                ? 'Accede al catálogo completo con buscador, categorías y fichas técnicas.'
                : 'Browse the full machinery catalog with category filters and technical sheets.'}
            </p>
          </div>
          <Link
            href="/machines"
            className="chamfer-btn btn-satin-obsidian group inline-flex shrink-0 items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
          >
            <span>{isEs ? 'Ver todo el catálogo' : 'View full catalog'}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          isOpen
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          description={selectedVideo.description}
          machineSlug={selectedVideo.slug}
        />
      )}
    </section>
  );
}
