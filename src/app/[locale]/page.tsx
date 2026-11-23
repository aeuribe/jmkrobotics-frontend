import type { Metadata } from 'next';
import Home from './features/Home/Home';
import { Locale } from '@/features/Home/data/catalogData';
import { buildLocalizedMetadata } from '@/lib/seo';

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
      ? 'Maquinaria Industrial y Líneas de Producción Completas'
      : 'Industrial Machinery & Complete Production Lines',
    description: isEs
      ? 'Equipos industriales y líneas completas llave en mano: llenado, pesaje multicabezal, VFFS, tapado rotativo, etiquetado y envolvedoras con soporte en Miami.'
      : 'Standalone industrial machinery and turnkey production lines: filling, multihead weighing, VFFS, rotary capping, labeling, and pallet wrappers backed out of Miami.',
    enPath: '/en',
    esPath: '/es',
  });
}

export default function HomePage() {
  return <Home />;
}
