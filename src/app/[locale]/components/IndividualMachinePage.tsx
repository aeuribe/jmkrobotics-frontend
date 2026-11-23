'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Package,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';

const VideoPlayerModal = dynamic(
  () => import('./VideoPlayerModal').then((m) => m.VideoPlayerModal),
  { ssr: false },
);

const EASE = [0.22, 1, 0.36, 1] as const;

export interface IndividualMachinePageProps {
  machineName: string;
  machineImage: string;
  description: string;
  primaryUse: string;
  idealFor: string[];
  commonApplications: string[];
  installationVideos: {
    title: string;
    application: string;
    thumbnail: string;
    videoUrl: string;
  }[];
}

function getYoutubeThumbnail(url: string): string {
  if (!url) return '/hero-portrait.webp';
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match
    ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
    : '/hero-portrait.webp';
}

export function IndividualMachinePage({
  machineName,
  machineImage,
  description,
  primaryUse,
  idealFor,
  commonApplications,
  installationVideos,
}: IndividualMachinePageProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const t = useTranslations('individualMachinePage');

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const firstVideoUrl = installationVideos?.[0]?.videoUrl;

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] selection:bg-[#0E131D] selection:text-white">
      <Header />

      <main>
        {/* Breadcrumb + Asymmetric Studio Hero */}
        <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#F4F3EF] py-12 lg:py-20">
          <InteractivePrecisionField theme="light" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs font-medium text-[#5C6575]"
            >
              <Link href="/" className="transition-colors hover:text-[#1E3A5F]">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1]" />
              <Link href="/machines" className="transition-colors hover:text-[#1E3A5F]">
                {isEs ? 'Maquinaria' : 'Machinery'}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#CBD5E1]" />
              <span className="truncate font-semibold text-[#1E3A5F]">{machineName}</span>
            </nav>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Copy */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="lg:col-span-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
                  {t('industrialEquiment')}
                </p>

                <div className="mt-4 h-[3px] w-14 bg-[#9E1C28]" />

                <h1 className="mt-5 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[#0F141E] sm:text-5xl">
                  {machineName}
                </h1>

                <p className="mt-5 text-base leading-relaxed text-[#475569] sm:text-lg">
                  {description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-[2px] bg-[#0E131D] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_-8px_rgba(11,45,91,0.4)] transition-all hover:bg-[#9E1C28]"
                  >
                    <span>{t('footer.button')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {firstVideoUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(firstVideoUrl)}
                      className="inline-flex items-center gap-2 rounded-[2px] border border-[#0F141E]/[0.13] bg-[#FAF9F6] px-5 py-3.5 text-sm font-semibold text-[#0F141E] shadow-sm transition-all hover:border-[#B81D2B]/40 hover:bg-[#F4F3EF]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-[#9E1C28]/10 text-[#9E1C28]">
                        <Play className="ml-0.5 h-3 w-3 fill-current" />
                      </span>
                      <span>{isEs ? 'Ver en operación' : 'Watch in operation'}</span>
                    </button>
                  )}
                </div>

                {/* Quick Support Reassurance */}
                <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#0F141E]/[0.09] pt-5 text-xs font-medium text-[#475569]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#1E3A5F]" />
                    {isEs ? 'Pruebas con su envase' : 'Pre-shipment sample trials'}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Wrench className="h-4 w-4 text-[#1E3A5F]" />
                    {isEs ? 'Instalación en planta' : 'On-site commissioning'}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-[#1E3A5F]" />
                    {isEs ? 'Repuestos en Miami' : 'Miami parts stock'}
                  </span>
                </div>
              </motion.div>

              {/* Right Studio Frame */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="lg:col-span-6"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] p-8 shadow-[0_28px_70px_-24px_rgba(9,24,46,0.16)] sm:p-12">
                  <div className="relative h-full w-full">
                    <Image
                      src={machineImage}
                      alt={machineName}
                      fill
                      priority
                      sizes="(min-width:1024px) 46vw, 95vw"
                      className="object-contain mix-blend-multiply drop-shadow-[0_18px_24px_rgba(9,24,46,0.10)]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What It Does & Ideal For */}
        <section className="border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
                  {isEs ? 'Descripción Técnica' : 'Overview'}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0F141E]">
                  {t('whatItDoes')}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  {primaryUse}
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-[2px] border border-[#0F141E]/[0.09] bg-[#F4F3EF] p-7 sm:p-8">
                  <h3 className="text-lg font-bold text-[#0F141E]">{t('idealFor')}</h3>
                  <ul className="mt-5 space-y-3.5">
                    {idealFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#334155]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9E1C28]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Videos — High-Contrast Deep Navy Theatre */}
        {installationVideos?.length > 0 && (
          <section className="relative overflow-hidden obsidian-stage py-16 text-white lg:py-24">
            <InteractivePrecisionField theme="dark" />
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F87171]">
                  {isEs ? 'En Operación' : 'In Operation'}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {t('realInstallations')}
                </h2>
                <p className="mt-3 text-sm text-slate-300 sm:text-base">
                  {t('description')}
                </p>
              </div>

              <div
                className={
                  installationVideos.length === 1
                    ? 'mt-10 max-w-2xl'
                    : 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                }
              >
                {installationVideos.map((video, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedVideo(video.videoUrl)}
                    className="group overflow-hidden rounded-[2px] border border-white/12 bg-[#040E20] text-left transition-all hover:-translate-y-1 hover:border-[#B81D2B]/70"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <Image
                        src={video.thumbnail || getYoutubeThumbnail(video.videoUrl)}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                        <span className="flex h-14 w-14 items-center justify-center rounded-[2px] bg-[#9E1C28] text-white shadow-xl transition-transform group-hover:scale-110">
                          <Play className="ml-0.5 h-6 w-6 fill-current" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#F87171]">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300">{video.application}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Common Applications */}
        {commonApplications?.length > 0 && (
          <section className="border-b border-[#0F141E]/[0.09] bg-[#F4F3EF] py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
                  {isEs ? 'Sectores y Usos' : 'Industries & Uses'}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0F141E]">
                  {t('commonApplications')}
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {commonApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] px-5 py-6 text-center text-sm font-semibold text-[#0F141E] shadow-sm transition-all hover:border-[#0B2D5B]/30 hover:-translate-y-0.5"
                  >
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final Quote CTA */}
        <section className="bg-[#FAF9F6] py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-[#0F141E] sm:text-4xl">
              {t('footer.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#475569]">
              {t('footer.description')}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-[2px] bg-[#9E1C28] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_14px_30px_-10px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0E131D]"
              >
                <span>{t('footer.button')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedVideo && (
        <VideoPlayerModal
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
