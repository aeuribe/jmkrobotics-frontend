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
    label: { en: 'All Machinery', es: 'Todo el Catálogo' },
    href: '/machines',
  },
];

const COMPANY_LINKS: FooterNavItem[] = [
  { label: { en: 'Home', es: 'Inicio' }, href: '/' },
  { label: { en: 'Machinery', es: 'Maquinaria' }, href: '/machines' },
  { label: { en: 'In Action', es: 'En Acción' }, href: '/in-action' },
  { label: { en: 'Request Quote', es: 'Cotizar Maquinaria' }, href: '/contact' },
  { label: { en: 'Terms of Service', es: 'Términos de Servicio' }, href: '/terms' },
  { label: { en: 'Privacy Policy', es: 'Política de Privacidad' }, href: '/privacy-policy' },
];

export function Footer() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="obsidian-stage relative text-[#94A3B8]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Block */}
          <div className="space-y-5 lg:col-span-2">
            <Link
              href="/"
              aria-label="JMK Robotics Home"
              className="inline-flex bg-[#FAF9F6] px-4 py-2.5 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/JMKRobotics.png"
                alt="JMK Robotics"
                width={150}
                height={34}
                className="h-8 w-auto object-contain contrast-[1.15] drop-shadow-[0_1px_1px_rgba(92,101,117,0.45)]"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              {isEs
                ? 'Maquinaria industrial de envasado — suministrada, calibrada y respaldada desde Miami.'
                : 'Industrial packaging machinery — supplied, calibrated, and supported out of Miami.'}
            </p>

            <div className="max-w-sm border border-white/[0.08] bg-white/[0.025] p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#FAF9F6]">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>JMK Robotics</span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D15A65]" />
                <span>Miami, Florida — USA</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                <a
                  href="tel:+17862587335"
                  className="inline-flex items-center gap-1.5 font-mono text-[#CBD5E1] hover:text-[#FAF9F6]"
                >
                  <Phone className="h-3 w-3 text-[#D15A65]" />
                  <span>+1 (786) 258-7335</span>
                </a>
                <a
                  href="mailto:info@servicesjmk.com"
                  className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#FAF9F6]"
                >
                  <Mail className="h-3 w-3 text-[#D15A65]" />
                  <span>info@servicesjmk.com</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E7787]">
              {isEs ? 'Maquinaria' : 'Machinery'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {MACHINERY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E7787]">
              {isEs ? 'Empresa' : 'Company'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E7787]">
              {isEs ? 'Soporte Directo' : 'Direct Support'}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://servicesjmk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                >
                  <span>Services JMK (Miami)</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-65" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@servicesjmk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                >
                  <span>{isEs ? 'Canal de YouTube' : 'YouTube Channel'}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-65" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+17862587335"
                  className="inline-flex items-center gap-1.5 font-mono text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D15A65]" />
                  <span>+1 (786) 258-7335</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@servicesjmk.com"
                  className="inline-flex items-center gap-1.5 text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#D15A65]" />
                  <span>info@servicesjmk.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/[0.08] bg-[#090D14]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[#6E7787] sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} JMK Robotics.{' '}
            {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#CBD5E1] transition-colors hover:text-[#FAF9F6]"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>{isEs ? 'Subir' : 'Back to top'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
