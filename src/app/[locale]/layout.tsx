import type { Metadata } from 'next';
import { satoshi } from '../fonts';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { FloatingContactDock } from '@/components/layout/FloatingContactDock';
import { Locale } from '@/features/Home/data/catalogData';
import { SITE_URL, DEFAULT_OG_IMAGE, buildOrganizationJsonLd } from '@/lib/seo';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'es' ? 'es' : 'en';
  const isEs = locale === 'es';

  const defaultTitle = isEs
    ? 'JMK Robotics | Maquinaria Industrial y Líneas de Producción'
    : 'JMK Robotics | Industrial Machinery & Turnkey Production Lines';
  const description = isEs
    ? 'Suministro, instalación y puesta en marcha de maquinaria industrial de envasado, llenado, tapado, VFFS y líneas completas llave en mano desde Miami, Florida.'
    : 'Supply, installation, and commissioning of industrial packaging machinery, filling, rotary capping, VFFS, and complete turnkey production lines from Miami, FL.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: '%s | JMK Robotics',
    },
    description,
    applicationName: 'JMK Robotics',
    keywords: isEs
      ? [
          'maquinaria industrial',
          'líneas de producción llave en mano',
          'pesadora multicabezal',
          'envasadora vertical VFFS',
          'llenadora de líquidos',
          'tapadora rotativa',
          'etiquetadora industrial',
          'envolvedora de pallets',
          'JMK Robotics Miami',
        ]
      : [
          'industrial packaging machinery',
          'turnkey production lines',
          'multihead weigher',
          'vertical form fill seal VFFS',
          'rotary bottle filling capping',
          'automatic pallet stretch wrapper',
          'inline labeling machine',
          'JMK Robotics Miami',
        ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/JMKRobotics.png',
    },
    openGraph: {
      title: defaultTitle,
      description,
      siteName: 'JMK Robotics',
      locale: isEs ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1600,
          height: 1200,
          alt: defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const orgJsonLd = buildOrganizationJsonLd(locale as Locale);

  return (
    <html lang={locale}>
      <body className={`${satoshi.variable} ${plusJakartaSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        <NextIntlClientProvider locale={locale}>
          {children}
          <FloatingContactDock />
        </NextIntlClientProvider>

        <Script
          src="https://analytics.servicesjmk.com/script.js"
          data-website-id="b1ebe2cd-57c9-4e85-b145-066294c2a8ae"
          data-domains="jmkrobotics.com,www.jmkrobotics.com"
          strategy="afterInteractive"
        />
      </body>
      <GoogleAnalytics gaId="G-BYCEDB4F99" />
    </html>
  );
}
