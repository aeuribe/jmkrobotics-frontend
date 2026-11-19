'use client';

import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
  machineSlug?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  machineSlug,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const locale = useLocale();
  const isEs = locale === 'es';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen, videoUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#071A36]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-[#071A36] shadow-[0_32px_90px_-16px_rgba(0,0,0,0.75)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E53847] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B81D2B]" />
                </span>
                <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={isEs ? 'Cerrar video' : 'Close video'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                playsInline
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 bg-[#0A2246]/60 px-6 py-4 sm:flex-row sm:items-center">
              <div>
                <p className="max-w-md text-xs text-slate-300">
                  {description ||
                    (isEs
                      ? 'Equipo industrial en pruebas reales de rendimiento y calibración.'
                      : 'Industrial machinery undergoing real performance and calibration trials.')}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    {isEs
                      ? 'Respaldado por Services JMK LLC (Miami, FL)'
                      : 'Backed by Services JMK LLC (Miami, FL)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {isEs ? 'Cerrar' : 'Close'}
                </button>
                <Link
                  href={machineSlug ? { pathname: '/contact', query: { machine: machineSlug } } : '/contact'}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-[#B81D2B] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#D42232]"
                >
                  <span>{isEs ? 'Cotizar Equipo' : 'Request Quote'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
