'use client';
import { Odontogram, TreatmentForm } from '@/components';
import { IToothState } from '@/interfaces';

export default function NewTreatmentPage() {
  let initialOdontogram: IToothState[] = [];

  return (
    <div className="max-w-7xl mx-auto my-2 p-6">
      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Odontogram</h1>
      <div className="h-[2px] bg-secondary"></div>
      <Odontogram odontogramState={initialOdontogram} />

      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Treatment Information</h1>
      <div className="h-[2px] bg-secondary"></div>

      <TreatmentForm odontogramState={initialOdontogram} />
    </div>
  );
}
