import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',

  pathnames: {
    '/': '/',
    '/contact': {
      en: '/contact',
      es: '/contacto',
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      es: '/politica-de-privacidad',
    },
    '/terms': {
      en: '/terms-of-service',
      es: '/terminos-de-servicio',
    },
    '/solutions': {
      en: '/solutions',
      es: '/soluciones',
    },
    '/machines/filling-dosing/automatic-weight-filler': {
      en: '/machines/filling-dosing/automatic-weight-filler',
      es: '/maquinas/llenado-dosificacion/llenadora-automatica-por-peso',
    },
    '/machines/filling-dosing/liquid-filling-machine': {
      en: '/machines/filling-dosing/liquid-filling-machine',
      es: '/maquinas/llenado-dosificacion/llenadora-liquidos-para-viales',
    },
    '/machines/sealing-packaging/automatic-capping-sealing-machine': {
      en: '/machines/sealing-packaging/automatic-capping-sealing-machine',
      es: '/maquinas/sellado-empaque/tapadora-selladora-automatica',
    },
    '/machines/labeling-identification/automatic-vial-labeling-machine': {
      en: '/machines/labeling-identification/automatic-vial-labeling-machine',
      es: '/maquinas/etiquetado-identificacion/etiquetadora-automatica-de-viales',
    },
  },
});
