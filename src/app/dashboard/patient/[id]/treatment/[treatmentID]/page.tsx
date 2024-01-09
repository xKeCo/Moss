'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTreatmentsStore } from '@/hooks';
import { Odontogram } from '@/components';
import { Button, Skeleton } from '@/components/ui';
import { TreatmentBasicInfo } from './components/TreatmentBasicInfo';
import { ArrowLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function TreatmentInformation() {
  const { errorMsg, loading, activeTreatment, setTreatmentByTreatmentId } =
    useTreatmentsStore();
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
      {errorMsg ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <CrossCircledIcon className="w-24 h-24 text-red-500" />
          <h1 className="text-2xl text-center w-2/5">{errorMsg}</h1>
          <Button asChild>
            <Link href={`/dashboard/patient/${patientId}`}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go back to patient page
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl xl:text-3xl font-semibold mb-3 flex items-center">
            {loading ? (
              <Skeleton className="w-48 h-8 mr-2" />
            ) : (
              activeTreatment?.patientName
            )}{' '}
            - Treatment Information
          </h1>
          <div className="h-[2px] bg-secondary"></div>

          <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontogram</h1>

          <Odontogram
            odontogramState={activeTreatment?.initialOdontogram!}
            loading={loading}
            readOnly
          />

          <TreatmentBasicInfo />
        </>
      )}
    </>
  );
}
