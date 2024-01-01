'use client';
import { Odontogram, TreatmentForm } from '@/components';
import { IToothState } from '@/interfaces';

export default function NewTreatmentPage() {
  let initialOdontogram: IToothState[] = [];

  return (
    <>
      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Odontogram</h1>
      <div className="h-[2px] bg-secondary"></div>
      <Odontogram odontogramState={initialOdontogram} />

      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Treatment Information</h1>
      <div className="h-[2px] bg-secondary"></div>

      <TreatmentForm odontogramState={initialOdontogram} />
    </>
  );
}
