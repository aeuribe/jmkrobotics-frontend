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
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VideoModal } from '@/components/ui/VideoModal';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';
import {
  MACHINE_CATALOG,
  CATALOG_CATEGORY_LABELS,
  CATALOG_TAB_ORDER,
  MachineCatalogItem,
  CatalogTabId,
  Locale,
  getMachineTitle,
} from '@/features/Home/data/catalogData';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface VideoSelection {
  url: string;
  title: string;
  description: string;
  slug: string;
}

interface CatalogMachineCardProps {
  machine: MachineCatalogItem;
  index: number;
  locale: Locale;
  onPlay: (video: VideoSelection) => void;
}

function CatalogMachineCard({ machine, index, locale, onPlay }: CatalogMachineCardProps) {
  const isEs = locale === 'es';
  const displayTitle = getMachineTitle(machine, locale);
  const images = machine.gallery && machine.gallery.length > 0 ? machine.gallery : [machine.image];
  const [imgIdx, setImgIdx] = useState(0);
  const hasGallery = images.length > 1;

  const labels = isEs
    ? { speed: 'Velocidad', acc: 'Precisión', build: 'Material', specs: 'Ficha técnica', quote: 'Cotizar', video: 'Ver Video' }
    : { speed: 'Output', acc: 'Accuracy', build: 'Build', specs: 'Full specs', quote: 'Get quote', video: 'Watch Demo' };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index, 6) * 0.04 }}
      className="chamfer-card surface-card-elevated group relative flex flex-col justify-between overflow-hidden"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#1E3A5F] to-[#9E1C28] transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />

      <div>
        {/* CAD Viewport with Multi-Photo Gallery Controls */}
        <div className="p-3 bg-transparent">
          <div className="cad-viewport relative aspect-[4/3] w-full overflow-hidden">
            {machine.isStudioCutout ? (
              <Image
                src={images[imgIdx]}
                alt={machine.title}
                fill
                sizes="(min-width:1024px) 30vw, 95vw"
                className="object-contain p-7 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <Image
                src={images[imgIdx]}
                alt={machine.title}
                fill
                sizes="(min-width:1024px) 30vw, 95vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}

            {hasGallery && (
              <>
                <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 border border-white/15 bg-[#0E131D]/80 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#FAF9F6] backdrop-blur">
                  <Layers className="h-3 w-3 text-[#D15A65]" />
                  <span>
                    {imgIdx + 1} / {images.length}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setImgIdx((prev) => (prev - 1 + images.length) % images.length)}
                    aria-label={isEs ? 'Foto anterior' : 'Previous photo'}
                    className="border border-white/15 bg-[#0E131D]/80 p-1.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setImgIdx((prev) => (prev + 1) % images.length)}
                    aria-label={isEs ? 'Siguiente foto' : 'Next photo'}
                    className="border border-white/15 bg-[#0E131D]/80 p-1.5 text-white backdrop-blur transition-colors hover:bg-[#9E1C28]"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </>
            )}

            {machine.videoUrl && (
              <button
                type="button"
                onClick={() =>
                  onPlay({
                    url: machine.videoUrl as string,
                    title: displayTitle,
                    description: machine.subtitle[locale],
                    slug: machine.id,
                  })
                }
                className="btn-satin-obsidian absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FAF9F6]"
              >
                <Play className="h-3 w-3 fill-current text-[#D15A65]" />
                <span>{labels.video}</span>
              </button>
            )}
          </div>
        </div>

        <div className="px-6 pb-5 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
            {machine.categoryLabel[locale]}
          </span>
          <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]">
            {displayTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#475263]">
            {machine.subtitle[locale]}
          </p>

          <ul className="mt-4 space-y-1.5">
            {machine.highlights[locale].map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs text-[#475263]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E3A5F]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-6">
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
          {machine.link && machine.link !== '/machines' ? (
            <Link
              href={machine.link}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1E3A5F] transition-colors hover:text-[#9E1C28]"
            >
              <span>{labels.specs}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#5C6575]">
              {isEs ? 'Configuración a medida' : 'Custom configuration'}
            </span>
          )}

          <Link
            href={{ pathname: '/contact', query: { machine: machine.id } }}
            className="btn-satin-obsidian chamfer-btn px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
          >
            {labels.quote}
          </Link>
        </div>
      </div>
    </motion.article>
  );
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

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#1E3A5F] selection:text-[#FAF9F6]">
      <Header />

      <main>
        {/* Catalog Hero + Filter Toolbar */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-14 lg:py-20">
          <InteractivePrecisionField theme="light" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E1C28]">
                JMK Robotics · {isEs ? 'Catálogo Completo' : 'Full Equipment Catalog'}
              </p>
              <div className="mt-4 h-[2px] w-14 bg-gradient-to-r from-[#9E1C28] to-[#1E3A5F]" />
              <h1 className="mt-5 text-4xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-5xl">
                {isEs ? 'Maquinaria industrial y líneas completas.' : 'Industrial machinery & production lines.'}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475263] sm:text-lg">
                {isEs
                  ? 'Explore nuestros equipos y líneas disponibles por proceso. Si necesita una capacidad superior o maquinaria especializada adicional, nuestro equipo la cotiza a medida.'
                  : 'Browse our equipment and complete lines by process. For higher throughput or specialized machinery beyond this list, our team configures it on request.'}
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div
                role="tablist"
                aria-label={isEs ? 'Categorías de maquinaria' : 'Machinery categories'}
                className="inline-flex flex-wrap items-center gap-1 border border-[#0F141E]/[0.10] bg-[#F4F3EF] p-1.5"
              >
                {CATALOG_TAB_ORDER.map((tab) => {
                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'relative px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.09em] transition-colors',
                        isSelected ? 'text-[#FAF9F6]' : 'text-[#525E70] hover:text-[#0F141E]',
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="machines-page-tab-pill"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          className="absolute inset-0 bg-[#0E131D]"
                        />
                      )}
                      <span className="relative z-10">{CATALOG_CATEGORY_LABELS[tab][locale]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full shrink-0 lg:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6575]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? 'Filtrar por equipo...' : 'Filter by machine...'}
                  aria-label={isEs ? 'Filtrar maquinaria' : 'Filter machinery'}
                  className="w-full border border-[#0F141E]/[0.13] bg-[#F4F3EF] py-2.5 pl-10 pr-9 text-sm text-[#0F141E] placeholder-[#8A94A6] focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
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
                  <CatalogMachineCard
                    key={machine.id}
                    machine={machine}
                    index={idx}
                    locale={locale}
                    onPlay={setSelectedVideo}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredMachines.length === 0 && (
              <div className="border border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 text-center">
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
                  className="btn-satin-obsidian chamfer-btn mt-4 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF9F6]"
                >
                  {isEs ? 'Mostrar todo' : 'Reset filters'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Custom / High-Speed Machinery Banner */}
        <section className="obsidian-stage border-t border-white/[0.08] py-16 text-[#F4F3EF] lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black tracking-[-0.025em] text-[#FAF9F6] sm:text-3xl">
                {isEs
                  ? '¿Buscas una máquina de mayor velocidad o una línea especial?'
                  : 'Looking for higher-speed or specialized machinery?'}
              </h2>
              <p className="mt-2 text-sm text-[#94A3B8] sm:text-base">
                {isEs
                  ? 'Suministramos maquinaria industrial más allá de los modelos publicados aquí. Cuéntanos tu producto y te cotizamos la opción ideal.'
                  : 'We supply industrial packaging machinery well beyond the reference models listed online. Tell us your product and we will quote the right system.'}
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
