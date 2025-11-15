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
};
