'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CategoryPage } from '../../components/CategoryPage';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  createFillingDosingCategory,
  createLabelingIdentificationCategory,
  createSealingPackagingCategory,
} from '@/data/categories';

const noOp = () => {};

export default function MachineCategoryPage() {
  const params = useParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const category = params?.category as string;
  const t = useTranslations();

  const categoryData = getCategoryData(category, t);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="text-3xl font-black text-[#0F141E]">
            {isEs ? 'Categoría no encontrada' : 'Category not found'}
          </h1>
          <Link
            href="/"
            className="mt-6 rounded-full bg-[#0B2D5B] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B81D2B] transition-colors"
          >
            {isEs ? 'Volver al inicio' : 'Back to Home'}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return <CategoryPage {...categoryData} />;
}

function getCategoryData(category: string, t: ReturnType<typeof useTranslations>) {
  switch (category) {
    case 'filling-dosing':
      return createFillingDosingCategory(t, noOp);
    case 'labeling-identification':
      return createLabelingIdentificationCategory(t, noOp);
    case 'sealing-packaging':
      return createSealingPackagingCategory(t, noOp);
    default:
      return null;
  }
}
