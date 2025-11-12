import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Opcional: prefijo en la URL (/en, /es, etc.)
  localePrefix: 'always',

  // Aquí defines los pathnames traducidos
  pathnames: {
    '/': '/',
    '/contact': {
      en: '/contact',
      es: '/contacto'
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      es: '/politica-de-privacidad'
    },
    'terms':{
      en: '/terms-of-service',
      es: '/terminos-de-servicio'
    },
    '/solutions': {
      en: '/solutions',
      es: '/soluciones' 
    }
  }
});
