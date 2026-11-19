'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  MapPin,
} from 'lucide-react';
import { HeaderSearch } from '@/app/[locale]/components/header/HeaderSearch';
import { MACHINE_CATALOG, Locale } from '@/features/Home/data/catalogData';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMachinesOpen, setIsMachinesOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (targetLocale: Locale) => {
    if (targetLocale === locale) return;
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <>
      <div className="bg-[#071A36] text-slate-300 text-[11px] border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <MapPin className="h-3 w-3 text-[#E53847]" aria-hidden="true" />
            <span className="font-semibold text-white">Miami, FL</span>
            <span className="hidden text-slate-400 sm:inline">
              · {isEs
                ? 'Suministro directo y soporte técnico por Services JMK LLC'
                : 'Direct machinery supply & field support by Services JMK LLC'}
            </span>
          </div>

          <a
            href="tel:+17862587335"
            className="inline-flex items-center gap-1.5 font-mono font-medium text-slate-200 transition-colors hover:text-white"
          >
            <Phone className="h-3 w-3 text-[#E53847]" aria-hidden="true" />
            <span>+1 (786) 258-7335</span>
          </a>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/92 backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(9,24,46,0.14)]'
            : 'bg-white/80 backdrop-blur-md',
          'border-b border-[#0B2D5B]/8',
        )}
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center" aria-label="JMK Robotics Home">
            <div className="relative h-10 w-36 sm:w-40">
              <Image
                src="/JMKRobotics.png"
                alt="JMK Robotics"
                fill
                priority
                className="object-contain object-left drop-shadow-[0_1px_1px_rgba(11,45,91,0.16)] transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            <div
              className="relative"
              onMouseEnter={() => setIsMachinesOpen(true)}
              onMouseLeave={() => setIsMachinesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsMachinesOpen((prev) => !prev)}
                aria-expanded={isMachinesOpen}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isMachinesOpen
                    ? 'bg-[#F1F5F9] text-[#0B2D5B]'
                    : 'text-[#334155] hover:bg-[#F1F5F9]/80 hover:text-[#09182E]',
                )}
              >
                <span>{isEs ? 'Maquinaria' : 'Machinery'}</span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    isMachinesOpen ? 'rotate-180 text-[#B81D2B]' : 'text-[#64748B]',
                  )}
                />
              </button>

              <AnimatePresence>
                {isMachinesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-0 top-full pt-2.5"
                  >
                    <div className="w-[540px] overflow-hidden rounded-2xl border border-[#0B2D5B]/10 bg-white p-3 shadow-[0_24px_60px_-15px_rgba(9,24,46,0.20)]">
                      <div className="grid grid-cols-1 gap-1">
                        {MACHINE_CATALOG.slice(0, 4).map((item) => (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => setIsMachinesOpen(false)}
                            className="group flex items-center gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-[#F8FAFC]"
                          >
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#0B2D5B]/8 bg-[#F1F5F9] p-1">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="48px"
                                className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-[#09182E] transition-colors group-hover:text-[#B81D2B]">
                                  {item.title}
                                </span>
                                <span className="rounded bg-[#0B2D5B]/6 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#0B2D5B]">
                                  {item.specs.speed}
                                </span>
                              </div>
                              <p className="mt-0.5 line-clamp-1 text-xs text-[#64748B]">
                                {item.subtitle[locale]}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#CBD5E1] transition-all group-hover:translate-x-0.5 group-hover:text-[#B81D2B]" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-2.5 flex items-center justify-between border-t border-[#0B2D5B]/8 px-3 pt-2.5 text-xs">
                        <span className="text-[#64748B]">
                          {isEs ? 'Líneas completas sincronizadas' : 'Full turnkey packaging lines'}
                        </span>
                        <Link
                          href="/solutions"
                          onClick={() => setIsMachinesOpen(false)}
                          className="inline-flex items-center gap-1 font-semibold text-[#B81D2B] hover:text-[#0B2D5B]"
                        >
                          <span>{isEs ? 'Ver soluciones' : 'Explore solutions'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#line-flow"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F1F5F9]/80 hover:text-[#09182E]"
            >
              {isEs ? 'Proceso' : 'Process'}
            </a>

            <Link
              href="/solutions"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F1F5F9]/80 hover:text-[#09182E]"
            >
              {isEs ? 'Soluciones' : 'Solutions'}
            </Link>

            <a
              href="#demos"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F1F5F9]/80 hover:text-[#09182E]"
            >
              {isEs ? 'En Acción' : 'Trials'}
            </a>

            <a
              href="#advantage"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#334155] transition-colors hover:bg-[#F1F5F9]/80 hover:text-[#09182E]"
            >
              {isEs ? 'Miami Support' : 'Miami Support'}
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <HeaderSearch />

            <div
              className="inline-flex items-center rounded-full border border-[#0B2D5B]/12 bg-[#F1F5F9] p-0.5 text-[11px] font-bold"
              role="group"
              aria-label="Language switcher"
            >
              {(['en', 'es'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => switchLocale(lang)}
                  className={cn(
                    'rounded-full px-2.5 py-1 uppercase transition-all',
                    locale === lang
                      ? 'bg-[#0B2D5B] text-white shadow-sm'
                      : 'text-[#64748B] hover:text-[#09182E]',
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#B81D2B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0B2D5B] hover:shadow-[0_8px_20px_-6px_rgba(11,45,91,0.4)] active:scale-[0.98]"
            >
              <span>{isEs ? 'Cotizar' : 'Request Quote'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <HeaderSearch />
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="rounded-lg border border-[#0B2D5B]/12 bg-[#F8FAFC] p-2 text-[#09182E]"
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
          className="h-[2px] w-full bg-gradient-to-r from-[#0B2D5B] via-[#B81D2B] to-[#D42232]"
          aria-hidden="true"
        />

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden border-t border-[#0B2D5B]/8 bg-white lg:hidden"
            >
              <div className="space-y-4 px-4 py-5">
                <div className="space-y-1">
                  <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                    {isEs ? 'Maquinaria' : 'Machinery'}
                  </p>
                  {MACHINE_CATALOG.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#09182E] hover:bg-[#F1F5F9]"
                    >
                      <span>{item.title}</span>
                      <span className="font-mono text-[10px] text-[#0B2D5B]">{item.specs.speed}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-1 border-t border-[#0B2D5B]/8 pt-3">
                  <a
                    href="#line-flow"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#334155] hover:bg-[#F1F5F9]"
                  >
                    {isEs ? 'Proceso de Envasado' : 'Packaging Process'}
                  </a>
                  <Link
                    href="/solutions"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#334155] hover:bg-[#F1F5F9]"
                  >
                    {isEs ? 'Soluciones Llave en Mano' : 'Turnkey Solutions'}
                  </Link>
                  <a
                    href="#demos"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[#334155] hover:bg-[#F1F5F9]"
                  >
                    {isEs ? 'Pruebas en Video' : 'Factory Video Trials'}
                  </a>
                </div>

                <div className="flex items-center justify-between border-t border-[#0B2D5B]/8 px-3 pt-3">
                  <span className="text-xs font-medium text-[#64748B]">
                    {isEs ? 'Idioma' : 'Language'}
                  </span>
                  <div className="flex gap-1.5">
                    {(['en', 'es'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => switchLocale(lang)}
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-bold uppercase',
                          locale === lang
                            ? 'bg-[#0B2D5B] text-white'
                            : 'bg-[#F1F5F9] text-[#475569]',
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B81D2B] py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <span>{isEs ? 'Cotizar Maquinaria' : 'Request Equipment Quote'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
