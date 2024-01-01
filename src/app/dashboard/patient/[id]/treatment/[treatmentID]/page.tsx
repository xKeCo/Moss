'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useTreatmentsStore } from '@/hooks';
import { AddTreatmentPlan, Odontogram, TreatmentItem } from '@/components';
import { Label } from '@/components/ui';
import { IRealTxPlan, ITxEvolution } from '@/interfaces';
import TreatmentBasicInfo from './components/TreatmentBasicInfo';

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
    <>
      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">
        {activeTreatment?.patientName} - Treatment Information
      </h1>
      <div className="h-[2px] bg-secondary"></div>

      <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontogram</h1>

      {activeTreatment?.initialOdontogram && (
        <Odontogram odontogramState={activeTreatment?.initialOdontogram!} readOnly />
      )}

      <TreatmentBasicInfo />
    </>
  );
}
