"use client";

import { useParams } from "next/navigation";
import { CategoryPage } from "../../components/CategoryPage";
import {
  createFillingDosingCategory,
  createSealingPackagingCategory,
  createLabelingIdentificationCategory,
  createConveyorHandlingCategory,
  createQualityInspectionCategory,
  // palletizingCategory,
  // codingMarkingCategory,
  // cleaningSanitationCategory,
} from "@/data/categories";
// No-op function for categories (navigation handled by Link)
const noOp = () => {};

export default function MachineCategoryPage() {
  const params = useParams();
  const category = params?.category as string;

  // Map category slug to category data
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Category not found</div>
      </div>
    );
  }

  return <CategoryPage {...categoryData} />;
}

function getCategoryData(category: string) {
  switch (category) {
    case "filling-dosing":
      return createFillingDosingCategory(noOp);
    case "sealing-packaging":
      return createSealingPackagingCategory(noOp);
    case "labeling-identification":
      return createLabelingIdentificationCategory(noOp);
    case "conveyor-handling":
      return createConveyorHandlingCategory(noOp);
    case "quality-inspection":
      return createQualityInspectionCategory(noOp);
    // case "palletizing":
    //   return palletizingCategory;
    // case "coding-marking":
    //   return codingMarkingCategory;
    // case "cleaning-sanitation":
    //   return cleaningSanitationCategory;
    // case "robotics-automation":
    //   return roboticsAutomationCategory;
    default:
      return null;
  }
}
