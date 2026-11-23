import type { Metadata } from 'next';
import { Locale } from '@/features/Home/data/catalogData';
import { INSTALLATIONS_FEED } from '@/features/InAction/data/installationsData';
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
      ? 'En Acción: Instalaciones y Líneas en Planta'
      : 'In Action: Commissioned Installations & Plant Lines',
    description: isEs
      ? 'Vea nuestras instalaciones reales y puestas en marcha en Miami, Houston y EE. UU.: líneas VFFS multicabezal de 14 cabezales, embotellado rotativo y automatización PLC.'
      : 'See real commissioned installations across Miami, Houston, and the US: 14-head multihead VFFS lines, turnkey rotary bottling plants, and live PLC automation.',
    enPath: '/en/in-action',
    esPath: '/es/en-accion',
    ogImage: '/media/in-action/complete-bottling-line-houston-panoramic-poster.webp',
  });
}

export default async function InActionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'es' ? 'es' : 'en';

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'es' ? 'Instalaciones en Planta — JMK Robotics' : 'JMK Robotics Plant Installations',
    url: `${SITE_URL}${locale === 'es' ? '/es/en-accion' : '/en/in-action'}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: INSTALLATIONS_FEED.length,
      itemListElement: INSTALLATIONS_FEED.map((entry, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: entry.title[locale],
        description: entry.summary[locale],
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  );
}
