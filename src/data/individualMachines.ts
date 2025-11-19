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
    description:
      "An automatic weigh filler utilizing a high-precision linear weighing system. It is designed to efficiently dose and fill granular and free-flowing products, such as nuts, grains, and small parts, into various containers like jars, bottles, or bags.",
    primaryUse:
      "This machine automates the process of precisely weighing and dispensing products. It uses a linear weighing system to measure a target weight with high accuracy, then fills the product into containers. It is a key component for automating packaging lines for granular products, small parts, and free-flowing items.",
    idealFor: [
      "Filling dry goods, snacks, grains, coffee beans, cereals, and confectionery",
      "Precise dosing of tablets, capsules, pills, and granular supplements",
      "Packaging plastic pellets, granular detergents, salts, and other dry chemicals",
      "Bagging or filling small parts, fasteners, fittings, and electronic or plastic components",
      "Dosing seeds, pet food, and granular fertilizers",
    ],
    commonApplications: [
      "Snack Foods",
      "Nuts & Dried Fruits",
      "Coffee Beans & Tea",
      "Pet Food",
      "Grains & Cereals",
      "Seeds",
      "Confectionery",
      "Hardware & Small Parts",
    ],
    installationVideos: [
      {
        title: "Automatic Weigh Filling into Jars",
        application: "Granular Product Filling",
        thumbnail: "/thumbnails/automatic_weigh_filling_thumbnail.png",
        videoUrl: "/videos/automatic_weigh_filler.mp4",
      },
    ],
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
      "Chemical and laboratory applications",
    ],
    commonApplications: [
      "Injectable liquids",
      "Essential oils",
      "Serums and lotions",
      "Nutritional supplements",
      "Chemical reagents",
      "Laboratory samples",
    ],
    installationVideos: [
      {
        title: "Automatic Vial Filling Machine",
        application:
          "Precision filling for pharmaceutical, cosmetic, and laboratory industries.",
        thumbnail: "/thumbnails/vial_liquid_filler_thumbnail.png",
        videoUrl: "/videos/vial_liquid_filler.mp4",
      },
      {
        title: "Automatic Vial Filling Line Integration",
        application:
          "Integrated vial filling and capping line showcasing seamless automation and precision performance.",
        thumbnail: "/thumbnails/line_vial_liquid_filler_thumbnail.png",
        videoUrl: "/videos/line_vial_filler.mp4",
      },
    ],
  },

  "automatic-vial-labeling-machine": {
    machineName: "Automatic Vial Labeling Machine",
    machineImage: "/automatic_vial_labeling_machine_2.png",
    description:
      "High-precision automated system designed for applying wrap-around (circumferential) labels to vials and small cylindrical containers.",
    primaryUse:
      "Engineered to automate the labeling process with exceptional accuracy and speed, ensuring seamless integration into filling and capping lines. The machine provides stable product handling and consistent label placement, which is critical for traceability and serialization compliance.",
    idealFor: [
      "Pharmaceutical and biotech production lines (cGMP environments)",
      "Nutraceutical and vitamin packaging",
      "Cosmetic and essential oil bottling",
      "Laboratory and chemical sampling operations",
    ],
    commonApplications: [
      "Labeling of injectable vials and ampoules",
      "Serialization (2D matrix codes) and coding",
      "Wrap-around labeling on small cylindrical bottles",
      "Batch number and expiry date printing (via integrated printer)",
      "Tamper-evident sealing (with optional module)",
    ],
    installationVideos: [
      {
        title: "Automatic Vial Labeling Machine Setup",
        application:
          "Demonstration of label loading and sensor calibration for optimal placement.",
        thumbnail: "", // USER: Insertar link a la miniatura
        videoUrl: "https://youtu.be/NSQu-K5IP-8", // USER: Insertar link al video
      },
      {
        title: "Vial Wrap-Around Labeling In Action",
        application:
          "Demonstration of label loading and sensor calibration for optimal placement.",
        thumbnail: "", // USER: Insertar link a la miniatura
        videoUrl: "https://youtu.be/EHHh7Ui7ZOE", // USER: Insertar link al video
      },
    ],
  },
  "automatic-capping-sealing-machine": {
    machineName: "Automatic Linear Capping and Sealing Machine",
    machineImage: "/linear_capping_sealing_machine_2.png",
    description:
      "High-speed equipment designed for the automatic application and hermetic sealing of screw caps or snap-on caps on a wide range of containers.",
    primaryUse:
      "Engineered to automate the final packaging stage by securely and consistently affixing various cap types (e.g., screw, ROPP, snap-on) to bottles, ensuring product integrity, preventing leakage, and providing a consistent tamper-evident seal, critical for market compliance and product safety.",
    idealFor: [
      "High-volume Food and Beverage production lines",
      "Cosmetic and Personal Care product manufacturing",
      "Chemical and Household goods packaging facilities",
      "Nutraceutical and Dietary Supplement bottling operations",
    ],
    commonApplications: [
      "Applying continuous thread (screw) caps with precise torque control",
      "Sealing with Roll-On Pilfer Proof (ROPP) caps",
      "Securing trigger sprayers and pump dispensers",
      "Integration with upstream filling and downstream labeling systems",
      "Capping wide-mouth containers for jars and bulk products",
    ],
    installationVideos: [
      {
        title: "Automatic Linear Capping Sealing Machine",
        application:
          "Demonstration of label loading and sensor calibration for optimal placement.",
        thumbnail: "", // USER: Insertar link a la miniatura
        videoUrl: "https://youtu.be/Z6mEpDMr9Wk", // USER: Insertar link al video
      },
      {
        title: "Automatic Linear Capping Sealing Machine",
        application:
          "Demonstration of label loading and sensor calibration for optimal placement.",
        thumbnail: "", // USER: Insertar link a la miniatura
        videoUrl: "https://youtu.be/r7JkrfBkp4I", // USER: Insertar link al video
      },
    ],
  },
};
