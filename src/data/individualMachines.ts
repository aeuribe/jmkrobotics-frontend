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
    commonApplications: ["Snack Foods", "Nuts & Dried Fruits", "Coffee Beans & Tea", "Pet Food", "Grains & Cereals", "Seeds", "Confectionery", "Hardware & Small Parts"],
    installationVideos: [
      { title: "Automatic Weigh Filling into Jars", application: "Granular Product Filling", thumbnail: "/thumbnails/automatic_weigh_filling_thumbnail.png", videoUrl:"/videos/automatic_weigh_filler.mp4" },
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
};
