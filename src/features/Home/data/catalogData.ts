import { routing } from '@/i18n/routing';

export type Locale = 'en' | 'es';
export type CategoryId = 'filling' | 'capping' | 'labeling' | 'line';
export type CatalogTabId = 'all' | CategoryId;
export type InternalRoute = keyof typeof routing.pathnames;

export interface MachineCatalogItem {
  id: string;
  category: CategoryId;
  categoryLabel: Record<Locale, string>;
  title: string;
  shortTitle: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  image: string;
  isStudioCutout: boolean;
  videoUrl?: string;
  link: InternalRoute;
  specs: {
    speed: string;
    accuracy: string;
    material: string;
  };
  highlights: Record<Locale, string[]>;
}

export interface DemoVideoItem {
  id: string;
  title: Record<Locale, string>;
  application: Record<Locale, string>;
  thumbnail: string;
  videoUrl: string;
  slug: string;
  specs: string;
  duration: string;
}

export interface LineStageItem {
  step: string;
  id: string;
  stageName: Record<Locale, string>;
  roleTitle: Record<Locale, string>;
  description: Record<Locale, string>;
  rangeLabel: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  image: string;
  link: InternalRoute;
}

export const MACHINE_CATALOG: MachineCatalogItem[] = [
  {
    id: 'automatic-weight-filler',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Dosificación y Llenado' },
    title: 'Automatic Weigh Filler',
    shortTitle: { en: 'Weigh Filler', es: 'Pesadora Lineal' },
    subtitle: {
      en: 'Multi-head linear weighing precision for dry goods, granules, snacks, coffee, and hardware.',
      es: 'Pesaje lineal multicabezal de alta precisión para sólidos, granos, café, snacks y piezas.',
    },
    image: '/automatic_weight_filler_2.webp',
    isStudioCutout: true,
    videoUrl: '/videos/automatic_weigh_filler.mp4',
    link: '/machines/filling-dosing/automatic-weight-filler',
    specs: {
      speed: '15–45 BPM',
      accuracy: '±0.2 g',
      material: 'SS 304 / 316',
    },
    highlights: {
      en: ['Multi-lane digital load cells', 'HMI touchscreen recipe memory', 'Tool-less washdown teardown'],
      es: ['Celdas de carga digitales multicarril', 'Memoria de recetas en pantalla HMI', 'Desmontaje rápido sin herramientas'],
    },
  },
  {
    id: 'liquid-filling-machine',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Dosificación y Llenado' },
    title: 'Vial Liquid Filler',
    shortTitle: { en: 'Liquid Filler', es: 'Llenadora Líquidos' },
    subtitle: {
      en: 'Anti-drip peristaltic and servo-piston dosing engineered for pharma, cosmetics, and extracts.',
      es: 'Dosificación peristáltica y servopistón antigoteo diseñada para farma, cosmética y extractos.',
    },
    image: '/vial_liquid_filler_2.webp',
    isStudioCutout: true,
    videoUrl: '/videos/vial_liquid_filler.mp4',
    link: '/machines/filling-dosing/liquid-filling-machine',
    specs: {
      speed: '25–60 BPM',
      accuracy: '±0.5 %',
      material: 'SS 316L GMP',
    },
    highlights: {
      en: ['Anti-drip diving nozzles', 'Zero cross-contamination heads', 'CIP-ready sanitary contact parts'],
      es: ['Boquillas sumergibles antigoteo', 'Cabezales sin contaminación cruzada', 'Partes sanitarias listas para CIP'],
    },
  },
  {
    id: 'automatic-capping-sealing-machine',
    category: 'capping',
    categoryLabel: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
    title: 'Automatic Capping & Sealing',
    shortTitle: { en: 'Capping & Sealing', es: 'Tapadora Lineal' },
    subtitle: {
      en: 'Torque-controlled linear tightening and crimping for screw caps, droppers, and vial stoppers.',
      es: 'Ajuste de torque lineal controlado y engarzado para tapas roscadas, goteros y sellos.',
    },
    image: '/linear_capping_sealing_machine_2.webp',
    isStudioCutout: true,
    link: '/machines/sealing-packaging/automatic-capping-sealing-machine',
    specs: {
      speed: '30–80 BPM',
      accuracy: 'Torque Ctrl',
      material: 'SS 304 Heavy',
    },
    highlights: {
      en: ['Magnetic torque clutch', 'Automatic cap feeder elevator', 'No-bottle, no-cap optical sensor'],
      es: ['Embrague de torque magnético', 'Elevador alimentador de tapas', 'Sensor óptico sin envase no tapa'],
    },
  },
  {
    id: 'automatic-vial-labeling-machine',
    category: 'labeling',
    categoryLabel: { en: 'Labeling', es: 'Etiquetado' },
    title: 'Automatic Vial Labeling',
    shortTitle: { en: 'Vial Labeler', es: 'Etiquetadora Viales' },
    subtitle: {
      en: 'High-speed servo wrap-around labeling with batch coding for vials, bottles, and ampoules.',
      es: 'Etiquetado envolvente servomotorizado con codificado de lote para viales, frascos y ampollas.',
    },
    image: '/automatic_vial_labeling_machine_2.webp',
    isStudioCutout: true,
    link: '/machines/labeling-identification/automatic-vial-labeling-machine',
    specs: {
      speed: '40–120 BPM',
      accuracy: '±0.5 mm',
      material: 'Anodized Al + SS',
    },
    highlights: {
      en: ['Servo-driven applicator head', 'Integrated lot & date coder', 'Bubble-free wrap belt'],
      es: ['Cabezal aplicador servomotorizado', 'Codificador de lote y fecha integrado', 'Banda envolvente sin burbujas'],
    },
  },
  {
    id: 'vial-bottling-line',
    category: 'line',
    categoryLabel: { en: 'Turnkey Line', es: 'Línea Llave en Mano' },
    title: 'Integrated Vial Bottling Line',
    shortTitle: { en: 'Turnkey Line', es: 'Línea Completa' },
    subtitle: {
      en: 'Complete synchronized unscrambling, filling, stoppering, capping, and labeling monoblock.',
      es: 'Sistema sincronizado completo de alimentación, llenado, taponado, sellado y etiquetado.',
    },
    image: '/thumbnails/line_vial_liquid_filler_thumbnail.png',
    isStudioCutout: false,
    videoUrl: '/videos/line_vial_filler.mp4',
    link: '/machines',
    specs: {
      speed: '40–70 BPM',
      accuracy: 'PLC Sync',
      material: 'GMP 316L',
    },
    highlights: {
      en: ['Single central HMI line control', 'Compact monoblock footprint', 'On-site commissioning & training'],
      es: ['Control central en una pantalla HMI', 'Huella compacta monoblock', 'Puesta en marcha y capacitación'],
    },
  },
];

// Process-level stages (broad across entry, mid, and high-speed industrial machinery)
export const LINE_STAGES: LineStageItem[] = [
  {
    step: '01',
    id: 'stage-filling',
    stageName: { en: 'Filling & Dosing', es: 'Dosificación y Llenado' },
    roleTitle: { en: 'Liquid, Powder & Granule Filling', es: 'Llenado de Líquidos, Polvos y Granos' },
    description: {
      en: 'From compact linear units to multi-head rotary fillers — engineered for clean, repeatable dosing across pharma, cosmetics, food, and chemical products.',
      es: 'Desde equipos lineales compactos hasta llenadoras rotativas multicabezal — diseñadas para una dosificación limpia y exacta en farma, cosmética, alimentos y químicos.',
    },
    rangeLabel: {
      en: 'Compact to high-speed industrial systems',
      es: 'Equipos compactos hasta alta velocidad industrial',
    },
    highlights: {
      en: ['Piston, peristaltic, auger & multi-head weighers', 'Sanitary stainless steel contact parts', 'Configured for vials, bottles, jars & pouches'],
      es: ['Sistemas de pistón, peristálticos, tornillo y multicabezal', 'Partes en contacto de acero inoxidable sanitario', 'Configurables para viales, frascos, botellas y bolsas'],
    },
    image: '/vial_liquid_filler_2.webp',
    link: '/machines/filling-dosing/liquid-filling-machine',
  },
  {
    step: '02',
    id: 'stage-capping',
    stageName: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
    roleTitle: { en: 'Torque Capping, Crimping & Induction', es: 'Tapado por Torque, Engarzado e Inducción' },
    description: {
      en: 'Inline and high-speed rotary capping systems built for consistent seal integrity across screw caps, droppers, triggers, pumps, and aluminum vial seals.',
      es: 'Sistemas lineales y rotativos de alta velocidad para sellado uniforme en tapas roscadas, goteros, atomizadores, bombas y sellos de aluminio.',
    },
    rangeLabel: {
      en: 'Inline & rotary torque control',
      es: 'Control de torque lineal y rotativo',
    },
    highlights: {
      en: ['Automatic cap sorting & elevator feeding', 'Adjustable magnetic or servo torque heads', 'Optional induction foil & tamper-evident sealing'],
      es: ['Alimentadores y elevadores automáticos de tapas', 'Cabezales de torque magnético o servo regulables', 'Sellado por inducción y precintos de seguridad'],
    },
    image: '/linear_capping_sealing_machine_2.webp',
    link: '/machines/sealing-packaging/automatic-capping-sealing-machine',
  },
  {
    step: '03',
    id: 'stage-labeling',
    stageName: { en: 'Labeling & Coding', es: 'Etiquetado y Codificado' },
    roleTitle: { en: 'Precision Labeling & Lot Printing', es: 'Etiquetado de Precisión y Codificación' },
    description: {
      en: 'Wrap-around, front-and-back, and top labeling equipment with seamless batch, expiration date, and barcode integration for any container geometry.',
      es: 'Etiquetadoras envolventes, frontales, traseras y superiores con impresión integrada de lote, fecha de vencimiento y código de barras.',
    },
    rangeLabel: {
      en: 'Round, flat, oval & ampoule formats',
      es: 'Envases cilíndricos, planos, ovalados y ampollas',
    },
    highlights: {
      en: ['Servo-driven high-accuracy applicators', 'Hot-stamp, thermal-transfer & inkjet coders', 'Optical label & print inspection ready'],
      es: ['Aplicadores servomotorizados de alta precisión', 'Codificadores térmicos, hot-stamp e inkjet', 'Listos para inspección óptica de etiqueta y lote'],
    },
    image: '/automatic_vial_labeling_machine_2.webp',
    link: '/machines/labeling-identification/automatic-vial-labeling-machine',
  },
  {
    step: '04',
    id: 'stage-turnkey',
    stageName: { en: 'Complete Lines', es: 'Líneas Completas' },
    roleTitle: { en: 'Turnkey & High-Capacity Systems', es: 'Líneas Llave en Mano y Alta Capacidad' },
    description: {
      en: 'Full synchronized lines from unscrambling to case packing — including high-speed and specialized equipment not yet listed in our online catalog.',
      es: 'Líneas sincronizadas completas desde alimentación hasta empaque final — incluyendo maquinaria industrial de alta capacidad y proyectos especiales a medida.',
    },
    rangeLabel: {
      en: 'Custom engineered to your plant volume',
      es: 'Configuradas a la escala de su planta',
    },
    highlights: {
      en: ['Line balancing & layout planning', 'Pre-shipment testing with your containers', 'On-site installation & operator training'],
      es: ['Balanceo de línea y planificación de layout', 'Pruebas previas con sus envases reales', 'Instalación en planta y capacitación'],
    },
    image: '/automatic_weight_filler_2.webp',
    link: '/machines',
  },
];

export const DEMO_VIDEOS: DemoVideoItem[] = [
  {
    id: 'demo-bottling-line',
    title: {
      en: 'Integrated Vial Bottling & Capping Line',
      es: 'Línea Integrada de Envasado y Tapado de Viales',
    },
    application: {
      en: 'Synchronized monoblock line running glass vials under central HMI control prior to delivery.',
      es: 'Línea monoblock sincronizada operando viales de vidrio bajo control HMI central antes de la entrega.',
    },
    thumbnail: '/thumbnails/line_vial_liquid_filler_thumbnail.png',
    videoUrl: '/videos/line_vial_filler.mp4',
    slug: 'vial-bottling-line',
    specs: 'Synchronized Monoblock · PLC HMI',
    duration: '01:18',
  },
  {
    id: 'demo-weigh-filler',
    title: {
      en: 'Automatic Linear Weigh Filler',
      es: 'Pesadora Lineal Automática',
    },
    application: {
      en: 'Multi-head dry product dosing into rigid jars and pouches during factory calibration.',
      es: 'Dosificación multicabezal de sólidos en frascos y bolsas durante calibración en taller.',
    },
    thumbnail: '/thumbnails/automatic_weigh_filling_thumbnail.png',
    videoUrl: '/videos/automatic_weigh_filler.mp4',
    slug: 'automatic-weight-filler',
    specs: 'Linear Weigher · Dry Goods',
    duration: '00:54',
  },
  {
    id: 'demo-liquid-filler',
    title: {
      en: 'Vial Liquid Filling Machine',
      es: 'Llenadora Automática de Viales Líquidos',
    },
    application: {
      en: 'Anti-drip diving nozzles delivering clean volumetric fills for pharmaceutical and cosmetic liquids.',
      es: 'Boquillas sumergibles antigoteo logrando llenados volumétricos limpios para farma y cosmética.',
    },
    thumbnail: '/thumbnails/vial_liquid_filler_thumbnail.png',
    videoUrl: '/videos/vial_liquid_filler.mp4',
    slug: 'liquid-filling-machine',
    specs: 'Liquid Dosing · Diving Nozzles',
    duration: '00:42',
  },
];

export const MARQUEE_APPLICATIONS: Record<Locale, string[]> = {
  en: [
    'PHARMACEUTICALS',
    'COSMETICS & PERSONAL CARE',
    'NUTRACEUTICALS',
    'FOOD & BEVERAGE',
    'SPECIALTY COFFEE & GRANULES',
    'CHEMICALS & EXTRACTS',
    'COMPLETE PACKAGING LINES',
    'MIAMI TECHNICAL SUPPORT',
  ],
  es: [
    'FARMACÉUTICA',
    'COSMÉTICA Y CUIDADO PERSONAL',
    'NUTRACÉUTICOS',
    'ALIMENTOS Y BEBIDAS',
    'CAFÉ Y GRANOS',
    'QUÍMICOS Y EXTRACTOS',
    'LÍNEAS COMPLETAS DE ENVASADO',
    'SOPORTE TÉCNICO EN MIAMI',
  ],
};
