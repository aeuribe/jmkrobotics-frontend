import { Locale } from '@/features/Home/data/catalogData';
import { getMediaUrl } from '@/lib/media';

export type InstallationCategory =
  | 'all'
  | 'featured'
  | 'turnkey-line'
  | 'filling'
  | 'capping-labeling'
  | 'factory-trial';

export interface InstallationSlide {
  type: 'video' | 'image' | 'youtube';
  url: string;
  poster?: string;
  mutedLoop?: boolean;
  caption: Record<Locale, string>;
}

export interface InstallationStoryBlock {
  heading?: Record<Locale, string>;
  body: Record<Locale, string>;
}

export interface InstallationEntry {
  id: string;
  featured?: boolean;
  category: Exclude<InstallationCategory, 'all' | 'featured'>;
  categoryLabel: Record<Locale, string>;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  location: string;
  year: string;
  equipmentTag: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  story?: InstallationStoryBlock[];
  slides: InstallationSlide[];
  machineSlug?: string;
}

// Structured to hydrate directly from Cloudflare R2 media-manifest.json via n8n
export const INSTALLATIONS_FEED: InstallationEntry[] = [
  // ── FEATURED INSTALLATION (14-Head Multihead Weigher + VFFS — Miami, FL) ──
  {
    id: 'vffs-multihead-integration',
    featured: true,
    category: 'turnkey-line',
    categoryLabel: { en: 'Featured Line', es: 'Proyecto Destacado' },
    title: {
      en: 'Integration of 14-Head Multihead Weigher and Vertical Packaging Machine into Production Line',
      es: 'Integración de Pesadora Multicabezal de 14 Cabezales y Empacadora Vertical en Línea de Producción',
    },
    summary: {
      en: 'Supply, installation, and commissioning of a dosing and vertical packaging system for frozen products in 5 lb and 10 lb formats.',
      es: 'Suministro, instalación y comisionamiento de sistema de dosificación y empaque vertical para productos congelados en presentaciones de 5 lb y 10 lb.',
    },
    location: 'Miami, FL',
    year: '2026',
    equipmentTag: { en: '14-Head Multihead + VFFS + Z-Elevator', es: 'Multicabezal 14 Cabezales + VFFS + Elevador Z' },
    highlights: {
      en: [
        'Z-type bucket elevator, 14-head independent multihead weigher & VFFS bagger',
        'Door-to-door import logistics, on-site assembly, wiring & real-product calibration',
        'Technical operator training & ramp-up support until full operational autonomy',
      ],
      es: [
        'Elevador tipo Z, pesadora multicabezal de 14 cabezales independientes y empacadora VFFS',
        'Logística puerta a puerta, ensamble en sitio, cableado y pruebas con producto real',
        'Entrenamiento técnico al personal y acompañamiento hasta autonomía operativa total',
      ],
    },
    story: [
      {
        body: {
          en: 'A food processing manufacturing company required the automation of its frozen product dosing and packaging process for 5 lb and 10 lb formats, ensuring weight accuracy and reliable sealing.',
          es: 'Una empresa del sector de alimentos procesados requería automatizar el proceso de dosificación y empaque de productos congelados para presentaciones de 5 lb y 10 lb, garantizando precisión en el peso y sellado constante.',
        },
      },
      {
        heading: { en: 'Implemented solution', es: 'Solución implementada' },
        body: {
          en: 'A vertical form-fill-seal (VFFS) packaging system was integrated, consisting of three primary components: a Z-type elevator for continuous feeding, a 14-head multihead weigher for accurate dosing, and a vertical packaging machine responsible for bag forming and sealing. The scope included door-to-door import logistics, on-site assembly and installation, wiring, calibration, and operational testing both dry and with actual product.',
          es: 'Se integró un sistema de empaque vertical (VFFS) compuesto por tres componentes principales: un elevador tipo Z para alimentación continua, una pesadora multicabezal de 14 cabezales independientes para la dosificación exacta y una empacadora vertical encargada del conformado y sellado de bolsas. El alcance abarcó logística de importación puerta a puerta, ensamble e instalación en sitio, cableado, calibración y pruebas sin carga y con producto real.',
        },
      },
      {
        heading: { en: 'Result and support', es: 'Resultado y acompañamiento' },
        body: {
          en: 'The system was successfully commissioned, achieving automated dosing and packaging according to required specifications. Technical training was provided to operating personnel, along with production ramp-up support until full operational autonomy was handed over to the client.',
          es: 'El sistema fue comisionado con éxito, logrando la dosificación y empaque automatizado en las especificaciones requeridas. Se realizó entrenamiento técnico al personal operativo y acompañamiento en rampa de producción hasta transferir la autonomía total del equipo al cliente.',
        },
      },
    ],
    slides: [
      {
        type: 'image',
        url: getMediaUrl('/media/hero/hero-pesadora-multicabezal-vffs-jmk.webp'),
        caption: {
          en: '14-head multihead weighing system and Z-type elevator on stainless platform',
          es: 'Sistema de pesadora multicabezal de 14 cabezales y elevador tipo Z sobre plataforma',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/linea-envasado-automatico-industrial.webp'),
        caption: {
          en: 'Vertical form-fill-seal (VFFS) machine integrated with Z-elevator and outfeed',
          es: 'Empacadora vertical (VFFS) integrada con elevador tipo Z y salida automatizada',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/rotary-packaging-carousel-plant-floor.webp'),
        caption: {
          en: 'Rotary accumulation carousel operating on the plant floor',
          es: 'Mesa giratoria de acumulación operando en planta de producción',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation.mp4'),
        poster: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Complete operational line at the manufacturing plant',
          es: 'Línea completa operativa en planta de producción',
        },
      },
    ],
    machineSlug: 'complete-multihead-vffs-line',
  },

  // ── NEW FEATURED INSTALLATION (Turnkey Bottling Line — Houston, TX, 4 Muted Videos) ──
  {
    id: 'turnkey-bottling-capping-line-houston',
    featured: true,
    category: 'turnkey-line',
    categoryLabel: { en: 'Featured Line', es: 'Proyecto Destacado' },
    title: {
      en: 'Turnkey Rotary Bottling, Capping & Labeling Line',
      es: 'Línea Llave en Mano de Llenado Rotativo, Tapado y Etiquetado',
    },
    summary: {
      en: 'Complete stainless steel bottling production line commissioned in Houston, TX — integrating rotary unscrambling, starwheel vial dosing, 4-head pneumatic capping, inline labeling, and accumulation.',
      es: 'Línea completa de embotellado en acero inoxidable puesta en marcha en Houston, TX — integrando posicionador rotativo, dosificado en estrella, tapado neumático de 4 cabezales, etiquetado en línea y acumulación.',
    },
    location: 'Houston, TX',
    year: '2025',
    equipmentTag: { en: 'Turnkey Bottling & Capping Line', es: 'Línea Completa de Embotellado' },
    highlights: {
      en: [
        'Synchronized rotary unscrambler, starwheel dosing & 4-head pneumatic capper',
        'Optical presence sensors & automated inline wrap-around labeler',
        'Full stainless steel conveyor layout with rotary accumulation table',
      ],
      es: [
        'Alimentador rotativo, dosificación en estrella y tapadora neumática de 4 cabezales',
        'Sensores ópticos de presencia y etiquetadora automática en línea',
        'Trazado completo de transportadores y mesa acumuladora en acero inoxidable',
      ],
    },
    slides: [
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic.mp4'),
        poster: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Panoramic view of the turnkey stainless steel bottling and capping line',
          es: 'Vista panorámica de la línea llave en mano de embotellado y tapado en acero inoxidable',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision.mp4'),
        poster: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision-poster.webp'),
        mutedLoop: true,
        caption: {
          en: '4-head pneumatic rotary capping chucks with optical sensor verification',
          es: 'Cabezales neumáticos rotativos de tapado con verificación por sensor óptico',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/rotary-unscrambler-vial-feeding.mp4'),
        poster: getMediaUrl('/media/in-action/rotary-unscrambler-vial-feeding-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Automated rotary unscrambler bowl feeding glass vials into the starwheel',
          es: 'Alimentador rotativo introduciendo frascos de vidrio en la estrella de llenado',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/inline-bottling-labeling-line-tour.mp4'),
        poster: getMediaUrl('/media/in-action/inline-bottling-labeling-line-tour-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'End-to-end conveyor integration from rotary feeder to inline labeling station',
          es: 'Integración continua de banda desde el alimentador rotativo hasta la etiquetadora',
        },
      },
    ],
    machineSlug: 'rotary-bottle-filling-capping',
  },

  // ── NEW INSTALLATION (Eternal — 3 Muted Loop Videos + 4 Plant Photos) ─────
  {
    id: 'automated-liquid-bottling-capping-plant',
    featured: true,
    category: 'filling',
    categoryLabel: { en: 'Filling & Capping', es: 'Llenado y Tapado' },
    title: {
      en: 'Automated Liquid Bottling & Rotary Capping Line',
      es: 'Línea Automatizada de Llenado de Líquidos y Tapado',
    },
    summary: {
      en: 'End-to-end liquid bottling line commissioning featuring rotary dosing, sanitary supply tanks, roller torque cappers, and automated bottle elevation.',
      es: 'Puesta en marcha integral de línea de llenado de líquidos con dosificación rotativa, tanques sanitarios, torqueadores de rodillos y alimentación automática de envases.',
    },
    location: 'Florida, USA',
    year: '2025',
    equipmentTag: { en: 'Automated Liquid Bottling Line', es: 'Línea Automática de Líquidos' },
    highlights: {
      en: [
        'Rotary liquid dosing synchronized with automated container guiding',
        'Sanitary stainless steel supply tank & multi-hose transfer pump',
        'High-consistency roller torque capping heads on continuous conveyor',
      ],
      es: [
        'Dosificación rotativa sincronizada con guiado automático de envases',
        'Tanque sanitario en acero inoxidable y bomba de transferencia',
        'Cabezales torqueadores de rodillos sobre transporte continuo',
      ],
    },
    slides: [
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/linea-llenado-botellas.mp4'),
        poster: getMediaUrl('/media/in-action/linea-llenado-botellas-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Rotary liquid dosing filling small bottles in continuous operation',
          es: 'Dosificadora rotativa llenando botellas pequeñas en operación continua',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/linea-envasado-rotativa-en-accion.mp4'),
        poster: getMediaUrl('/media/in-action/linea-envasado-rotativa-en-accion-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Automated container guiding and alignment along the production conveyor',
          es: 'Sistema automatizado de transporte y guiado de envases en línea',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/plc-control-panel-commissioning.mp4'),
        poster: getMediaUrl('/media/in-action/plc-control-panel-commissioning-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Live Mitsubishi PLC & industrial relay I/O diagnostics during commissioning',
          es: 'Diagnóstico en vivo de PLC Mitsubishi y relevadores industriales durante la puesta en marcha',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/dosificadora-liquidos-acero-inoxidable.webp'),
        caption: {
          en: 'Stainless steel sanitary liquid dosing manifold and pump assembly',
          es: 'Sistema sanitario de dosificación de líquidos en acero inoxidable y bomba',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/linea-envasado-liquidos-tanque.webp'),
        caption: {
          en: 'Product supply tank feeding multi-head liquid filling nozzles',
          es: 'Tanque de acero inoxidable alimentando múltiples líneas de dosificación',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/torqueadoras-rodillos-linea-envases.webp'),
        caption: {
          en: 'Close-up of roller torque capping heads on the inline bottle track',
          es: 'Primer plano de cabezales torqueadores de rodillos en la línea de envases',
        },
      },
      {
        type: 'image',
        url: getMediaUrl('/media/in-action/linea-alimentacion-botellas-tolva.webp'),
        caption: {
          en: 'Stainless hopper and vertical elevator feeding containers into the line',
          es: 'Tolva de alimentación y elevador vertical suministrando envases a la línea',
        },
      },
    ],
    machineSlug: 'rotary-bottle-filling-capping',
  },

  // ── NEW INSTALLATION (SV Labs Missouri — Muted Loop Video) ────────────────
  {
    id: 'rotary-insertion-positioning-system',
    category: 'capping-labeling',
    categoryLabel: { en: 'Rotary Automation', es: 'Automatización Rotativa' },
    title: {
      en: 'Automated Rotary Container Positioning & Insertion',
      es: 'Sistema Rotativo de Posicionamiento e Inserción Automatizada',
    },
    summary: {
      en: 'High-precision rotary indexing turntable and automated insertion mechanism synchronized with continuous conveyor transfer.',
      es: 'Mesa giratoria de indexado de alta precisión y mecanismo de inserción automatizada sincronizado con cinta transportadora.',
    },
    location: 'Missouri, USA',
    year: '2025',
    equipmentTag: { en: 'Rotary Indexing System', es: 'Sistema Rotativo Indexado' },
    highlights: {
      en: [
        'Smooth rotary turntable positioning without container tipping',
        'Automated insertion mechanism synchronized to conveyor speed',
        'Compact footprint integrated into active production line',
      ],
      es: [
        'Posicionamiento estable en mesa giratoria sin volcado de envases',
        'Mecanismo de inserción sincronizado con la velocidad de banda',
        'Huella compacta integrada en línea activa de producción',
      ],
    },
    slides: [
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/rotary-vial-filling-capping-operation.mp4'),
        poster: getMediaUrl('/media/in-action/rotary-vial-filling-capping-operation-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Rotary starwheel glass vial filling & indexing turntable in continuous run',
          es: 'Mesa rotativa de llenado e indexado de frascos de vidrio en marcha continua',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/rotary-packaging-mechanism-motion.mp4'),
        poster: getMediaUrl('/media/in-action/rotary-packaging-mechanism-motion-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'High-speed stainless steel rotary packaging and indexing mechanism',
          es: 'Mecanismo rotativo de envasado e indexado de alta velocidad en acero inoxidable',
        },
      },
      {
        type: 'video',
        url: getMediaUrl('/media/in-action/linea-envasado-rotativa-accion.mp4'),
        poster: getMediaUrl('/media/in-action/linea-envasado-rotativa-accion-poster.webp'),
        mutedLoop: true,
        caption: {
          en: 'Rotary turntable positioning and automated insertion in operation',
          es: 'Mesa giratoria y mecanismo de inserción automatizada en operación',
        },
      },
    ],
    machineSlug: 'automatic-capping-sealing-machine',
  },

  // ── EXISTING 3 INSTALLATIONS (Preserved Intact) ───────────────────────────
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
        poster: '/thumbnails/line_vial_liquid_filler_thumbnail.webp',
        caption: {
          en: 'Full synchronized production cycle during commissioning trial',
          es: 'Ciclo completo sincronizado durante prueba de puesta en marcha',
        },
      },
      {
        type: 'image',
        url: '/thumbnails/line_vial_liquid_filler_thumbnail.webp',
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
        poster: '/thumbnails/automatic_weigh_filling_thumbnail.webp',
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
        poster: '/thumbnails/vial_liquid_filler_thumbnail.webp',
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
  { id: 'featured', label: { en: 'Featured Highlights', es: 'Destacados' } },
  { id: 'turnkey-line', label: { en: 'Complete Lines', es: 'Líneas Completas' } },
  { id: 'filling', label: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' } },
  { id: 'capping-labeling', label: { en: 'Capping & Rotary', es: 'Tapado y Rotativas' } },
  { id: 'factory-trial', label: { en: 'Factory Trials', es: 'Pruebas en Taller' } },
];
