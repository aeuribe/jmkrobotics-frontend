import type { Metadata } from 'next';
import { Locale } from '@/features/Home/data/catalogData';
import { SITE_URL, buildLocalizedMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'es' ? 'es' : 'en';
  const isEs = locale === 'es';

  return buildLocalizedMetadata({
    locale,
    title: isEs
      ? 'Solicitar Cotización de Maquinaria Industrial'
      : 'Request an Industrial Machinery Quote',
    description: isEs
      ? 'Hable con el equipo de ingeniería de JMK Robotics en Miami. Reciba propuesta técnica y layout para su máquina o línea de producción en 24 horas.'
      : 'Connect with JMK Robotics engineers in Miami. Get a technical proposal and production line layout tailored to your product and target speed within 24 hours.',
    enPath: '/en/contact',
    esPath: '/es/contacto',
  });
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'es' ? 'es' : 'en';

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'es' ? 'Contacto y Cotizaciones — JMK Robotics' : 'Contact & Quotes — JMK Robotics',
    url: `${SITE_URL}${locale === 'es' ? '/es/contacto' : '/en/contact'}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
