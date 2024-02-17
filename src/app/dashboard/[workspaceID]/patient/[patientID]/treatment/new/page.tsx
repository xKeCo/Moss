'use client';
import { Odontogram, TreatmentForm } from '@/components';
import { Button } from '@/components/ui';
import type { IToothState } from '@/interfaces';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
      <div className="flex items-center justify-start gap-4 mb-3">
        <Button size="icon" asChild>
          <Link href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
        </Button>

        <h1 className="text-2xl xl:text-3xl font-semibold">Odontogram</h1>
      </div>

      <div className="h-[2px] bg-secondary"></div>
      <Odontogram odontogramState={initialOdontogram} />

      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">Treatment Information</h1>
      <div className="h-[2px] bg-secondary"></div>

      <TreatmentForm
        odontogramState={initialOdontogram}
        patientID={params.patientID}
        workspaceID={params.workspaceID}
      />
    </>
  );
}
