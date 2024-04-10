'use client';
import { HeaderSectionTitle, Odontogram, TreatmentForm } from '@/components';
import type { IToothState } from '@/interfaces';

interface INewTreatmentPageProps {
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export default function NewTreatmentPage({ params }: Readonly<INewTreatmentPageProps>) {
  let initialOdontogram: IToothState[] = [];

  return (
    <>
      <HeaderSectionTitle
        href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
        title="Odontograma"
      />

      <Odontogram odontogramState={initialOdontogram} />

      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Información del tratamiento</h1>
      <div className="h-[2px] bg-secondary"></div>

      <TreatmentForm odontogramState={initialOdontogram} />
    </>
  );
}
