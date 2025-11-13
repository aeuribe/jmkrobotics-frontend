// data/productionLines.ts
/**
 * Production Lines Data Module
 * Complete production solutions showing multiple machines working together
 */

export type MediaType = 'image' | 'video';

export interface ProductionLineMedia {
  type: MediaType;
  url: string;
  thumbnail?: string; // For videos or preview
  title: string;
  description?: string;
}

export interface ProductionLine {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  industry: string;
  machines: string; // List of machines included in the line
  benefits: string;
  media: ProductionLineMedia[];
  capacity?: string;
  location?: string;
}

/**
 * Production lines data
 * - Tipado explícito en la constante para evitar implicit any
 * - ReadonlyArray para seguridad inmutabilidad (opcional)
 */
export const productionLines: ProductionLine[] = [
  {
  id: "automatic-vial-filling-line",
  title: "productionLines.automatic-vial-filling-line.title",
  subtitle: "productionLines.automatic-vial-filling-line.subtitle",
  description: "productionLines.automatic-vial-filling-line.description",
  industry: "productionLines.automatic-vial-filling-line.industry",
  machines: "productionLines.automatic-vial-filling-line.machines",
  benefits: "productionLines.automatic-vial-filling-line.benefits",
  capacity: "",
  location: "",
    media: [
      {
        type: "video",
        url: "https://youtu.be/rViD59cijCU",
        thumbnail: "/thumbnails/automatic_vial_filling_line_thumbnail.jpg",
        title: "Complete Automatic Bottling Line | Vial Filling, Capping, Sealing & Labeling",
        description: "Complete line processing juice bottles at full speed",
      },
      {
        type: "video",
        url: "https://youtube.com/shorts/HGPz9mJf7Qw",
        title: "Rotary Table - Automatic Vial Bottling Line",
        description: "Rotary accumulation table collecting finished vials at the end of an Automatic Vial Bottling Line.",
      },
    ],
  },

//   {
//     id: "snack-food-packaging",
//     title: "Snack Food Packaging Line",
//     subtitle: "Precision weighing, filling, and cartoning",
//     description: "Integrated snack packaging system featuring multi-head weighers, vertical form-fill-seal machines, metal detectors, and automated cartoning. Perfect for chips, nuts, and dried fruits.",
//     industry: "Food Processing",
//     machines: [
//       "Multi-head Weigher",
//       "Vertical Form-Fill-Seal Machine",
//       "Metal Detector",
//       "Cartoning Machine",
//       "Case Packer"
//     ],
//     benefits: [
//       "±0.5g weighing accuracy eliminates product giveaway",
//       "Handles multiple bag sizes without extensive changeover",
//       "Integrated quality control with reject system",
//       "Flexible packaging options (pillow bags, gusseted, quad-seal)"
//     ],
//     capacity: "80 bags/minute",
//     location: "Texas, USA",
//     media: [
//       {
//         type: 'video',
//         url: 'https://www.youtube.com/watch?v=5MYDgqRx7gA',
//         thumbnail: 'https://images.unsplash.com/photo-1758873263491-f3969d8c6fda?w=800',
//         title: 'Full Snack Packaging Line',
//         description: 'Potato chips being weighed, bagged, and boxed'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200',
//         title: 'Multi-head Weigher Close-up',
//         description: '14-head combination weigher in operation'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
//         title: 'Vertical Bagger Station',
//         description: 'VFFS machine creating and filling bags'
//       }
//     ]
//   },
//   {
//     id: "pharmaceutical-liquid",
//     title: "Pharmaceutical Liquid Line",
//     subtitle: "Sterile filling for medical products",
//     description: "Cleanroom-grade liquid filling line for pharmaceutical products. Includes bottle washing, sterile filling, capping under nitrogen, inspection, and serialization for track-and-trace compliance.",
//     industry: "Pharmaceutical",
//     machines: [
//       "Bottle Rinser",
//       "Sterile Liquid Filler",
//       "Nitrogen Purge Capper",
//       "Vision Inspection System",
//       "Serialization Printer"
//     ],
//     benefits: [
//       "ISO Class 7 cleanroom compatible",
//       "Nitrogen purging prevents oxidation",
//       "100% vision inspection catches defects",
//       "Serialization ready for regulatory compliance"
//     ],
//     capacity: "4,000 units/hour",
//     location: "New Jersey, USA",
//     media: [
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1570615541379-e6b7ab6d4eb9?w=1200',
//         title: 'Cleanroom Filling Environment',
//         description: 'Pharmaceutical filling in controlled environment'
//       },
//       {
//         type: 'video',
//         url: 'https://www.youtube.com/watch?v=9-YJGQzUHY8',
//         thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
//         title: 'Sterile Filling Process',
//         description: 'Automated pharmaceutical bottle filling and capping'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
//         title: 'Inspection Station',
//         description: 'High-speed camera inspection system'
//       }
//     ]
//   },
//   {
//     id: "pet-food-bagging",
//     title: "Pet Food Bagging & Palletizing",
//     subtitle: "Heavy-duty bagging for large format products",
//     description: "Robust pet food packaging line handling 5-50 lb bags. Features heavy-duty weighers, open-mouth baggers, automatic bag placers, and robotic palletizing for efficient warehouse operations.",
//     industry: "Pet Food",
//     machines: [
//       "Linear Weight Filler",
//       "Bag Placer",
//       "Bag Sealer",
//       "Metal Detector",
//       "Robotic Palletizer"
//     ],
//     benefits: [
//       "Handles dusty products with specialized ventilation",
//       "Robotic palletizer creates stable, optimized pallet patterns",
//       "Automatic bag supply reduces labor requirements",
//       "Integrated dust collection maintains clean environment"
//     ],
//     capacity: "20 bags/minute (up to 50 lb)",
//     location: "Iowa, USA",
//     media: [
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200',
//         title: 'Pet Food Production Floor',
//         description: 'Complete bagging line with robotic palletizer'
//       },
//       {
//         type: 'video',
//         url: 'https://vimeo.com/76979871',
//         thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
//         title: 'Robotic Palletizing Demo',
//         description: 'Robot stacking 40 lb pet food bags'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200',
//         title: 'Linear Weigher Detail',
//         description: 'Heavy-duty weighing system for large bags'
//       }
//     ]
//   },
//   {
//     id: "dairy-filling-line",
//     title: "Dairy Product Filling Line",
//     subtitle: "Aseptic processing for extended shelf life",
//     description: "Advanced aseptic filling line for dairy products including milk, yogurt, and cream. Features pasteurization, aseptic filling, foil sealing, and date coding in a compact footprint.",
//     industry: "Dairy",
//     machines: [
//       "Pasteurizer",
//       "Aseptic Filler",
//       "Foil Sealer",
//       "Inkjet Date Coder",
//       "Shrink Wrapper"
//     ],
//     benefits: [
//       "Extended shelf life without refrigeration",
//       "Preserves nutritional value and taste",
//       "Flexible container options (cups, bottles, pouches)",
//       "Minimal product waste during changeover"
//     ],
//     capacity: "6,000 cups/hour",
//     location: "Wisconsin, USA",
//     media: [
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
//         title: 'Aseptic Filling Station',
//         description: 'Yogurt cups being filled and sealed'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1570615541379-e6b7ab6d4eb9?w=1200',
//         title: 'Foil Sealing Process',
//         description: 'High-speed heat sealing of dairy cups'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092583537-20d51876fd3d?w=1200',
//         title: 'Multi-pack Shrink Wrapping',
//         description: 'Automated bundling of cup multi-packs'
//       }
//     ]
//   },
//   {
//     id: "cosmetics-filling",
//     title: "Cosmetics Filling & Labeling",
//     subtitle: "Precision filling for beauty products",
//     description: "Specialized filling line for cosmetic creams, lotions, and serums. Includes heated filling for viscous products, premium labeling, and quality inspection for high-end brands.",
//     industry: "Cosmetics",
//     machines: [
//       "Heated Filling Machine",
//       "Jar Capping Machine",
//       "Wrap-around Labeler",
//       "Vision Inspection",
//       "Cartoning Machine"
//     ],
//     benefits: [
//       "Heated filling handles thick creams and butters",
//       "No-drip filling maintains package cleanliness",
//       "Premium labeling for high-end product presentation",
//       "Gentle handling preserves product quality"
//     ],
//     capacity: "3,000 units/hour",
//     location: "New York, USA",
//     media: [
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1570615541379-e6b7ab6d4eb9?w=1200',
//         title: 'Luxury Cosmetics Line',
//         description: 'Premium jars being filled with face cream'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
//         title: 'Precision Filling Heads',
//         description: 'Multi-head piston filler for thick products'
//       },
//       {
//         type: 'image',
//         url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
//         title: 'Labeling & Cartoning',
//         description: 'Automated label application and box insertion'
//       }
//     ]
//   }
];

// Helper function to get production line by ID
export function getProductionLineById(id: string): ProductionLine | undefined {
  return productionLines.find(line => line.id === id);
}

// Helper function to get production lines by industry
export function getProductionLinesByIndustry(industry: string): ProductionLine[] {
  return productionLines.filter(line => 
    line.industry.toLowerCase() === industry.toLowerCase()
  );
}

// Get all unique industries
export function getAllIndustries(): string[] {
  return Array.from(new Set(productionLines.map(line => line.industry)));
}
