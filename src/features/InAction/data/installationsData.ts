import { Locale } from '@/features/Home/data/catalogData';

export type InstallationCategory =
  | 'all'
  | 'turnkey-line'
  | 'filling'
  | 'capping-labeling'
  | 'factory-trial';

export interface InstallationSlide {
  type: 'video' | 'image';
  url: string;
  poster?: string;
  caption: Record<Locale, string>;
}

export interface InstallationEntry {
  id: string;
  category: Exclude<InstallationCategory, 'all'>;
  categoryLabel: Record<Locale, string>;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  location: string;
  year: string;
  equipmentTag: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  slides: InstallationSlide[];
  machineSlug?: string;
}

// Structured to hydrate directly from Cloudflare R2 media-manifest.json via n8n
export const INSTALLATIONS_FEED: InstallationEntry[] = [
  {
    id: 'vial-bottling-line-commissioning',
    category: 'turnkey-line',
    categoryLabel: { en: 'Complete Line', es: 'Línea Completa' },
    title: {
      en: 'Synchronized Vial Filling, Capping & Labeling Line',
      es: 'Línea Sincronizada de Llenado, Tapado y Etiquetado de Viales',
    },
    summary: {
      en: 'Full monoblock commissioning running glass vials under central PLC HMI control — validated with client containers prior to plant handover.',
      es: 'Puesta en marcha de línea monoblock completa operando viales de vidrio bajo control HMI PLC central, validada con los envases reales del cliente.',
    },
    location: 'Miami, FL',
    year: '2025',
    equipmentTag: { en: 'Turnkey Bottling Line', es: 'Línea Llave en Mano' },
    highlights: {
      en: [
        'Synchronized unscrambling, dosing, capping & accumulation',
        'Centralized HMI recipe control for multiple vial sizes',
        'Full dry-run & wet-run validation before plant delivery',
      ],
      es: [
        'Alimentación, dosificación, tapado y acumulación sincronizados',
        'Control centralizado de recetas HMI para varios formatos',
        'Validación completa en seco y húmedo antes de la entrega',
      ],
    },
    slides: [
      {
        type: 'video',
        url: '/videos/line_vial_filler.mp4',
        poster: '/thumbnails/line_vial_liquid_filler_thumbnail.png',
        caption: {
          en: 'Full synchronized production cycle during commissioning trial',
          es: 'Ciclo completo sincronizado durante prueba de puesta en marcha',
        },
      },
      {
        type: 'image',
        url: '/thumbnails/line_vial_liquid_filler_thumbnail.png',
        caption: {
          en: 'Central HMI PLC control panel & linear conveyor alignment',
          es: 'Panel de control HMI PLC central y alineación de banda',
        },
      },
    ],
    machineSlug: 'vial-bottling-line',
  },
  {
    id: 'linear-weigh-filler-setup',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Dosificación y Llenado' },
    title: {
      en: 'Multi-Head Linear Weigh Filler Calibration & Startup',
      es: 'Calibración y Arranque de Pesadora Lineal Multicabezal',
    },
    summary: {
      en: 'Precision dry-goods weighing setup configured for rigid jars and stand-up pouches with multi-lane digital load cells.',
      es: 'Configuración de pesaje lineal para sólidos en frascos rígidos y bolsas stand-up con celdas de carga digitales multicarril.',
    },
    location: 'Florida, USA',
    year: '2025',
    equipmentTag: { en: 'Automatic Weigh Filler', es: 'Pesadora Lineal Automática' },
    highlights: {
      en: [
        'Fine-tuned weight accuracy across granular & snack products',
        'Tool-less stainless hoppers for rapid product changeover',
        'Operator training and recipe programming on site',
      ],
      es: [
        'Ajuste fino de precisión para productos granulados y snacks',
        'Tolvas en acero inoxidable desmontables para cambio rápido',
        'Capacitación de operadores y programación de recetas',
      ],
    },
    slides: [
      {
        type: 'video',
        url: '/videos/automatic_weigh_filler.mp4',
        poster: '/thumbnails/automatic_weigh_filling_thumbnail.png',
        caption: {
          en: 'Live dosing test into rigid containers with weight verification',
          es: 'Prueba real de dosificación en frascos con verificación de peso',
        },
      },
      {
        type: 'image',
        url: '/automatic_weight_filler_2.webp',
        caption: {
          en: 'Four-lane stainless steel weigh filler configuration',
          es: 'Configuración de pesadora lineal de cuatro carriles en acero inoxidable',
        },
      },
    ],
    machineSlug: 'automatic-weight-filler',
  },
  {
    id: 'liquid-vial-filler-validation',
    category: 'factory-trial',
    categoryLabel: { en: 'Factory Trial', es: 'Prueba en Planta' },
    title: {
      en: 'Sanitary Vial Liquid Filler Pre-Shipment Validation',
      es: 'Validación Pre-Embarque de Llenadora Sanitaria de Líquidos',
    },
    summary: {
      en: 'Anti-drip diving nozzle calibration for cosmetic and pharmaceutical liquids ensuring zero foam and clean neck finishes.',
      es: 'Calibración de boquillas sumergibles antigoteo para líquidos cosméticos y farmacéuticos garantizando llenado limpio y sin espuma.',
    },
    location: 'Miami, FL',
    year: '2025',
    equipmentTag: { en: 'Vial Liquid Filler', es: 'Llenadora de Líquidos' },
    highlights: {
      en: [
        'Diving nozzles adjusted to container neck geometry',
        'Sanitary 316L contact paths ready for CIP washdown',
        'Throughput verified across continuous shift simulation',
      ],
      es: [
        'Boquillas sumergibles ajustadas a la geometría del envase',
        'Rutas de contacto sanitarias 316L listas para limpieza CIP',
        'Ritmo validado en simulación de turno continuo',
      ],
    },
    slides: [
      {
        type: 'video',
        url: '/videos/vial_liquid_filler.mp4',
        poster: '/thumbnails/vial_liquid_filler_thumbnail.png',
        caption: {
          en: 'Anti-drip volumetric filling cycle on glass vials',
          es: 'Ciclo de llenado volumétrico antigoteo en viales de vidrio',
        },
      },
      {
        type: 'image',
        url: '/vial_liquid_filler_2.webp',
        caption: {
          en: 'Sanitary multi-nozzle liquid filling station',
          es: 'Estación sanitaria de llenado de líquidos multiboquilla',
        },
      },
    ],
    machineSlug: 'liquid-filling-machine',
  },
];

export const INSTALLATION_CATEGORIES: Array<{
  id: InstallationCategory;
  label: Record<Locale, string>;
}> = [
  { id: 'all', label: { en: 'All Installations', es: 'Todas las Instalaciones' } },
  { id: 'turnkey-line', label: { en: 'Complete Lines', es: 'Líneas Completas' } },
  { id: 'filling', label: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' } },
  { id: 'capping-labeling', label: { en: 'Capping & Labeling', es: 'Tapado y Etiquetado' } },
  { id: 'factory-trial', label: { en: 'Factory Trials', es: 'Pruebas en Taller' } },
];
