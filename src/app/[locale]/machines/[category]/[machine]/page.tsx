'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IndividualMachinePage } from '@/app/[locale]/components/IndividualMachinePage';
import { machinesData } from '@/data/individualMachines';

export default function MachinePage() {
  const params = useParams();
  const machine = params?.machine as string;

  // 🗣️ Hook para cargar traducciones según el idioma actual
  const t = useTranslations();

  // Datos base de la máquina (imágenes, URLs, etc.)
  const machineData = machinesData[machine];

  if (!machineData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Machine not found</div>
      </div>
    );
  }

  // 🧩 Cargamos traducciones desde el JSON (usando el namespace root)
  const translation = t.raw(machine);

  // 🔗 Fusionamos los datos traducidos con los datos base
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
        translation.installationVideos[index]?.application ||
        video.application,
    })),
  };

  return <IndividualMachinePage {...translatedData} />;
}
