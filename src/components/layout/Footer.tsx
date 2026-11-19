'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { InternalRoute, Locale } from '@/features/Home/data/catalogData';

interface FooterNavItem {
  label: Record<Locale, string>;
  href: InternalRoute;
}

const MACHINERY_LINKS: FooterNavItem[] = [
  {
    label: { en: 'Automatic Weigh Filler', es: 'Pesadora Lineal Automática' },
    href: '/machines/filling-dosing/automatic-weight-filler',
  },
  {
    label: { en: 'Vial Liquid Filler', es: 'Llenadora de Viales Líquidos' },
    href: '/machines/filling-dosing/liquid-filling-machine',
  },
  {
    label: { en: 'Capping & Sealing Machine', es: 'Tapadora y Selladora Automática' },
    href: '/machines/sealing-packaging/automatic-capping-sealing-machine',
  },
  {
    label: { en: 'Automatic Vial Labeler', es: 'Etiquetadora Automática de Viales' },
    href: '/machines/labeling-identification/automatic-vial-labeling-machine',
  },
  {
    label: { en: 'Turnkey Bottling Lines', es: 'Líneas Completas Llave en Mano' },
    href: '/solutions',
  },
];

const COMPANY_LINKS: FooterNavItem[] = [
  { label: { en: 'Home', es: 'Inicio' }, href: '/' },
  { label: { en: 'Solutions', es: 'Soluciones' }, href: '/solutions' },
  { label: { en: 'Request Quote', es: 'Cotizar Maquinaria' }, href: '/contact' },
  { label: { en: 'Terms of Service', es: 'Términos de Servicio' }, href: '/terms' },
  { label: { en: 'Privacy Policy', es: 'Política de Privacidad' }, href: '/privacy-policy' },
];

export function Footer() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#071A36] text-slate-300">
      <div className="h-[3px] w-full bg-gradient-to-r from-[#0B2D5B] via-[#B81D2B] to-[#0B2D5B]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Services JMK LLC Block (City/State only, no full fiscal street address) */}
          <div className="space-y-5 lg:col-span-2">
            <Link
              href="/"
              aria-label="JMK Robotics Home"
              className="inline-flex rounded-xl bg-white px-4 py-2.5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/JMKRobotics.png"
                alt="JMK Robotics"
                width={150}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              {isEs
                ? 'Maquinaria industrial de envasado — suministrada y respaldada desde Miami por Services JMK LLC.'
                : 'Industrial packaging machinery — supplied, calibrated, and supported from Miami by Services JMK LLC.'}
            </p>

            <div className="max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Services JMK LLC</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E53847]" />
                <span>Miami, Florida — USA</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                <a
                  href="tel:+17862587335"
                  className="inline-flex items-center gap-1.5 font-mono text-slate-200 hover:text-white"
                >
                  <Phone className="h-3 w-3 text-[#E53847]" />
                  <span>+1 (786) 258-7335</span>
                </a>
                <a
                  href="mailto:info@servicesjmk.com"
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white"
                >
                  <Mail className="h-3 w-3 text-[#E53847]" />
                  <span>info@servicesjmk.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Machinery Column */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {isEs ? 'Maquinaria' : 'Machinery'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {MACHINERY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {isEs ? 'Empresa' : 'Company'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Field Support Column */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {isEs ? 'Soporte Directo' : 'Direct Support'}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://servicesjmk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
                >
                  <span>Services JMK (Miami)</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@servicesjmk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
                >
                  <span>{isEs ? 'Canal de YouTube' : 'YouTube Channel'}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+17862587335"
                  className="inline-flex items-center gap-1.5 font-mono text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E53847]" />
                  <span>+1 (786) 258-7335</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@servicesjmk.com"
                  className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-[#E53847]" />
                  <span>info@servicesjmk.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10 bg-[#051228]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} JMK Robotics ·{' '}
            {isEs
              ? 'Una marca de Services JMK LLC. Todos los derechos reservados.'
              : 'A brand of Services JMK LLC. All rights reserved.'}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-300 transition-colors hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>{isEs ? 'Subir' : 'Back to top'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
