'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTreatmentsStore } from '@/hooks';
import { Odontogram } from '@/components';

export default function TreatmentInformation() {
  const { activeTreatment, setTreatmentByTreatmentId } = useTreatmentsStore();
  const { id: patientId, treatmentID } = useParams() as {
    id: string;
    treatmentID: string;
  };

  useEffect(() => {
    if (!activeTreatment) {
      setTreatmentByTreatmentId(patientId, treatmentID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, treatmentID]);

  return (
    <div>
      <h1>Treatment Information {treatmentID}</h1>

      <h1>{activeTreatment?.diagnosis}</h1>
      {activeTreatment?.initialOdontogram && (
        <Odontogram odontogramState={activeTreatment?.initialOdontogram!} readOnly />
      )}
    </div>
  );
}
