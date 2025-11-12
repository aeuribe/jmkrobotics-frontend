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
  const autoWeightFillerFeatures = t.raw(
    "categorySection.filling-dosing.machines.automatic-weight-filler.features"
  ) as string[];

  const liquidFillingMachineFeatures = t.raw(
    "categorySection.filling-dosing.machines.liquid-filling-machine.features"
  ) as string[];

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
