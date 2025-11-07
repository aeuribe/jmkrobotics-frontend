/**
 * Categories Data Module
 * Contains all machine category definitions with their associated machines
 */



export interface Machine {
  id?: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

export interface Category {
  categoryName: string;
  categoryDescription: string;
  machines: Machine[];
  onMachineSelect?: (machine: string) => void;
}

export const createFillingDosingCategory = (onMachineSelect: (machine: string) => void): Category => ({
  categoryName: "Filling & Dosing Systems",
  categoryDescription: "Precision filling and dosing solutions for liquids, powders, and granular products. Our systems deliver accurate measurements and high-speed performance for various production requirements.",
  machines: [
    {
      id: "automatic-weight-filler",
      name: "Automatic Weight Filler",
      description: "Efficient and reliable filling solution for granular and powdered products, designed to optimize packaging workflows.",
      features: [
        "Automated weight-based filling",
        "Adaptable to various product types",
        "Consistent performance and output",
        "Ideal for medium to high-volume operations"
      ]
    ,
      image: "/automatic_weight_filler.png"
    },
    {
      id: "liquid-filling-machine",
      name: "Vial Liquid Filler",
      description: "High-precision liquid filling system for vials and bottles.",
      features: [
        "Supports a wide range of liquid viscosities",
        "Compatible with automatic capping and labeling lines",
        "Designed for easy cleaning and maintenance",
        "Delivers consistent, high-speed filling performance"
      ],
      image: "/vial_liquid_filler.png"
    },
  ],
  onMachineSelect
});

export const createSealingPackagingCategory = (onMachineSelect: (machine: string) => void): Category => ({
  categoryName: "Sealing & Packaging Systems",
  categoryDescription: "Complete sealing and packaging solutions from case sealing to form-fill-seal systems. Engineered for reliability, speed, and consistent seal quality.",
  machines: [
    {
      id: "case-sealer",
      name: "Case Sealer",
      description: "Automatic top and bottom case sealing for corrugated boxes",
      features: [
        "Random case size adjustment",
        "Hot melt or tape sealing",
        "Speed: 25-30 cases/min",
        "Heavy-duty construction"
      ],
      image: "https://images.unsplash.com/photo-1727292485858-588c7652ad69?w=800"
    },
    {
      id: "vertical-form-fill-seal",
      name: "Vertical Form Fill Seal Machine (VFFS)",
      description: "Automated bag making, filling, and sealing from roll stock",
      features: [
        "Film width: 100mm - 600mm",
        "Speed: 30-80 bags/min",
        "Multi-servo control",
        "Touch screen HMI"
      ],
      image: "https://images.unsplash.com/photo-1717386255785-59c670564341?w=800"
    },
    {
      id: "pillow-pack-machine",
      name: "Pillow Pack Machine",
      description: "High-speed horizontal flow wrapping for solid products",
      features: [
        "Product size flexibility",
        "Speed: 100-250 packs/min",
        "End seal options",
        "Photo eye registration"
      ],
      image: "https://images.unsplash.com/photo-1642821369416-e0f78d23401f?w=800"
    }
  ],
  onMachineSelect
});

export const createLabelingIdentificationCategory = (onMachineSelect: (machine: string) => void): Category => ({
  categoryName: "Labeling & Identification",
  categoryDescription: "Advanced labeling systems for products, bottles, and packaging. Precision application with high-speed performance and maximum uptime.",
  machines: [
    {
      id: "labeling-machine",
      name: "Labeling Machine",
      description: "Multi-function labeling system for various container shapes",
      features: [
        "Top, side, wrap-around labels",
        "Speed: 100-300 units/min",
        "Quick changeover",
        "Vision inspection ready"
      ],
      image: "https://images.unsplash.com/photo-1740478871010-124bae18a362?w=800"
    },
    {
      id: "bottle-labeler",
      name: "Bottle Labeler",
      description: "Specialized system for round bottle label application",
      features: [
        "Front & back labeling",
        "Orientation control",
        "Speed: 150-400 bottles/min",
        "Label detection sensors"
      ],
      image: "https://images.unsplash.com/photo-1668775589938-58517ad578b9?w=800"
    },
    {
      id: "box-labeler",
      name: "Box Labeler",
      description: "Precision labeling for cartons, boxes, and flat surfaces",
      features: [
        "Top and side application",
        "Conveyor integration",
        "Barcode printing option",
        "Label verification system"
      ],
      image: "https://images.unsplash.com/photo-1604088308691-59fb736f0b2b?w=800"
    }
  ],
  onMachineSelect
});

export const createConveyorHandlingCategory = (onMachineSelect: (machine: string) => void): Category => ({
  categoryName: "Conveyor & Material Handling",
  categoryDescription: "Efficient material flow solutions from simple belt conveyors to complex accumulation systems. Designed for seamless integration with your production line.",
  machines: [
    {
      id: "belt-conveyor-systems",
      name: "Belt Conveyor Systems",
      description: "Modular belt conveyor systems for product transport",
      features: [
        "Stainless steel construction",
        "Variable speed control",
        "Food-grade belting options",
        "Lengths up to 50 meters"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
    },
    {
      id: "accumulation-tables",
      name: "Accumulation Tables",
      description: "Rotary and linear accumulation for buffer zones",
      features: [
        "Pressure-free accumulation",
        "Diameter: 800mm - 2000mm",
        "Speed synchronization",
        "Integrated sensors"
      ],
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"
    },
    {
      id: "product-elevators",
      name: "Product Elevators",
      description: "Vertical product transfer between production levels",
      features: [
        "Sanitary design",
        "Lift height up to 6 meters",
        "Gentle product handling",
        "Safety interlocks included"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
    }
  ],
  onMachineSelect
});

export const createQualityInspectionCategory = (onMachineSelect: (machine: string) => void): Category => ({
  categoryName: "Quality Control & Inspection",
  categoryDescription: "Advanced inspection systems to ensure product quality and safety compliance. Real-time detection and rejection of defective products.",
  machines: [
    {
      id: "metal-detector-systems",
      name: "Metal Detector Systems",
      description: "Multi-frequency metal detection for contaminant prevention",
      features: [
        "Sensitivity: 0.3mm ferrous",
        "HACCP compliant",
        "Automatic rejection",
        "IP66 washdown rated"
      ],
      image: "https://images.unsplash.com/photo-1717386255777-ce60792a2a56?w=800"
    },
    {
      id: "checkweigher-scales",
      name: "Checkweigher Scales",
      description: "High-speed dynamic weighing for weight verification",
      features: [
        "Accuracy: ±0.1g - ±50g",
        "Speed: up to 400 ppm",
        "Automatic sorting",
        "Statistical reporting"
      ],
      image: "https://images.unsplash.com/photo-1590038667005-7d82ac6f864b?w=800"
    },
    {
      id: "vision-inspection-systems",
      name: "Vision Inspection Systems",
      description: "AI-powered visual quality inspection",
      features: [
        "360° inspection capability",
        "Defect detection & classification",
        "Label verification",
        "Real-time alerts"
      ],
      image: "https://images.unsplash.com/photo-1727292485858-588c7652ad69?w=800"
    }
  ],
  onMachineSelect
});

export const palletizingCategory: Category = {
  categoryName: "Palletizing & Depalletizing",
  categoryDescription: "Robotic and conventional palletizing solutions for end-of-line automation. From single SKU to mixed-case palletizing configurations.",
  machines: [
    {
      id: "robotic-palletizers",
      name: "Robotic Palletizers",
      description: "Articulated robot arms for flexible palletizing",
      features: [
        "Reach: 2.5m - 3.5m",
        "Payload: 80kg - 300kg",
        "Multi-pattern capability",
        "Quick pattern changeover"
      ],
      image: "https://images.unsplash.com/photo-1590038667005-7d82ac6f864b?w=800"
    },
    {
      id: "layer-palletizers",
      name: "Layer Palletizers",
      description: "High-speed layer forming and placing systems",
      features: [
        "Speed: 10-15 layers/min",
        "Multiple pallet stations",
        "Slip sheet insertion",
        "Pallet height detection"
      ],
      image: "https://images.unsplash.com/photo-1717386255785-59c670564341?w=800"
    },
    {
      id: "pallet-dispensers",
      name: "Pallet Dispensers",
      description: "Automatic pallet magazine and dispenser",
      features: [
        "Capacity: 25-50 pallets",
        "Auto-indexing",
        "Empty detection",
        "Safety guarding"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
    }
  ]
};

export const codingMarkingCategory: Category = {
  categoryName: "Coding & Marking Systems",
  categoryDescription: "Industrial printing and marking solutions for product traceability, expiration dates, batch codes, and branding requirements.",
  machines: [
    {
      name: "Inkjet Printers",
      description: "Continuous inkjet (CIJ) for high-speed coding",
      features: [
        "Print speed: up to 1000/min",
        "Multi-line printing",
        "Food-grade inks available",
        "IP65 protection"
      ],
      image: "https://images.unsplash.com/photo-1642821369416-e0f78d23401f?w=800"
    },
    {
      name: "Laser Marking Systems",
      description: "Permanent laser engraving for metals and plastics",
      features: [
        "Fiber/CO2 laser options",
        "No consumables required",
        "High resolution marking",
        "Tamper-proof codes"
      ],
      image: "https://images.unsplash.com/photo-1717386255777-ce60792a2a56?w=800"
    },
    {
      name: "Thermal Transfer Printers",
      description: "High-quality label and package printing",
      features: [
        "300 DPI resolution",
        "Variable data printing",
        "RFID encoding option",
        "Ribbon save technology"
      ],
      image: "https://images.unsplash.com/photo-1740478871010-124bae18a362?w=800"
    }
  ]
};

export const cleaningSanitationCategory: Category = {
  categoryName: "Cleaning & Sanitation",
  categoryDescription: "Automated cleaning systems for equipment and product sanitization. Essential for food, beverage, and pharmaceutical production compliance.",
  machines: [
    {
      name: "CIP (Clean-In-Place) Systems",
      description: "Automated equipment cleaning without disassembly",
      features: [
        "Multi-tank configuration",
        "Recipe-based cleaning",
        "Temperature control",
        "Conductivity monitoring"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
    },
    {
      name: "Container Rinser",
      description: "Bottle and container rinsing before filling",
      features: [
        "Air, water, or steam rinse",
        "Speed: 100-500 containers/min",
        "Inverting or vacuum rinse",
        "Sanitary design"
      ],
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"
    },
    {
      name: "Air Knife Dryers",
      description: "High-velocity air drying for washed products",
      features: [
        "Adjustable air velocity",
        "HEPA filtration option",
        "Energy efficient blowers",
        "Stainless construction"
      ],
      image: "https://images.unsplash.com/photo-1720036236694-d0a231c52563?w=800"
    }
  ]
};

/**
 * NUEVA CATEGORÍA: Robotics & Automation
 * Ejemplo de cómo crear una categoría desde cero
 */
// export const roboticsAutomationCategory: Category = {
//   categoryName: "Robotics & Automation",
//   categoryDescription: "Advanced robotic systems and automation solutions for modern manufacturing. Collaborative robots, pick-and-place systems, and intelligent automation for increased productivity.",
//   machines: [
//     {
//       id: "collaborative-robots",
//       name: "Collaborative Robots (Cobots)",
//       description: "Safe human-robot collaboration for flexible automation",
//       features: [
//         "Payload: 3kg - 16kg",
//         "No safety caging required",
//         "Easy programming interface",
//         "Quick deployment & redeployment"
//       ],
//       image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
//     },
//     {
//       id: "delta-robots",
//       name: "Delta Pick & Place Robots",
//       description: "High-speed parallel robots for picking and packaging",
//       features: [
//         "Speed: up to 300 picks/min",
//         "Precision: ±0.1mm repeatability",
//         "Compact ceiling-mounted design",
//         "Vision-guided positioning"
//       ],
//       image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
//     },
//     {
//       id: "scara-robots",
//       name: "SCARA Assembly Robots",
//       description: "Selective compliance robots for precision assembly tasks",
//       features: [
//         "4-axis horizontal articulation",
//         "Ideal for assembly & dispensing",
//         "Cycle time: < 0.5 seconds",
//         "Cleanroom compatible versions"
//       ],
//       image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
//     }
//   ]
// };
