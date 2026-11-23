'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'motion/react';
import {
  Wrench,
  Package,
  ShieldCheck,
  Clock,
  ArrowRight,
  MapPin,
  Phone,
} from 'lucide-react';
import { Locale } from '@/features/Home/data/catalogData';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Capability {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  detail: Record<Locale, string>;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'commissioning',
    Icon: Wrench,
    title: { en: 'On-Site Commissioning', es: 'Puesta en Marcha en Planta' },
    description: {
      en: 'Our technicians travel to your plant to install, calibrate, and get your machinery running at production speed.',
      es: 'Nuestros técnicos viajan a su planta para instalar, calibrar y dejar la maquinaria operando a ritmo de producción.',
    },
    detail: {
      en: 'Installation, PLC setup & operator training',
      es: 'Instalación, ajuste PLC y capacitación',
    },
  },
  {
    id: 'parts',
    Icon: Package,
    title: { en: 'Miami Spare Parts Stock', es: 'Stock de Repuestos en Miami' },
    description: {
      en: 'Critical wear parts stocked in Florida so a sensor or valve never stalls your line waiting on overseas freight.',
      es: 'Repuestos críticos disponibles en Florida para evitar semanas de parada esperando envíos internacionales.',
    },
    detail: {
      en: 'Sensors, pneumatic cylinders, seals & load cells',
      es: 'Sensores, cilindros neumáticos, sellos y celdas',
    },
  },
  {
    id: 'testing',
    Icon: ShieldCheck,
    title: { en: 'Pre-Shipment Sample Trials', es: 'Pruebas Previas con su Envase' },
    description: {
      en: 'Before crating, we run full cycles using your actual bottles, caps, labels, or pouches to guarantee smooth startup.',
      es: 'Antes de embarcar, ejecutamos ciclos reales con sus envases, tapas y etiquetas para asegurar un arranque sin contratiempos.',
    },
    detail: {
      en: 'Validation video approved before dispatch',
      es: 'Video de validación aprobado antes del envío',
    },
  },
  {
    id: 'service',
    Icon: Clock,
    title: { en: 'Direct Field Support', es: 'Soporte Técnico Directo' },
    description: {
      en: 'Direct access to Services JMK LLC technicians in Miami for troubleshooting, maintenance plans, and upgrades.',
      es: 'Acceso directo a los técnicos de Services JMK LLC en Miami para diagnóstico, mantenimiento preventivo y mejoras.',
    },
    detail: {
      en: 'Bilingual English & Spanish support team',
      es: 'Equipo técnico bilingüe en inglés y español',
    },
  },
];

export function AuthorityAdvantage() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  return (
    <section
      id="advantage"
      className="relative bg-[#F8FAFC] py-20 lg:py-28 border-b border-[#0B2D5B]/8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B81D2B]">
                Services JMK LLC · Miami, FL
              </p>

              <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[#09182E] sm:text-4xl lg:text-[2.65rem]">
                {isEs ? (
                  <>
                    Respaldo técnico real{' '}
                    <span className="text-[#0B2D5B]">desde Miami.</span>
                  </>
                ) : (
                  <>
                    Real technical backing{' '}
                    <span className="text-[#0B2D5B]">from Miami.</span>
                  </>
                )}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#475569] sm:text-base">
                {isEs
                  ? 'JMK Robotics y Services JMK LLC trabajan como un solo equipo: suministramos maquinaria de envasado y la respaldamos en Florida con instalación, repuestos y servicio en planta.'
                  : 'JMK Robotics and Services JMK LLC operate as one team — supplying packaging machinery backed in Florida with installation, local parts, and field service.'}
              </p>

              <div className="mt-7 rounded-[2px] border border-[#0B2D5B]/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0B2D5B]">
                  Services JMK LLC
                </p>

                <div className="mt-3 space-y-2 text-xs text-[#475569]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#B81D2B]" />
                    <span>Miami, Florida — USA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#0B2D5B]" />
                    <a
                      href="tel:+17862587335"
                      className="font-mono font-semibold text-[#09182E] hover:text-[#B81D2B]"
                    >
                      +1 (786) 258-7335
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B2D5B] transition-colors hover:text-[#B81D2B]"
              >
                <span>{isEs ? 'Hablar con un ingeniero de proyectos' : 'Talk to a project engineer'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {CAPABILITIES.map((cap, idx) => {
              const Icon = cap.Icon;
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease: EASE, delay: idx * 0.08 }}
                  className="chamfer-card group relative flex flex-col justify-between overflow-hidden border border-[#0B2D5B]/10 bg-white p-6 shadow-[0_1px_2px_rgba(9,24,46,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0B2D5B]/25 hover:shadow-[0_18px_40px_-18px_rgba(11,45,91,0.16)]"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#B81D2B] transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#0B2D5B]/6 text-[#0B2D5B] transition-colors group-hover:bg-[#0B2D5B] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-[#09182E]">
                      {cap.title[locale]}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                      {cap.description[locale]}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#0B2D5B]/8 pt-3">
                    <p className="text-[11px] font-semibold text-[#0B2D5B]">
                      {cap.detail[locale]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
