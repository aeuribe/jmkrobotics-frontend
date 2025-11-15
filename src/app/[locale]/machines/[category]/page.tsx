"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CategoryPage } from "../../components/CategoryPage";
import {
  createFillingDosingCategory,
  createLabelingIdentificationCategory,
  createSealingPackagingCategory
  // palletizingCategory,
  // codingMarkingCategory,
  // cleaningSanitationCategory,
} from "@/data/categories";

// No-op function for categories (navigation handled by Link)
const noOp = () => {};

export default function MachineCategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const t = useTranslations(); // 👈 Añadimos traducción

  // Map category slug to category data
  const categoryData = getCategoryData(category, t);

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Category not found</div>
      </div>
    );
  }

  return <CategoryPage {...categoryData} />;
}

// 👇 Pasamos `t` a la función del category
function getCategoryData(category: string, t: ReturnType<typeof useTranslations>) {
  switch (category) {
    case "filling-dosing":
      return createFillingDosingCategory(t, noOp);
    case "labeling-identification":
      return createLabelingIdentificationCategory(t, noOp);
    case "sealing-packaging":
      return createSealingPackagingCategory(t, noOp);
    default:
      return null;
  }
}
