'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Play,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VideoModal } from '@/components/ui/VideoModal';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import {
  MACHINE_CATALOG,
  CatalogTabId,
  Locale,
} from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

const TAB_LABELS: Record<CatalogTabId, Record<Locale, string>> = {
  all: { en: 'All Machinery', es: 'Toda la Maquinaria' },
  filling: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' },
  capping: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
  labeling: { en: 'Labeling', es: 'Etiquetado' },
  line: { en: 'Complete Lines', es: 'Líneas Completas' },
};

const TAB_ORDER: CatalogTabId[] = ['all', 'filling', 'capping', 'labeling', 'line'];

interface VideoSelection {
  url: string;
  title: string;
  description: string;
  slug: string;
}

export default function MachinesCatalogPage() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [activeTab, setActiveTab] = useState<CatalogTabId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoSelection | null>(null);

  const filteredMachines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MACHINE_CATALOG.filter((machine) => {
      const matchesCategory = activeTab === 'all' || machine.category === activeTab;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        machine.title.toLowerCase().includes(query) ||
        machine.subtitle[locale].toLowerCase().includes(query) ||
        machine.categoryLabel[locale].toLowerCase().includes(query)
      );
    });
  }, [activeTab, searchQuery, locale]);

  const labels = isEs
    ? { speed: 'Velocidad', acc: 'Precisión', build: 'Construcción', specs: 'Ficha técnica', quote: 'Cotizar', video: 'Ver Video' }
    : { speed: 'Output', acc: 'Accuracy', build: 'Build', specs: 'Full specs', quote: 'Get quote', video: 'Watch Demo' };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#0E131D] selection:text-white">
      <Header />

      <main>
        {/* Catalog Hero + Filter Toolbar */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-14 lg:py-20">
          <InteractivePrecisionField theme="light" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
                JMK Robotics · {isEs ? 'Catálogo Completo' : 'Full Equipment Catalog'}
              </p>
              <div className="mt-4 h-[3px] w-14 bg-[#9E1C28]" />
              <h1 className="mt-5 text-4xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-5xl">
                {isEs ? 'Maquinaria industrial de envasado.' : 'Industrial packaging machinery.'}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
                {isEs
                  ? 'Explore nuestras líneas y equipos disponibles. Si necesita una capacidad superior o una máquina especializada que aún no aparece publicada, nuestro equipo la cotiza a medida.'
                  : 'Browse our available equipment and lines. If you need higher throughput or specialized machinery not yet published here, our team configures it on request.'}
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div
                role="tablist"
                aria-label={isEs ? 'Categorías de maquinaria' : 'Machinery categories'}
                className="inline-flex flex-wrap items-center gap-1 rounded-[2px] border border-[#0F141E]/[0.09] bg-[#F4F3EF] p-1.5"
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
                        'relative rounded-[2px] px-3.5 py-2 text-xs font-bold transition-colors',
                        isSelected ? 'text-white' : 'text-[#475569] hover:text-[#0F141E]',
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="machines-page-tab-pill"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          className="absolute inset-0 rounded-[2px] bg-[#0E131D]"
                        />
                      )}
                      <span className="relative z-10">{TAB_LABELS[tab][locale]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6575]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? 'Filtrar por equipo o aplicación...' : 'Filter by machine or use...'}
                  aria-label={isEs ? 'Filtrar maquinaria' : 'Filter machinery'}
                  className="w-full rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] py-2.5 pl-10 pr-9 text-sm text-[#0F141E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={isEs ? 'Limpiar búsqueda' : 'Clear search'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6575] hover:text-[#0F141E]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Full Catalog Grid */}
        <section className="relative overflow-hidden bg-[#F4F3EF] py-14 lg:py-20">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredMachines.map((machine, idx) => (
                  <motion.article
                    layout
                    key={machine.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: EASE, delay: idx * 0.05 }}
                    className="chamfer-card group relative flex flex-col justify-between overflow-hidden border border-[#0F141E]/[0.09] bg-[#FAF9F6] shadow-[0_12px_32px_-16px_rgba(9,24,46,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2D5B]/25 hover:shadow-[0_24px_48px_-18px_rgba(11,45,91,0.18)]"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#9E1C28] transition-transform duration-300 group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#F1F5F9] via-[#F8FAFC] to-[#F1F5F9]/70">
                        {machine.isStudioCutout ? (
                          <Image
                            src={machine.image}
                            alt={machine.title}
                            fill
                            sizes="(min-width:1024px) 30vw, 95vw"
                            className="object-contain p-7 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={machine.image}
                            alt={machine.title}
                            fill
                            sizes="(min-width:1024px) 30vw, 95vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        )}

                        {machine.videoUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedVideo({
                                url: machine.videoUrl as string,
                                title: machine.title,
                                description: machine.subtitle[locale],
                                slug: machine.id,
                              })
                            }
                            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-[2px] obsidian-stage/90 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-lg backdrop-blur transition-all hover:bg-[#9E1C28]"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>{labels.video}</span>
                          </button>
                        )}
                      </div>

                      <div className="p-6">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E1C28]">
                          {machine.categoryLabel[locale]}
                        </span>
                        <h2 className="mt-2 text-xl font-black tracking-tight text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]">
                          {machine.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                          {machine.subtitle[locale]}
                        </p>

                        <ul className="mt-4 space-y-1.5">
                          {machine.highlights[locale].map((point) => (
                            <li key={point} className="flex items-center gap-2 text-xs text-[#334155]">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#9E1C28]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-3 divide-x divide-[#0B2D5B]/10 rounded-[2px] border border-[#0F141E]/[0.09] bg-[#F4F3EF] py-2.5 text-center">
                        <div className="px-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6575]">
                            {labels.speed}
                          </div>
                          <div className="mt-0.5 font-mono text-xs font-bold tabular-nums text-[#1E3A5F]">
                            {machine.specs.speed}
                          </div>
                        </div>
                        <div className="px-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6575]">
                            {labels.acc}
                          </div>
                          <div className="mt-0.5 font-mono text-xs font-bold tabular-nums text-[#1E3A5F]">
                            {machine.specs.accuracy}
                          </div>
                        </div>
                        <div className="px-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6575]">
                            {labels.build}
                          </div>
                          <div className="mt-0.5 font-mono text-xs font-bold text-[#1E3A5F]">
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
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href={{ pathname: '/contact', query: { machine: machine.id } }}
                          className="rounded-[2px] bg-[#0E131D] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#9E1C28]"
                        >
                          {labels.quote}
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredMachines.length === 0 && (
              <div className="rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 text-center">
                <p className="text-base font-semibold text-[#0F141E]">
                  {isEs ? 'No encontramos equipos con ese filtro.' : 'No machinery matched that filter.'}
                </p>
                <p className="mt-1 text-sm text-[#5C6575]">
                  {isEs
                    ? 'Contamos con muchos más equipos fuera de catálogo web. Consúltanos directamente.'
                    : 'We supply many additional industrial systems beyond our web list. Reach out directly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-[2px] bg-[#0E131D] px-5 py-2 text-xs font-bold text-white hover:bg-[#9E1C28] transition-colors"
                >
                  {isEs ? 'Mostrar todo' : 'Reset filters'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Custom / High-Speed Machinery Banner */}
        <section className="border-t border-[#0F141E]/[0.09] obsidian-stage py-16 text-white lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                {isEs
                  ? '¿Buscas una máquina de mayor velocidad o una línea especial?'
                  : 'Looking for higher-speed or specialized machinery?'}
              </h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                {isEs
                  ? 'Suministramos maquinaria industrial más allá de los modelos publicados aquí. Cuéntanos tu producto y te cotizamos la opción ideal.'
                  : 'We supply industrial packaging machinery well beyond the reference models listed online. Tell us your product and we will quote the right system.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-[2px] bg-[#9E1C28] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FAF9F6] hover:text-[#071A36]"
            >
              <span>{isEs ? 'Solicitar cotización' : 'Request a quote'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

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
    </div>
  );
}
