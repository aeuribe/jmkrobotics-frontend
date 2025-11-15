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
  link?: string;
}

export interface Category {
  categoryName: string;
  categoryDescription: string;
  machines: Machine[];
  onMachineSelect?: (machine: string) => void;
}

/**
 * createFillingDosingCategory
 * Usa el hook de traducción `t` de next-intl
 */
export const createFillingDosingCategory = (
  t: { (key: string): string; raw: (key: string) => unknown },
  onMachineSelect: (machine: string) => void
): Category => {
  // ✅ Aseguramos que siempre sean arrays
  const autoWeightFillerFeatures = Array.isArray(
    t.raw("categorySection.filling-dosing.machines.automatic-weight-filler.features")
  )
    ? (t.raw("categorySection.filling-dosing.machines.automatic-weight-filler.features") as string[])
    : [];

  const liquidFillingMachineFeatures = Array.isArray(
    t.raw("categorySection.filling-dosing.machines.liquid-filling-machine.features")
  )
    ? (t.raw("categorySection.filling-dosing.machines.liquid-filling-machine.features") as string[])
    : [];

  return {
    categoryName: t("categorySection.filling-dosing.categoryName"),
    categoryDescription: t("categorySection.filling-dosing.categoryDescription"),
    machines: [
      {
        id: "automatic-weight-filler",
        name: t("categorySection.filling-dosing.machines.automatic-weight-filler.name"),
        description: t("categorySection.filling-dosing.machines.automatic-weight-filler.description"),
        features: autoWeightFillerFeatures,
        image: "/automatic_weight_filler.png",
        link: "/machines/filling-dosing/automatic-weight-filler",
      },
      {
        id: "liquid-filling-machine",
        name: t("categorySection.filling-dosing.machines.liquid-filling-machine.name"),
        description: t("categorySection.filling-dosing.machines.liquid-filling-machine.description"),
        features: liquidFillingMachineFeatures,
        image: "/vial_liquid_filler.png",
        link: "/machines/filling-dosing/liquid-filling-machine",
      },
    ],
    onMachineSelect,
  };
};

export const createLabelingIdentificationCategory = (
  t: { (key: string): string; raw: (key: string) => unknown },
  onMachineSelect: (machine: string) => void
): Category => {
  // ✅ Aseguramos que siempre sean arrays
  const vialLabelingFeatures = Array.isArray(
    t.raw("categorySection.labeling-identification.machines.automatic-vial-labeling-machine.features")
  )
    ? (t.raw("categorySection.labeling-identification.machines.automatic-vial-labeling-machine.features") as string[])
    : [];

  return {
    categoryName: t("categorySection.labeling-identification.categoryName"),
    categoryDescription: t("categorySection.labeling-identification.categoryDescription"),
    machines: [
      {
        id: "automatic-vial-labeling-machine",
        name: t("categorySection.labeling-identification.machines.automatic-vial-labeling-machine.name"),
        description: t("categorySection.labeling-identification.machines.automatic-vial-labeling-machine.description"),
        features: vialLabelingFeatures,
        image: "/automatic_vial_labeling_machine.png",
        link: "/machines/labeling-identification/automatic-vial-labeling-machine",
      },
    ],
    onMachineSelect,
  };
};
