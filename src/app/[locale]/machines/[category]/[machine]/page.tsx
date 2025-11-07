'use client';

import { useParams } from 'next/navigation';
import { IndividualMachinePage } from '@/app/[locale]/components/IndividualMachinePage';
import { machinesData } from '@/data/individualMachines';
export default function MachinePage() {
  const params = useParams();
  const machine = params?.machine as string;
  const machineData = machinesData[machine];

  if (!machineData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Machine not found</div>
      </div>
    );
  }

  return <IndividualMachinePage {...machineData} />;
}


