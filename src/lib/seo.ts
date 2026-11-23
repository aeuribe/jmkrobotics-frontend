import type { Metadata } from 'next';
import { Locale } from '@/features/Home/data/catalogData';

export const SITE_URL = 'https://jmkrobotics.com';
export const DEFAULT_OG_IMAGE = '/media/hero/hero-pesadora-multicabezal-vffs-jmk.webp';

interface BuildMetadataParams {
  locale: Locale;
  title: string;
  description: string;
  enPath: string;
  esPath: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildLocalizedMetadata({
  locale,
  title,
  description,
  enPath,
  esPath,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
}: BuildMetadataParams): Metadata {
  const canonicalPath = locale === 'es' ? esPath : enPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}${enPath}`,
        es: `${SITE_URL}${esPath}`,
        'x-default': `${SITE_URL}${enPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'JMK Robotics',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 1200,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildOrganizationJsonLd(locale: Locale) {
  const isEs = locale === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'IndustrialBusiness'],
    name: 'JMK Robotics',
    url: SITE_URL,
    logo: `${SITE_URL}/JMKRobotics.png`,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description: isEs
      ? 'Proveedor de maquinaria industrial de envasado, dosificación, tapado, etiquetado y líneas de producción llave en mano desde Miami, Florida.'
      : 'Supplier of industrial packaging machinery, filling, rotary capping, labeling, inspection, and complete turnkey production lines out of Miami, Florida.',
    telephone: '+1-786-258-7335',
    email: 'info@servicesjmk.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: ['US', 'MX', 'CO', 'DO', 'PR', 'PA', 'CR', 'PE', 'CL', 'EC'],
    sameAs: ['https://www.youtube.com/@servicesjmk'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-786-258-7335',
      contactType: 'sales',
      availableLanguage: ['English', 'Spanish'],
    },
  };
}
