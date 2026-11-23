'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from 'lucide-react';
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

  const navLinkClass = (active = false) =>
    cn(
      'group relative py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors',
      active ? 'text-[#0F141E]' : 'text-[#525E70] hover:text-[#0F141E]',
    );

  return (
    <>
      {/* High-Contrast Deep Obsidian Top Bar */}
      <div className="bg-[#0B0F17] text-[#CBD5E1] border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] tracking-[0.14em] uppercase sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#F4F3EF]">Miami, Florida</span>
            <span className="hidden h-2.5 w-px bg-white/20 sm:inline-block" aria-hidden="true" />
            <span className="hidden text-[#94A3B8] sm:inline">
              {isEs
                ? 'Maquinaria Industrial y Líneas de Producción'
                : 'Industrial Machinery & Production Lines'}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="mailto:info@servicesjmk.com"
              className="hidden items-center gap-1.5 text-[#CBD5E1] transition-colors hover:text-[#FAF9F6] md:inline-flex normal-case tracking-normal text-[11px]"
            >
              <Mail className="h-3 w-3 text-[#C2414D]" aria-hidden="true" />
              <span>info@servicesjmk.com</span>
            </a>
            <a
              href="tel:+17862587335"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[#FAF9F6] transition-colors hover:text-[#CBD5E1] tracking-normal"
            >
              <Phone className="h-3 w-3 text-[#C2414D]" aria-hidden="true" />
              <span>+1 (786) 258-7335</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Architectural Alabaster Glass Header */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-[#F4F3EF]/92 backdrop-blur-xl shadow-[0_12px_36px_-18px_rgba(14,19,29,0.16)]'
            : 'bg-[#F4F3EF]/85 backdrop-blur-md',
          'border-b border-[#0F141E]/[0.09]',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo — enhanced contrast so ROBOTICS stays crisp on alabaster */}
          <Link href="/" className="group flex items-center" aria-label="JMK Robotics Home">
            <div className="relative h-10 w-36 sm:w-40">
              <Image
                src="/JMKRobotics.png"
                alt="JMK Robotics"
                fill
                priority
                className="object-contain object-left contrast-[1.18] drop-shadow-[0_1px_1.5px_rgba(92,101,117,0.58)] transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            <Link href="/" className={navLinkClass(pathname === '/')}>
              <span>{isEs ? 'Inicio' : 'Home'}</span>
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-[1.5px] bg-[#1E3A5F] transition-transform duration-200 origin-left',
                  pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )}
              />
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsMachinesOpen(true)}
              onMouseLeave={() => setIsMachinesOpen(false)}
            >
              <Link
                href="/machines"
                className={cn(
                  navLinkClass(isMachinesOpen || pathname.startsWith('/machines')),
                  'inline-flex items-center gap-1.5',
                )}
              >
                <span>{isEs ? 'Maquinaria' : 'Machinery'}</span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    isMachinesOpen ? 'rotate-180 text-[#9E1C28]' : 'text-[#6E7787]',
                  )}
                />
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[1.5px] bg-[#1E3A5F] transition-transform duration-200 origin-left',
                    pathname.startsWith('/machines') || isMachinesOpen
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>

              <AnimatePresence>
                {isMachinesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div
                      className="chamfer-card w-[520px] overflow-hidden border border-[#0F141E]/[0.11] bg-[#FAF9F6] p-3.5"
                      style={{ boxShadow: 'var(--shadow-float-stage)' }}
                    >
                      <div className="grid grid-cols-1 gap-1">
                        {MACHINE_CATALOG.slice(0, 4).map((item) => (
                          <Link
                            key={item.id}
                            href={item.link}
                            onClick={() => setIsMachinesOpen(false)}
                            className="group flex items-center gap-3.5 p-2.5 transition-colors hover:bg-[#EAE8E1]/65"
                          >
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-[#0F141E]/[0.08] bg-[#EAE8E1] p-1">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="48px"
                                className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-[#0F141E] transition-colors group-hover:text-[#1E3A5F]">
                                {item.title}
                              </span>
                              <p className="mt-0.5 line-clamp-1 text-xs text-[#6E7787]">
                                {item.subtitle[locale]}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-all group-hover:translate-x-0.5 group-hover:text-[#9E1C28]" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-[#0F141E]/[0.09] px-3 pt-3 text-xs">
                        <span className="text-[#6E7787]">
                          {isEs ? 'Catálogo completo de equipos' : 'Complete equipment catalog'}
                        </span>
                        <Link
                          href="/machines"
                          onClick={() => setIsMachinesOpen(false)}
                          className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[11px] text-[#1E3A5F] hover:text-[#9E1C28]"
                        >
                          <span>{isEs ? 'Ver catálogo' : 'View catalog'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href={`/${locale}#line-flow`} className={navLinkClass()}>
              <span>{isEs ? 'Capacidades' : 'Capabilities'}</span>
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#1E3A5F] transition-transform duration-200 group-hover:scale-x-100" />
            </a>

            <Link href="/in-action" className={navLinkClass(pathname === '/in-action')}>
              <span>{isEs ? 'En Acción' : 'In Action'}</span>
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-[1.5px] bg-[#1E3A5F] transition-transform duration-200 origin-left',
                  pathname === '/in-action' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )}
              />
            </Link>

            <Link href="/contact" className={navLinkClass(pathname === '/contact')}>
              <span>{isEs ? 'Contacto' : 'Contact'}</span>
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-[1.5px] bg-[#1E3A5F] transition-transform duration-200 origin-left',
                  pathname === '/contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )}
              />
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderSearch />

            <span className="h-5 w-px bg-[#0F141E]/[0.12]" aria-hidden="true" />

            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em]"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={cn(
                  'transition-colors',
                  locale === 'en' ? 'text-[#0F141E]' : 'text-[#8A94A6] hover:text-[#0F141E]',
                )}
              >
                EN
              </button>
              <span className="text-[#CBD5E1]">/</span>
              <button
                type="button"
                onClick={() => switchLocale('es')}
                className={cn(
                  'transition-colors',
                  locale === 'es' ? 'text-[#0F141E]' : 'text-[#8A94A6] hover:text-[#0F141E]',
                )}
              >
                ES
              </button>
            </div>

            <Link
              href="/contact"
              className="chamfer-btn btn-satin-obsidian group inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6] active:scale-[0.98]"
            >
              <span>{isEs ? 'Cotizar' : 'Request Quote'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <HeaderSearch />
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="border border-[#0F141E]/[0.12] bg-[#FAF9F6] p-2 text-[#0F141E]"
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Precision Scroll Progress Hairline */}
        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
          className="h-[1.5px] w-full bg-gradient-to-r from-[#0F141E] via-[#1E3A5F] to-[#9E1C28]"
          aria-hidden="true"
        />

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden border-t border-[#0F141E]/[0.09] bg-[#FAF9F6] lg:hidden"
            >
              <div className="space-y-4 px-4 py-6">
                <div className="space-y-1">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0F141E] hover:bg-[#EAE8E1]/60"
                  >
                    {isEs ? 'Inicio' : 'Home'}
                  </Link>
                  <Link
                    href="/machines"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1E3A5F] hover:bg-[#EAE8E1]/60"
                  >
                    {isEs ? 'Maquinaria' : 'Machinery'}
                  </Link>
                  <a
                    href={`/${locale}#line-flow`}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#475263] hover:bg-[#EAE8E1]/60"
                  >
                    {isEs ? 'Capacidades' : 'Capabilities'}
                  </a>
                  <Link
                    href="/in-action"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#475263] hover:bg-[#EAE8E1]/60"
                  >
                    {isEs ? 'En Acción' : 'In Action'}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#475263] hover:bg-[#EAE8E1]/60"
                  >
                    {isEs ? 'Contacto' : 'Contact'}
                  </Link>
                </div>

                <div className="flex items-center justify-between border-t border-[#0F141E]/[0.09] px-3 pt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E7787]">
                    {isEs ? 'Idioma' : 'Language'}
                  </span>
                  <div className="flex gap-3 text-xs font-bold tracking-widest">
                    {(['en', 'es'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => switchLocale(lang)}
                        className={cn(
                          'uppercase',
                          locale === lang
                            ? 'text-[#1E3A5F] underline underline-offset-4'
                            : 'text-[#6E7787]',
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
                  className="chamfer-btn btn-satin-obsidian flex w-full items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]"
                >
                  <span>{isEs ? 'Solicitar Cotización' : 'Request Quote'}</span>
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
