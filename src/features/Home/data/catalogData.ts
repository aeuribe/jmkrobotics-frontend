import { routing } from '@/i18n/routing';
import { getMediaUrl } from '@/lib/media';

export type Locale = 'en' | 'es';
export type CategoryId =
  | 'filling'
  | 'vffs-pouch'
  | 'capping'
  | 'labeling'
  | 'inspection'
  | 'end-of-line'
  | 'process'
  | 'line';
export type CatalogTabId = 'all' | CategoryId;
export type InternalRoute = keyof typeof routing.pathnames;

export interface MachineCatalogItem {
  id: string;
  category: CategoryId;
  categoryLabel: Record<Locale, string>;
  title: string;
  titleEs?: string;
  shortTitle: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  image: string;
  gallery?: string[];
  isStudioCutout: boolean;
  videoUrl?: string;
  link?: InternalRoute;
  specs: {
    speed: string;
    accuracy: string;
    material: string;
  };
  highlights: Record<Locale, string[]>;
}

export function getMachineTitle(machine: MachineCatalogItem, locale: Locale): string {
  return locale === 'es' && machine.titleEs ? machine.titleEs : machine.title;
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
  videoUrl?: string;
  youtubeId?: string;
  poster?: string;
  link: InternalRoute;
}

export const CATALOG_CATEGORY_LABELS: Record<CatalogTabId, Record<Locale, string>> = {
  all: { en: 'All Machinery', es: 'Toda la Maquinaria' },
  filling: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' },
  'vffs-pouch': { en: 'Vertical & Doypack', es: 'Envasado Vertical y Doypack' },
  capping: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
  labeling: { en: 'Labeling', es: 'Etiquetado' },
  inspection: { en: 'Inspection & QC', es: 'Inspección y Control' },
  'end-of-line': { en: 'End-of-Line & Handling', es: 'Final de Línea y Transporte' },
  process: { en: 'Process & Filtration', es: 'Proceso y Filtración' },
  line: { en: 'Complete Lines', es: 'Líneas Completas' },
};

export const CATALOG_TAB_ORDER: CatalogTabId[] = [
  'all',
  'filling',
  'vffs-pouch',
  'capping',
  'labeling',
  'inspection',
  'end-of-line',
  'process',
  'line',
];

export const MACHINE_CATALOG: MachineCatalogItem[] = [
  // ── EXISTING 5 MACHINES (Preserved Intact) ────────────────────────────────
  {
    id: 'automatic-weight-filler',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Dosificación y Llenado' },
    title: 'Automatic Weigh Filler',
    titleEs: 'Pesadora Lineal Automática',
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
    titleEs: 'Llenadora de Líquidos para Viales',
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
    titleEs: 'Tapadora y Selladora Automática',
    shortTitle: { en: 'Capping & Sealing', es: 'Tapadora Lineal' },
    subtitle: {
      en: 'Torque-controlled linear tightening and crimping for screw caps, droppers, and vial stoppers.',
      es: 'Ajuste de torque lineal controlado y engarzado para tapas roscadas, goteros y sellos.',
    },
    image: '/linear_capping_sealing_machine_2.webp',
    isStudioCutout: true,
    videoUrl: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision.mp4'),
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
    titleEs: 'Etiquetadora Automática de Viales',
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
    categoryLabel: { en: 'Complete Line', es: 'Línea Completa' },
    title: 'Integrated Vial Bottling Line',
    titleEs: 'Línea Integrada de Envasado de Viales',
    shortTitle: { en: 'Vial Bottling Line', es: 'Línea de Viales' },
    subtitle: {
      en: 'Complete synchronized unscrambling, filling, stoppering, capping, and labeling monoblock.',
      es: 'Sistema sincronizado completo de alimentación, llenado, taponado, sellado y etiquetado.',
    },
    image: '/thumbnails/line_vial_liquid_filler_thumbnail.webp',
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

  // ── 14 NEW INDUSTRIAL MACHINES (Grouped from Seleccion_Web Approved Media) ──
  {
    id: 'multihead-weigher-system',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' },
    title: 'Multihead Weigher System',
    titleEs: 'Sistema de Pesadora Multicabezal',
    shortTitle: { en: 'Multihead Weigher', es: 'Pesadora Multicabezal' },
    subtitle: {
      en: 'High-speed stainless steel multihead combination scale mounted on service platforms for continuous packaging lines.',
      es: 'Pesadora multicabezal de acero inoxidable de alta velocidad montada sobre plataforma industrial para líneas continuas.',
    },
    image: getMediaUrl('/media/catalogo/jmk-multihead-weigher-industrial.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/jmk-multihead-weigher-industrial.webp'),
      getMediaUrl('/media/catalogo/pesadora-multicabezal-acero-inoxidable.webp'),
      getMediaUrl('/media/catalogo/pesadora-multiencabezal-jmk-plataforma-acero.webp'),
    ],
    isStudioCutout: false,
    specs: {
      speed: 'Up to 120 WPM',
      accuracy: '±0.2–1.0 g',
      material: 'SS 304 Food Grade',
    },
    highlights: {
      en: ['High-precision load cells with automatic tare', 'Stainless access platform & VFFS integration', 'Washdown-ready hoppers for food & frozen goods'],
      es: ['Celdas de carga de alta precisión con tara automática', 'Plataforma de acero inoxidable e integración VFFS', 'Tolvas sanitarias para alimentos y congelados'],
    },
  },
  {
    id: 'rotary-bottle-filling-capping',
    category: 'filling',
    categoryLabel: { en: 'Filling & Dosing', es: 'Llenado y Dosificación' },
    title: 'Rotary Bottle Filling & Capping Machine',
    titleEs: 'Llenadora y Tapadora Rotativa de Frascos',
    shortTitle: { en: 'Rotary Filler & Capper', es: 'Rotativa Llenado/Tapado' },
    subtitle: {
      en: 'Compact rotary monoblock for automated small-bottle filling and capping with Siemens touchscreen HMI.',
      es: 'Monoblock rotativo automático para llenado y tapado de frascos pequeños con pantalla táctil Siemens.',
    },
    image: getMediaUrl('/media/catalogo/maquina-rotativa-llenado-frascos.webp'),
    isStudioCutout: false,
    videoUrl: getMediaUrl('/media/in-action/rotary-vial-filling-capping-operation.mp4'),
    specs: {
      speed: '40–90 BPM',
      accuracy: 'Servo Dosing',
      material: 'SS 304 / 316L',
    },
    highlights: {
      en: ['Siemens PLC & touchscreen line control', 'Star-wheel rotary indexing for small vials & bottles', 'Synchronized filling and capping stations'],
      es: ['Control PLC Siemens con pantalla táctil', 'Indexado rotativo de estrella para frascos y viales', 'Estaciones sincronizadas de llenado y tapado'],
    },
  },
  {
    id: 'vertical-form-fill-seal-vffs',
    category: 'vffs-pouch',
    categoryLabel: { en: 'Vertical & Doypack', es: 'Envasado Vertical y Doypack' },
    title: 'Automatic Vertical Form-Fill-Seal (VFFS)',
    titleEs: 'Envasadora Vertical Automática (VFFS)',
    shortTitle: { en: 'VFFS Machine', es: 'Envasadora Vertical VFFS' },
    subtitle: {
      en: 'Heavy-duty vertical bagger with precision thermal sealing, HMI control, and takeaway conveyor for high-volume plants.',
      es: 'Envasadora vertical automática con sellado térmico de precisión, control HMI y banda transportadora de salida.',
    },
    image: getMediaUrl('/media/catalogo/envasadora-vertical-automatica-jmk.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/envasadora-vertical-automatica-jmk.webp'),
      getMediaUrl('/media/catalogo/maquina-vffs-sellado-vertical.webp'),
      getMediaUrl('/media/catalogo/formadora-automatica-linea-envasado.webp'),
    ],
    isStudioCutout: false,
    specs: {
      speed: '40–90 BPM',
      accuracy: 'Servo Film Pull',
      material: 'SS 304 Frame',
    },
    highlights: {
      en: ['Pillow, gusseted & flat-bottom bag forming', 'PID temperature-controlled sealing jaws', 'Direct sync with multihead weighers or augers'],
      es: ['Formado de bolsas tipo almohada, fuelle y fondo plano', 'Mordazas con control PID de temperatura', 'Sincronización directa con multicabezales o tornillo'],
    },
  },
  {
    id: 'rotary-doypack-pouch-machine',
    category: 'vffs-pouch',
    categoryLabel: { en: 'Vertical & Doypack', es: 'Envasado Vertical y Doypack' },
    title: 'Rotary Premade Pouch & Doypack Machine',
    titleEs: 'Envasadora Rotativa para Bolsas Doypack',
    shortTitle: { en: 'Rotary Doypack', es: 'Envasadora Doypack' },
    subtitle: {
      en: 'Multi-station rotary packaging system for premade stand-up pouches paired with bucket elevator feeding.',
      es: 'Sistema rotativo multiestación para bolsas preformadas doypack acoplado a elevador de cangilones.',
    },
    image: getMediaUrl('/media/catalogo/linea-envasado-doypack-cangilones.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/linea-envasado-doypack-cangilones.webp'),
      getMediaUrl('/media/catalogo/maquinaria-rotativa-envasado-industrial.webp'),
    ],
    isStudioCutout: false,
    videoUrl: getMediaUrl('/media/in-action/rotary-packaging-mechanism-motion.mp4'),
    specs: {
      speed: '30–60 PPM',
      accuracy: '8-Station Index',
      material: 'SS 304 Washdown',
    },
    highlights: {
      en: ['Automated zipper opening, filling & heat sealing', 'Quick-adjust grippers for multiple pouch widths', 'Seamless integration with bucket elevators'],
      es: ['Apertura automática de zipper, llenado y termosellado', 'Pinzas de ajuste rápido para varios anchos de bolsa', 'Integración directa con elevadores de cangilones'],
    },
  },
  {
    id: 'inline-induction-foil-sealer',
    category: 'capping',
    categoryLabel: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
    title: 'Inline Electromagnetic Induction Sealer',
    titleEs: 'Selladora en Línea por Inducción Electromagnética',
    shortTitle: { en: 'Induction Sealer', es: 'Selladora por Inducción' },
    subtitle: {
      en: 'Continuous non-contact aluminum foil induction sealing integrated over industrial bottling conveyors.',
      es: 'Sellado continuo de aluminio por inducción electromagnética sin contacto integrado sobre banda transportadora.',
    },
    image: getMediaUrl('/media/catalogo/linea-sellado-induccion-aluminio.webp'),
    isStudioCutout: false,
    specs: {
      speed: 'Up to 150 BPM',
      accuracy: 'Tamper-Evident',
      material: 'SS 304 Enclosure',
    },
    highlights: {
      en: ['Hermetic leak-proof aluminum foil sealing', 'Height-adjustable sealing head for varied bottles', 'Compatible with inline inkjet batch coders'],
      es: ['Sellado hermético antifugas con lámina de aluminio', 'Cabezal regulable en altura para distintos envases', 'Compatible con codificadores inkjet en línea'],
    },
  },
  {
    id: 'auto-l-bar-shrink-sealer',
    category: 'capping',
    categoryLabel: { en: 'Capping & Sealing', es: 'Tapado y Sellado' },
    title: 'Automatic L-Bar Shrink Sealer',
    titleEs: 'Selladora Automática L-Bar Retráctil',
    shortTitle: { en: 'L-Bar Sealer', es: 'Selladora L-Bar' },
    subtitle: {
      en: 'Automated L-Bar film sealing and shrink-tunnel packaging station for multipacks, trays, and boxes.',
      es: 'Estación automática de termosellado tipo L-Bar y empaque retráctil para multipacks, bandejas y cajas.',
    },
    image: getMediaUrl('/media/catalogo/auto-l-bar-sealer-linea-empaque.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/auto-l-bar-sealer-linea-empaque.webp'),
      getMediaUrl('/media/catalogo/unidad-sellado-ajuste-mecanismo.webp'),
    ],
    isStudioCutout: false,
    specs: {
      speed: '20–40 PPM',
      accuracy: 'PID Temp Ctrl',
      material: 'Heavy Industrial',
    },
    highlights: {
      en: ['Precision temperature-controlled sealing blade', 'Transparent interlocked safety guards', 'Continuous infeed & outfeed conveyor integration'],
      es: ['Cuchilla selladora con control preciso de temperatura', 'Guardas transparentes con enclavamiento de seguridad', 'Integración continua de bandas de entrada y salida'],
    },
  },
  {
    id: 'industrial-inline-labeler-hmi',
    category: 'labeling',
    categoryLabel: { en: 'Labeling', es: 'Etiquetado' },
    title: 'Industrial Inline Labeler with HMI',
    titleEs: 'Etiquetadora Industrial en Línea con HMI',
    shortTitle: { en: 'Inline Labeler HMI', es: 'Etiquetadora HMI' },
    subtitle: {
      en: 'Heavy-duty conveyorized labeling system with touchscreen HMI, gearmotor drive, and pneumatic actuation.',
      es: 'Etiquetadora industrial en línea con cinta transportadora, panel táctil HMI, motorreductor y actuador neumático.',
    },
    image: getMediaUrl('/media/catalogo/etiquetadora-industrial-hmi.webp'),
    isStudioCutout: false,
    specs: {
      speed: '50–140 BPM',
      accuracy: '±0.5 mm',
      material: 'SS 304 + Al',
    },
    highlights: {
      en: ['Intuitive HMI touchscreen recipe adjustments', 'Pneumatic stabilization & optical gap sensors', 'Built for continuous multi-shift plant operation'],
      es: ['Ajuste intuitivo de recetas en pantalla táctil HMI', 'Estabilización neumática y sensores ópticos de paso', 'Diseñada para operación continua multiturno'],
    },
  },
  {
    id: 'industrial-metal-detector-conveyor',
    category: 'inspection',
    categoryLabel: { en: 'Inspection & QC', es: 'Inspección y Control' },
    title: 'Industrial Metal Detector Conveyor',
    titleEs: 'Detector de Metales Industrial con Banda',
    shortTitle: { en: 'Metal Detector', es: 'Detector de Metales' },
    subtitle: {
      en: 'Stainless steel conveyorized metal detection unit for ferrous, non-ferrous, and stainless contaminant inspection.',
      es: 'Detector de metales industrial en acero inoxidable con cinta transportadora para control de contaminantes.',
    },
    image: getMediaUrl('/media/catalogo/detector-metales-cinta-transportadora.webp'),
    isStudioCutout: false,
    specs: {
      speed: 'Up to 120 PPM',
      accuracy: 'Fe / Non-Fe / SS',
      material: 'SS 304 Sanitary',
    },
    highlights: {
      en: ['Multi-product memory for fast line changeovers', 'Automatic stop or pneumatic reject options', 'Food-grade sanitary washdown frame'],
      es: ['Memoria multiproducto para cambios rápidos de línea', 'Opciones de paro automático o rechazo neumático', 'Chasis sanitario lavable grado alimenticio'],
    },
  },
  {
    id: 'dynamic-checkweigher-station',
    category: 'inspection',
    categoryLabel: { en: 'Inspection & QC', es: 'Inspección y Control' },
    title: 'Dynamic Checkweigher Station',
    titleEs: 'Estación de Control de Peso Dinámico',
    shortTitle: { en: 'Checkweigher', es: 'Control de Peso' },
    subtitle: {
      en: 'Inline dynamic weight verification conveyor mounted on stainless steel frame for end-of-line quality assurance.',
      es: 'Estación de pesaje dinámico en línea sobre mesa de acero inoxidable para control de calidad al final de línea.',
    },
    image: getMediaUrl('/media/catalogo/control-peso-linea-conveyor.webp'),
    isStudioCutout: false,
    specs: {
      speed: 'Up to 100 PPM',
      accuracy: '±0.5 g',
      material: 'SS 304 Frame',
    },
    highlights: {
      en: ['Real-time under/overweight rejection logging', 'Compact inline footprint for existing conveyors', 'Sanitary stainless construction'],
      es: ['Registro y rechazo en tiempo real por bajo o sobrepeso', 'Huella compacta adaptable a cintas existentes', 'Construcción sanitaria en acero inoxidable'],
    },
  },
  {
    id: 'automatic-case-sealer',
    category: 'end-of-line',
    categoryLabel: { en: 'End-of-Line & Handling', es: 'Final de Línea y Transporte' },
    title: 'Automatic Case Sealer',
    titleEs: 'Precintadora Automática de Cajas',
    shortTitle: { en: 'Case Sealer', es: 'Precintadora de Cajas' },
    subtitle: {
      en: 'Top-and-bottom carton taping machine with gravity roller tables for fast secondary packaging dispatch.',
      es: 'Cerradora y precintadora automática de cajas con transportador de rodillos para empaque secundario.',
    },
    image: getMediaUrl('/media/catalogo/precintadora-automatica-cajas.webp'),
    isStudioCutout: false,
    specs: {
      speed: '15–30 CPM',
      accuracy: 'Top & Bottom',
      material: 'Industrial Steel',
    },
    highlights: {
      en: ['Fast manual or automatic box-size adjustment', 'Dual side-drive belts for square carton sealing', 'Roller infeed & outfeed staging tables'],
      es: ['Ajuste rápido a diferentes dimensiones de caja', 'Bandas laterales dobles para cierre cuadrado', 'Mesas de rodillos de entrada y salida'],
    },
  },
  {
    id: 'automatic-pallet-stretch-wrapper',
    category: 'end-of-line',
    categoryLabel: { en: 'End-of-Line & Handling', es: 'Final de Línea y Transporte' },
    title: 'Automatic Pallet Stretch Wrapper',
    titleEs: 'Envolvedora Automática de Pallets',
    shortTitle: { en: 'Pallet Wrapper', es: 'Envolvedora de Pallets' },
    subtitle: {
      en: 'Heavy-duty rotary turntable pallet wrapper with forklift access ramp for high-throughput shipping docks.',
      es: 'Envolvedora industrial de pallets con plataforma giratoria y rampa de acceso para zona de expedición.',
    },
    image: getMediaUrl('/media/catalogo/envolvedora-pallets-automatica.webp'),
    isStudioCutout: false,
    videoUrl: getMediaUrl('/media/in-action/automatic-pallet-stretch-wrapper-jmk.mp4'),
    specs: {
      speed: '20–40 Pallets/hr',
      accuracy: 'Pre-Stretch Film',
      material: 'Heavy Duty Steel',
    },
    highlights: {
      en: ['Photo-eye automatic pallet height sensing', 'Adjustable wrap tension & reinforcement cycles', 'Low-profile turntable with loading ramp'],
      es: ['Sensor fotoeléctrico automático de altura de pallet', 'Tensión y ciclos de refuerzo programables', 'Plataforma de perfil bajo con rampa de carga'],
    },
  },
  {
    id: 'conveyors-rotary-tables',
    category: 'end-of-line',
    categoryLabel: { en: 'End-of-Line & Handling', es: 'Final de Línea y Transporte' },
    title: 'Industrial Conveyors & Rotary Tables',
    titleEs: 'Cintas Transportadoras y Mesas Rotativas',
    shortTitle: { en: 'Conveyors & Tables', es: 'Cintas y Mesas Rotativas' },
    subtitle: {
      en: 'Stainless steel belt conveyors and rotary accumulation tables built to connect and buffer high-speed lines.',
      es: 'Cintas transportadoras sanitarias y mesas acumuladoras rotativas de acero inoxidable para conectar líneas.',
    },
    image: getMediaUrl('/media/catalogo/cinta-transportadora-industrial-automatizada.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/cinta-transportadora-industrial-automatizada.webp'),
      getMediaUrl('/media/catalogo/mesa-acumuladora-rotativa-acero-inoxidable.webp'),
    ],
    isStudioCutout: false,
    specs: {
      speed: 'Variable VFD',
      accuracy: 'Custom Lengths',
      material: 'SS 304 Sanitary',
    },
    highlights: {
      en: ['Food-grade modular belts & variable speed drives', 'Rotary accumulation tables with emergency stop', 'Custom widths and elevations to match any line'],
      es: ['Bandas sanitarias grado alimenticio y variador de frecuencia', 'Mesas acumuladoras rotativas con paro de emergencia', 'Anchos y alturas fabricados a medida de su línea'],
    },
  },
  {
    id: 'mobile-plate-filter-press',
    category: 'process',
    categoryLabel: { en: 'Process & Filtration', es: 'Proceso y Filtración' },
    title: 'Mobile Plate Filter Press System',
    titleEs: 'Sistema Móvil de Filtro Prensa de Placas',
    shortTitle: { en: 'Plate Filter Press', es: 'Filtro Prensa Móvil' },
    subtitle: {
      en: 'Cart-mounted sanitary plate filter press with industrial transfer pump for liquid clarification before filling.',
      es: 'Sistema móvil de filtración por placas montado sobre carro con bomba industrial para clarificación de líquidos.',
    },
    image: getMediaUrl('/media/catalogo/sistema-filtracion-movil-bomba-placas.webp'),
    isStudioCutout: false,
    specs: {
      speed: 'Batch / Inline',
      accuracy: 'Multi-Plate',
      material: 'SS 316L Sanitary',
    },
    highlights: {
      en: ['Mobile stainless cart for multi-tank plant use', 'Integrated sanitary positive-displacement pump', 'Easy plate disassembly for rapid sanitation'],
      es: ['Carro móvil en acero inoxidable para varios tanques', 'Bomba sanitaria integrada en el bastidor', 'Desmontaje sencillo de placas para sanitización'],
    },
  },
  {
    id: 'complete-multihead-vffs-line',
    category: 'line',
    categoryLabel: { en: 'Complete Line', es: 'Línea Completa' },
    title: 'Complete Multihead Weigher & VFFS Line',
    titleEs: 'Línea Completa de Pesadora Multicabezal y VFFS',
    shortTitle: { en: 'Multihead + VFFS Line', es: 'Línea Multicabezal VFFS' },
    subtitle: {
      en: 'Turnkey automated line combining vibratory hopper, Z-bucket elevator, stainless platform, multihead weigher, and VFFS.',
      es: 'Línea completa llave en mano con tolva vibratoria, elevador de cangilones, plataforma inoxidable, multicabezal y VFFS.',
    },
    image: getMediaUrl('/media/catalogo/linea-completa-envasado-vffs-elevador.webp'),
    gallery: [
      getMediaUrl('/media/catalogo/linea-completa-envasado-vffs-elevador.webp'),
      getMediaUrl('/media/catalogo/linea-automatizada-pesaje-empaque.webp'),
    ],
    isStudioCutout: false,
    videoUrl: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation.mp4'),
    specs: {
      speed: '40–90 BPM',
      accuracy: 'Turnkey PLC',
      material: 'SS 304 Platform',
    },
    highlights: {
      en: ['End-to-end feeding, weighing, bagging & outfeed', 'Engineered stainless service platform & stairs', 'Commissioned and calibrated with your product'],
      es: ['Alimentación, pesaje, formado y salida totalmente integrados', 'Plataforma de servicio y escaleras en acero inoxidable', 'Instalada y calibrada con su producto real'],
    },
  },
];

// Process-level stages showcased live in the Hero Instrument Panel
export const LINE_STAGES: LineStageItem[] = [
  {
    step: '01',
    id: 'stage-turnkey',
    stageName: { en: 'Complete Lines', es: 'Líneas Completas' },
    roleTitle: { en: '14-Head Multihead & VFFS Line', es: 'Línea Multicabezal 14 Cabezales + VFFS' },
    description: {
      en: 'Supply, installation, and commissioning of a Z-elevator, 14-head multihead weigher, and vertical packaging line for frozen products.',
      es: 'Suministro, instalación y puesta en marcha de elevador tipo Z, pesadora multicabezal de 14 cabezales y empacadora vertical VFFS.',
    },
    rangeLabel: {
      en: '5 lb & 10 lb frozen packaging · Miami, FL',
      es: 'Empaque de congelados 5 lb y 10 lb · Miami, FL',
    },
    highlights: {
      en: ['14-head multihead weigher + Z-elevator + VFFS', 'Dry & real-product plant commissioning', 'Operator training & ramp-up support'],
      es: ['Multicabezal 14 cabezales + elevador Z + VFFS', 'Pruebas en seco y con producto real en planta', 'Capacitación operativa y acompañamiento'],
    },
    image: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation.mp4'),
    poster: getMediaUrl('/media/in-action/vffs-multihead-14-heads-operation-poster.webp'),
    link: '/in-action',
  },
  {
    step: '02',
    id: 'stage-bottling',
    stageName: { en: 'Turnkey Bottling', es: 'Embotellado' },
    roleTitle: { en: 'Rotary Bottling, Capping & Labeling', es: 'Llenado Rotativo, Tapado y Etiquetado' },
    description: {
      en: 'Complete stainless steel liquid bottling lines combining unscrambling, rotary dosing, multi-head capping, and wrap-around labeling.',
      es: 'Líneas completas de embotellado en acero inoxidable con posicionador, dosificado rotativo, tapado multicabezal y etiquetado.',
    },
    rangeLabel: {
      en: 'Commissioned turnkey line · Houston, TX',
      es: 'Línea llave en mano instalada · Houston, TX',
    },
    highlights: {
      en: ['Rotary unscrambler & starwheel dosing', 'Optical sensors & PLC synchronization', 'Sanitary 304 / 316L contact paths'],
      es: ['Alimentador rotativo y dosificado en estrella', 'Sensores ópticos y sincronización PLC', 'Partes en contacto sanitarias 304 / 316L'],
    },
    image: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic.mp4'),
    poster: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic-poster.webp'),
    link: '/in-action',
  },
  {
    step: '03',
    id: 'stage-capping',
    stageName: { en: 'Rotary Capping', es: 'Tapado Rotativo' },
    roleTitle: { en: '4-Head Pneumatic Starwheel Capping', es: 'Tapado Neumático en Estrella (4 Cabezales)' },
    description: {
      en: 'Precision torque-controlled capping and induction sealing engineered for glass vials, cosmetics, pharma, and high-speed bottles.',
      es: 'Tapado con control de torque y sellado por inducción diseñado para frascos de vidrio, cosmética, farma y alta velocidad.',
    },
    rangeLabel: {
      en: 'Optical verification · Servo torque control',
      es: 'Verificación óptica · Control de torque',
    },
    highlights: {
      en: ['Automatic cap sorting & feeding', 'Consistent torque across screw & dropper caps', 'Zero-tipping starwheel indexing'],
      es: ['Alimentación automática de tapas', 'Torque constante en tapas roscadas y goteros', 'Indexado en estrella sin volcado'],
    },
    image: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision.mp4'),
    poster: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision-poster.webp'),
    link: '/machines',
  },
  {
    step: '04',
    id: 'stage-dosing',
    stageName: { en: 'Live Dosing', es: 'Dosificación Real' },
    roleTitle: { en: 'Multi-Head Weighing & Live Dosing', es: 'Pesaje Multicabezal con Producto Real' },
    description: {
      en: 'Precision multi-head weighing and dosing systems calibrated with real dry goods, granules, snacks, and powders prior to shipment.',
      es: 'Sistemas de pesaje y dosificación multicabezal calibrados con producto real en granos, snacks, café y sólidos antes del embarque.',
    },
    rangeLabel: {
      en: 'Real-product testing · ±0.2 g accuracy',
      es: 'Pruebas con producto real · ±0.2 g precisión',
    },
    highlights: {
      en: ['Multi-lane digital load cells', 'Real-product dry & wet calibration', 'Seamless integration with VFFS & jars'],
      es: ['Celdas de carga digitales multicarril', 'Calibración con producto real en planta', 'Integración directa con VFFS y frascos'],
    },
    image: '/thumbnails/automatic_weigh_filling_thumbnail.webp',
    videoUrl: '/videos/automatic_weigh_filler.mp4',
    poster: '/thumbnails/automatic_weigh_filling_thumbnail.webp',
    link: '/machines/filling-dosing/automatic-weight-filler',
  },
];

export const DEMO_VIDEOS: DemoVideoItem[] = [
  {
    id: 'demo-houston-bottling-line',
    title: {
      en: 'Turnkey Rotary Bottling & Capping Line (Houston, TX)',
      es: 'Línea Llave en Mano de Embotellado y Tapado (Houston, TX)',
    },
    application: {
      en: 'Full panoramic view of an integrated stainless steel line: rotary unscrambler, dosing, 4-head capping, labeling, and accumulation.',
      es: 'Vista panorámica de línea integral en acero inoxidable: alimentador rotativo, dosificación, tapado de 4 cabezales, etiquetado y acumulación.',
    },
    thumbnail: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/complete-bottling-line-houston-panoramic.mp4'),
    slug: 'rotary-bottle-filling-capping',
    specs: 'Turnkey Bottling · Houston, TX',
    duration: '00:20',
  },
  {
    id: 'demo-vial-bottling-line',
    title: {
      en: 'Integrated Vial Bottling & Capping Monoblock',
      es: 'Línea Monoblock Integrada de Envasado y Tapado',
    },
    application: {
      en: 'Synchronized turnkey line running glass vials continuously under central PLC HMI control prior to delivery.',
      es: 'Línea llave en mano sincronizada operando viales de vidrio en marcha continua bajo control HMI PLC central.',
    },
    thumbnail: '/thumbnails/line_vial_liquid_filler_thumbnail.webp',
    videoUrl: '/videos/line_vial_filler.mp4',
    slug: 'vial-bottling-line',
    specs: 'Synchronized Monoblock · PLC HMI',
    duration: '01:18',
  },
  {
    id: 'demo-rotary-capping-precision',
    title: {
      en: '4-Head Pneumatic Rotary Starwheel Capping',
      es: 'Tapadora Rotativa Neumática de 4 Cabezales en Estrella',
    },
    application: {
      en: 'High-precision pneumatic capping chucks with optical cap verification operating on continuous starwheel indexing.',
      es: 'Cabezales neumáticos de alta precisión con verificación óptica de tapa operando sobre indexado rotativo en estrella.',
    },
    thumbnail: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/rotary-capping-starwheel-precision.mp4'),
    slug: 'automatic-capping-sealing-machine',
    specs: '4-Head Pneumatic · Optical QC',
    duration: '00:10',
  },
  {
    id: 'demo-pallet-stretch-wrapper',
    title: {
      en: 'JMK Automatic Pallet Stretch Wrapper (HMI)',
      es: 'Envolvedora Automática de Pallets JMK (HMI)',
    },
    application: {
      en: 'Heavy-duty rotary turntable pallet wrapper with touchscreen HMI controls, vertical film carriage, and forklift access ramp.',
      es: 'Envolvedora industrial de pallets con plataforma giratoria, pantalla táctil HMI, carro vertical de film y rampa de carga.',
    },
    thumbnail: getMediaUrl('/media/in-action/automatic-pallet-stretch-wrapper-jmk-poster.webp'),
    videoUrl: getMediaUrl('/media/in-action/automatic-pallet-stretch-wrapper-jmk.mp4'),
    slug: 'automatic-pallet-stretch-wrapper',
    specs: 'End-of-Line · HMI Touchscreen',
    duration: '00:15',
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
