'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IndividualMachinePage } from '@/app/[locale]/components/IndividualMachinePage';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { machinesData } from '@/data/individualMachines';

export default function MachinePage() {
  const params = useParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const machine = params?.machine as string;

  const t = useTranslations();
  const machineData = machinesData[machine];

  if (!machineData) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] text-[#0F141E] flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="text-3xl font-black text-[#0F141E]">
            {isEs ? 'Equipo no encontrado' : 'Machine not found'}
          </h1>
          <p className="mt-3 max-w-md text-sm text-[#475569]">
            {isEs
              ? 'El equipo solicitado no está disponible en esta ruta. Explore nuestro catálogo o consúltenos directamente.'
              : 'The requested equipment is not available at this link. Browse our catalog or contact our team.'}
          </p>
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

  const translation = t.raw(machine);

  const translatedData = {
    machineName: translation.machineName,
    machineImage: machineData.machineImage,
    description: translation.description,
    primaryUse: translation.primaryUse,
    idealFor: translation.idealFor,
    commonApplications: translation.commonApplications,
    installationVideos: machineData.installationVideos.map((video, index) => ({
      ...video,
      title: translation.installationVideos[index]?.title || video.title,
      application:
        translation.installationVideos[index]?.application || video.application,
    })),
  };

  return <IndividualMachinePage {...translatedData} />;
}
