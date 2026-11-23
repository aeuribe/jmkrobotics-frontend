import type { Metadata } from 'next';
import { Locale, MACHINE_CATALOG, getMachineTitle } from '@/features/Home/data/catalogData';
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
      ? 'Catálogo de Maquinaria Industrial de Envasado y Líneas'
      : 'Industrial Packaging Machinery & Production Line Catalog',
    description: isEs
      ? 'Explore 19+ sistemas industriales: pesadoras multicabezal, VFFS, llenadoras rotativas, tapadoras, etiquetadoras, detectores de metales y envolvedoras de pallets.'
      : 'Explore 19+ industrial systems: multihead weighers, VFFS baggers, rotary fillers & cappers, inline labelers, metal detectors, checkweighers, and pallet wrappers.',
    enPath: '/en/machines',
    esPath: '/es/maquinas',
    ogImage: '/media/catalogo/jmk-multihead-weigher-industrial.webp',
  });
}

export default async function MachinesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'es' ? 'es' : 'en';

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'es' ? 'Catálogo de Maquinaria JMK Robotics' : 'JMK Robotics Machinery Catalog',
    url: `${SITE_URL}${locale === 'es' ? '/es/maquinas' : '/en/machines'}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: MACHINE_CATALOG.length,
      itemListElement: MACHINE_CATALOG.map((machine, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: getMachineTitle(machine, locale),
          description: machine.subtitle[locale],
          category: machine.categoryLabel[locale],
          image: machine.image.startsWith('http') ? machine.image : `${SITE_URL}${machine.image}`,
          brand: { '@type': 'Brand', name: 'JMK Robotics' },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
