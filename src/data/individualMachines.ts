/**
 * Individual Machines Data Module
 * Contains detailed machine data for individual machine pages
 */

export interface InstallationVideo {
  title: string;
  application: string;
  thumbnail: string;
  videoUrl: string;
}

export interface IndividualMachineData {
  machineName: string;
  machineImage: string;
  description: string;
  primaryUse: string;
  idealFor: string[];
  keyBenefits: string[];
  commonApplications: string[];
  installationVideos: InstallationVideo[];
}

export type MachinesDataRecord = Record<string, IndividualMachineData>;

export const machinesData: MachinesDataRecord = {
  "automatic-weight-filler": {
    machineName: "Automatic Weigh Filler",
    machineImage: "/automatic_weight_filler_2.png",
    description: "An automatic weigh filler utilizing a high-precision linear weighing system. It is designed to efficiently dose and fill granular and free-flowing products, such as nuts, grains, and small parts, into various containers like jars, bottles, or bags.",
    primaryUse: "This machine automates the process of precisely weighing and dispensing products. It uses a linear weighing system to measure a target weight with high accuracy, then fills the product into containers. It is a key component for automating packaging lines for granular products, small parts, and free-flowing items.",
    idealFor: [
      "Filling dry goods, snacks, grains, coffee beans, cereals, and confectionery",
      "Precise dosing of tablets, capsules, pills, and granular supplements",
      "Packaging plastic pellets, granular detergents, salts, and other dry chemicals",
      "Bagging or filling small parts, fasteners, fittings, and electronic or plastic components",
      "Dosing seeds, pet food, and granular fertilizers"
    ],
    keyBenefits: [
      "Eliminates product giveaway through precise weight control, saving thousands in product costs annually",
      "Handles multiple product types without extensive changeover, maximizing production uptime",
      "Integrates seamlessly with upstream and downstream equipment for complete line automation"
    ],
    commonApplications: ["Snack Foods", "Nuts & Dried Fruits", "Coffee Beans & Tea", "Pet Food", "Grains & Cereals", "Seeds", "Confectionery", "Hardware & Small Parts"],
    installationVideos: [
      { title: "Automatic Weigh Filling into Jars", application: "Granular Product Filling", thumbnail: "/thumbnails/automatic_weigh_filling_thumbnail.png", videoUrl:"/videos/automatic_weigh_filler.mp4" },
      // { title: "Coffee Packaging Facility", application: "Seattle, USA", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", videoUrl:"" },
      // { title: "Pet Food Manufacturing", application: "Texas, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" },
      // { title: "Agricultural Processing", application: "Iowa, USA", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" }
    ]
  },
  "liquid-filling-machine": {
    machineName: "Vial Liquid Filler",
    machineImage: "/vial_liquid_filler_2.png",
    description:
      "Advanced vial filling machine designed for precise, hygienic, and efficient liquid dispensing across multiple industries.",
    primaryUse:
      "Engineered to automate the liquid filling process with exceptional accuracy and control. The Vial Liquid Filler handles everything from thin solutions to viscous fluids, ensuring consistent results and eliminating product waste. Its modular design allows seamless adaptation to different vial sizes and production needs.",
    idealFor: [
      "Pharmaceutical and biotech production lines",
      "Cosmetic and personal care manufacturing",
      "Food and beverage filling operations",
      "Chemical and laboratory applications"
    ],
    keyBenefits: [
      "Exceptional fill precision for small or large volumes",
      "Hygienic stainless-steel construction compliant with GMP standards",
      "Quick changeover between vial formats with minimal downtime",
      "Compact design optimized for integration into automated lines",
      "Optional clean-in-place (CIP) system for effortless sanitation"
    ],
    commonApplications: [
      "Injectable liquids",
      "Essential oils",
      "Serums and lotions",
      "Nutritional supplements",
      "Chemical reagents",
      "Laboratory samples"
    ],
    installationVideos: [
      {
        title: "Automatic Vial Filling Machine",
        application: "Precision filling for pharmaceutical, cosmetic, and laboratory industries.",
        thumbnail:
          "/thumbnails/vial_liquid_filler_thumbnail.png",
        videoUrl: "/videos/vial_liquid_filler.mp4"
      },
      {
        title: "Automatic Vial Filling Line Integration",
        application: "Integrated vial filling and capping line showcasing seamless automation and precision performance.",
        thumbnail: "/thumbnails/line_vial_liquid_filler_thumbnail.png",
        videoUrl: "/videos/line_vial_filler.mp4"
      }
    ]
  }
,
  "powder-filling-machine": {
    machineName: "Powder Filling Machine",
    machineImage: "https://images.unsplash.com/photo-1731958713065-ec569eef91ff?w=1080",
    description: "Specialized auger-based or vacuum filling system engineered for fine powders, ensuring dust-free operation and accurate dosing into containers of all sizes.",
    primaryUse: "Fills containers with powdered products using precision augers or vacuum technology. Ideal for products that require dust containment and exact dosing, from pharmaceuticals to protein powders.",
    idealFor: [
      "Nutritional supplement companies producing protein and vitamin powders",
      "Pharmaceutical manufacturers handling active pharmaceutical ingredients",
      "Food processors packaging flour, sugar, and powdered ingredients",
      "Industrial companies filling powdered chemicals and additives"
    ],
    keyBenefits: [
      "Dust extraction systems protect operators and maintain clean production environments",
      "Quick-change augers enable rapid product changeovers between different powder types",
      "Gentle handling preserves powder characteristics and prevents segregation"
    ],
    commonApplications: ["Protein Powders", "Pharmaceuticals", "Flour & Baking", "Baby Formula", "Spices", "Chemical Powders", "Vitamins", "Colorants"],
    installationVideos: [
      { title: "Supplement Facility", application: "California, USA", thumbnail: "https://images.unsplash.com/photo-1731958713065-ec569eef91ff?w=800", videoUrl:"" },
      { title: "Pharmaceutical Plant", application: "Germany", thumbnail: "https://images.unsplash.com/photo-1758873263491-f3969d8c6fda?w=800", videoUrl:"" },
      { title: "Food Processing", application: "Canada", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" },
      { title: "Chemical Manufacturing", application: "Netherlands", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", videoUrl:"" }
    ]
  },
  "case-sealer": {
    machineName: "Case Sealer",
    machineImage: "https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?w=1080",
    description: "Automated box sealing machine that applies tape or glue to secure corrugated cases, providing consistent, reliable seals for shipping and distribution.",
    primaryUse: "Seals the top and bottom flaps of cases as they move through the production line. Can handle various case sizes with minimal adjustments, ensuring secure closures for transport.",
    idealFor: [
      "Distribution centers shipping thousands of packages daily",
      "E-commerce fulfillment operations requiring fast, reliable sealing",
      "Manufacturing facilities packaging finished goods for retail",
      "Food and beverage companies preparing cases for shipment"
    ],
    keyBenefits: [
      "Automatic case size adjustment eliminates manual setup between different box dimensions",
      "Consistent tape application reduces material waste compared to manual taping",
      "Integrates with conveyor systems for continuous, hands-free operation"
    ],
    commonApplications: ["E-commerce", "Food Distribution", "Retail Packaging", "Electronics", "Automotive Parts", "Books & Media", "Pharmaceuticals", "Consumer Goods"],
    installationVideos: [
      { title: "Distribution Center", application: "New Jersey, USA", thumbnail: "https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?w=800", videoUrl:"" },
      { title: "E-commerce Fulfillment", application: "UK", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" },
      { title: "Food Processing Plant", application: "Spain", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" },
      { title: "Manufacturing Facility", application: "China", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", videoUrl:"" }
    ]
  },
  "vertical-form-fill-seal": {
    machineName: "Vertical Form Fill Seal (VFFS)",
    machineImage: "https://images.unsplash.com/photo-1655766294298-fd1d230ffa05?w=1080",
    description: "All-in-one packaging machine that forms bags from roll stock film, fills them with product, and seals them in one continuous vertical operation.",
    primaryUse: "Creates pouches and bags directly from film rolls while simultaneously filling and sealing them. Perfect for high-volume production where speed and packaging consistency are critical.",
    idealFor: [
      "Snack food manufacturers producing chips, candy, and nuts",
      "Coffee roasters packaging ground and whole bean products",
      "Frozen food companies creating individual portion packs",
      "Medical device manufacturers requiring sterile packaging"
    ],
    keyBenefits: [
      "Single machine replaces bag making, filling, and sealing operations, reducing equipment footprint",
      "Quick film changeover allows for multiple package designs without extended downtime",
      "Modified atmosphere packaging (MAP) capability extends product shelf life"
    ],
    commonApplications: ["Snacks", "Coffee", "Frozen Foods", "Medical Supplies", "Powders", "Granules", "Pet Treats", "Hardware Items"],
    installationVideos: [
      { title: "Snack Production", application: "Texas, USA", thumbnail: "https://images.unsplash.com/photo-1655766294298-fd1d230ffa05?w=800", videoUrl:"" },
      { title: "Coffee Roastery", application: "Portland, USA", thumbnail: "https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?w=800", videoUrl:"" },
      { title: "Frozen Food Facility", application: "Minnesota, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" },
      { title: "Medical Packaging", application: "Massachusetts, USA", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" }
    ]
  },
  "pillow-pack-machine": {
    machineName: "Pillow Pack Machine",
    machineImage: "https://images.unsplash.com/photo-1663247131258-a0782cbb1fd9?w=1080",
    description: "Horizontal flow wrapper that creates pillow-style packages by wrapping products in film and sealing both ends, ideal for solid items and individual portions.",
    primaryUse: "Wraps individual products or product groups in film using a horizontal feeding system. Creates the classic 'pillow' package shape used for everything from candy bars to soap.",
    idealFor: [
      "Bakeries packaging bread, cookies, and pastries",
      "Candy manufacturers wrapping individual bars and treats",
      "Soap and cosmetic companies creating retail-ready packages",
      "Food service operations packaging prepared meals and sandwiches"
    ],
    keyBenefits: [
      "Handles irregular product shapes that vertical machines cannot accommodate",
      "Creates hermetic seals that protect products from moisture and contamination",
      "High-speed operation reaches 250+ packages per minute for small items"
    ],
    commonApplications: ["Baked Goods", "Candy Bars", "Soap", "Fresh Produce", "Medical Devices", "Hardware", "Prepared Foods", "Ice Cream"],
    installationVideos: [
      { title: "Bakery Operation", application: "New York, USA", thumbnail: "https://images.unsplash.com/photo-1663247131258-a0782cbb1fd9?w=800", videoUrl:"" },
      { title: "Candy Production", application: "Pennsylvania, USA", thumbnail: "https://images.unsplash.com/photo-1655766294298-fd1d230ffa05?w=800", videoUrl:"" },
      { title: "Soap Manufacturing", application: "Ohio, USA", thumbnail: "https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?w=800", videoUrl:"" },
      { title: "Food Service Packaging", application: "Illinois, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" }
    ]
  },
  "belt-conveyor-systems": {
    machineName: "Belt Conveyor Systems",
    machineImage: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=1080",
    description: "Modular transport system using continuous belt movement to move products smoothly between production stages with adjustable speeds and configurations.",
    primaryUse: "Transports products from one station to another within manufacturing and packaging facilities. Serves as the circulatory system of production lines, connecting all equipment.",
    idealFor: [
      "Assembly lines requiring coordinated movement of work-in-progress",
      "Packaging facilities moving filled products to labeling and palletizing",
      "Sorting operations distributing items to multiple destinations",
      "Warehouses transferring goods between receiving and shipping"
    ],
    keyBenefits: [
      "Stainless steel construction meets food-grade sanitation requirements",
      "Variable speed drives synchronize with upstream and downstream equipment",
      "Modular design allows easy expansion as production needs grow"
    ],
    commonApplications: ["Food Processing", "Warehousing", "Assembly Lines", "Sorting Centers", "Airports", "Mining", "Recycling", "Manufacturing"],
    installationVideos: [
      { title: "Food Processing Plant", application: "Georgia, USA", thumbnail: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=800", videoUrl:"" },
      { title: "Distribution Center", application: "Nevada, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" },
      { title: "Assembly Facility", application: "Michigan, USA", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" },
      { title: "Sorting Center", application: "Kentucky, USA", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800", videoUrl:"" }
    ]
  },
  "robotic-palletizers": {
    machineName: "Robotic Palletizers",
    machineImage: "https://images.unsplash.com/photo-1726244707795-0f5b7e14e0cd?w=1080",
    description: "Articulated robot arms with specialized grippers that pick and place products onto pallets in programmable patterns for efficient shipping and storage.",
    primaryUse: "Automatically stacks cases, bags, or other packages onto pallets in organized patterns. Eliminates manual lifting while ensuring stable pallet loads for transport.",
    idealFor: [
      "End-of-line operations stacking finished goods for shipment",
      "Multi-SKU facilities requiring frequent pattern changes",
      "Operations with limited floor space needing compact automation",
      "Facilities handling heavy products that stress manual workers"
    ],
    keyBenefits: [
      "Quick pattern programming allows one robot to handle multiple product types daily",
      "Compact footprint fits into existing facilities without major renovation",
      "Consistent placement creates stable loads that reduce damage during shipping"
    ],
    commonApplications: ["Food & Beverage", "Consumer Goods", "Building Materials", "Pharmaceuticals", "Pet Food", "Chemicals", "Automotive Parts", "Electronics"],
    installationVideos: [
      { title: "Beverage Facility", application: "Colorado, USA", thumbnail: "https://images.unsplash.com/photo-1726244707795-0f5b7e14e0cd?w=800", videoUrl:"" },
      { title: "Consumer Goods", application: "South Carolina, USA", thumbnail: "https://images.unsplash.com/photo-1663236140798-1bd2c480b816?w=800", videoUrl:"" },
      { title: "Building Materials", application: "Tennessee, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" },
      { title: "Pharmaceutical Plant", application: "New Jersey, USA", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" }
    ]
  },
  "inkjet-printers": {
    machineName: "Inkjet Printers",
    machineImage: "https://images.unsplash.com/photo-1750534232339-017655f56081?w=1080",
    description: "Continuous inkjet printing system for high-speed application of expiration dates, batch codes, and variable data directly onto products and packaging.",
    primaryUse: "Prints alphanumeric codes, barcodes, and logos on products as they move through production lines. Essential for traceability, compliance, and brand protection.",
    idealFor: [
      "Food manufacturers marking expiration dates and batch numbers",
      "Beverage companies printing date codes on bottles and cans",
      "Pharmaceutical producers adding lot numbers for traceability",
      "Logistics operations printing shipping labels and tracking codes"
    ],
    keyBenefits: [
      "Prints on various surfaces including glass, plastic, metal, and cardboard without contact",
      "High-speed capability keeps pace with production lines running 1000+ units per minute",
      "Automatic nozzle cleaning prevents downtime from clogging"
    ],
    commonApplications: ["Expiration Dates", "Batch Codes", "Barcodes", "Serial Numbers", "Logos", "Promotional Text", "Shipping Labels", "QR Codes"],
    installationVideos: [
      { title: "Beverage Production", application: "Wisconsin, USA", thumbnail: "https://images.unsplash.com/photo-1750534232339-017655f56081?w=800", videoUrl:"" },
      { title: "Food Processing", application: "Arkansas, USA", thumbnail: "https://images.unsplash.com/photo-1731958713065-ec569eef91ff?w=800", videoUrl:"" },
      { title: "Pharmaceutical", application: "Puerto Rico", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" },
      { title: "Logistics Center", application: "Indiana, USA", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" }
    ]
  },
  "cip-systems": {
    machineName: "CIP (Clean-In-Place) Systems",
    machineImage: "https://images.unsplash.com/photo-1762087021974-b0729f37a8fe?w=1080",
    description: "Automated cleaning system that circulates cleaning solutions through processing equipment without disassembly, ensuring sanitary conditions for food production.",
    primaryUse: "Cleans piping, tanks, fillers, and other processing equipment using programmed cycles of water, detergents, and sanitizers. Eliminates manual cleaning labor while ensuring consistent results.",
    idealFor: [
      "Dairy processors cleaning milk lines and tanks daily",
      "Beverage producers maintaining sanitary filling equipment",
      "Breweries and wineries cleaning fermentation and transfer systems",
      "Pharmaceutical manufacturers requiring validated cleaning procedures"
    ],
    keyBenefits: [
      "Automated cycles ensure repeatable cleaning results that meet safety standards",
      "Reduces water and chemical consumption compared to manual cleaning methods",
      "Documented cleaning records provide audit trails for regulatory compliance"
    ],
    commonApplications: ["Dairy Processing", "Beverage Production", "Brewing", "Food Processing", "Pharmaceuticals", "Cosmetics", "Chemical Processing", "Biotech"],
    installationVideos: [
      { title: "Dairy Plant", application: "Vermont, USA", thumbnail: "https://images.unsplash.com/photo-1762087021974-b0729f37a8fe?w=800", videoUrl:"" },
      { title: "Brewery", application: "Oregon, USA", thumbnail: "https://images.unsplash.com/photo-1698664434322-94a43b98b9ba?w=800", videoUrl:"" },
      { title: "Beverage Facility", application: "North Carolina, USA", thumbnail: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800", videoUrl:"" },
      { title: "Pharmaceutical", application: "Ireland", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", videoUrl:"" }
    ]
  }
};
