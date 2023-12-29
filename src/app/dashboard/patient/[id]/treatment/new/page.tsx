'use client';
import { Odontogram } from '@/components';
import { IToothState } from '@/interfaces';

export default function NewTreatmentPage() {
  let odontogramState: IToothState[] = [];

  return (
    <div className="flex flex-col items-center justify-start">
      <h1>TreatmentPage</h1>
      <Odontogram odontogramState={odontogramState} />
      <button
        onClick={() => {
          console.log('odontogramState', odontogramState);
        }}
      >
        odontogramState
      </button>
    </div>
  );
}
