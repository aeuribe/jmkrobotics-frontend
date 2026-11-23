import type { MetadataRoute } from 'next';

const BASE_URL = 'https://jmkrobotics.com';

interface LocalizedRouteEntry {
  en: string;
  es: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}

const ROUTES: LocalizedRouteEntry[] = [
  { en: '/en', es: '/es', changeFrequency: 'weekly', priority: 1.0 },
  { en: '/en/machines', es: '/es/maquinas', changeFrequency: 'weekly', priority: 0.95 },
  { en: '/en/in-action', es: '/es/en-accion', changeFrequency: 'weekly', priority: 0.9 },
  { en: '/en/contact', es: '/es/contacto', changeFrequency: 'monthly', priority: 0.85 },
  {
    en: '/en/machines/filling-dosing/automatic-weight-filler',
    es: '/es/maquinas/llenado-dosificacion/llenadora-automatica-por-peso',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    en: '/en/machines/filling-dosing/liquid-filling-machine',
    es: '/es/maquinas/llenado-dosificacion/llenadora-liquidos-para-viales',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    en: '/en/machines/sealing-packaging/automatic-capping-sealing-machine',
    es: '/es/maquinas/sellado-empaque/tapadora-selladora-automatica',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    en: '/en/machines/labeling-identification/automatic-vial-labeling-machine',
    es: '/es/maquinas/etiquetado-identificacion/etiquetadora-automatica-de-viales',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    en: '/en/privacy-policy',
    es: '/es/politica-de-privacidad',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    en: '/en/terms-of-service',
    es: '/es/terminos-de-servicio',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap((route) => {
    const languages = {
      en: `${BASE_URL}${route.en}`,
      es: `${BASE_URL}${route.es}`,
      'x-default': `${BASE_URL}${route.en}`,
    };

    return [
      {
        url: `${BASE_URL}${route.en}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
      {
        url: `${BASE_URL}${route.es}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
    ];
  });
}
