import Link from 'next/link';
import { ArrowBottomRightIcon, ArrowRightIcon, FilePlusIcon } from '@radix-ui/react-icons';
import { Button, Skeleton } from '@/components/ui';
import { formatCurrency, formatDate } from '@/helpers';
import { cn } from '@/lib/utils';
import type { IPatient } from '@/interfaces';

interface ITreatmentInfo {
  label: string;
  value: string | number;
  colSpan?: number;
}

interface IPatientTreatmentProps {
  patientInfo: IPatient;
  workspaceID: string;
}

export const PatientTreatment = ({ patientInfo, workspaceID }: IPatientTreatmentProps) => {
  const treatmentInformation: ITreatmentInfo[] = [
    {
      label: 'Diagnosis',
      value: patientInfo?.Treatment?.diagnosis!,
      colSpan: 2,
    },
    {
      label: 'Created date',
      value: formatDate(patientInfo?.Treatment?.createdAt! as string, true),
    },
    {
      label: 'Last update',
      value: formatDate(patientInfo?.Treatment?.updatedAt! as string, true),
    },
    {
      label: 'Total price',
      value: formatCurrency(patientInfo?.Treatment?.totalPrice!),
    },
    {
      label: 'Current balance',
      value: formatCurrency(patientInfo?.Treatment?.totalPending!),
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-3 w-full p-6 min-h-[274px]">
      {!patientInfo?.Treatment ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl text-center">
            <span className="font-semibold">{patientInfo?.name}</span> has no active treatment,
            start a new one! <ArrowBottomRightIcon className="h-5 w-5" />
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Treatment</h1>
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 w-full">
              {treatmentInformation.map(({ label, colSpan, value }) => (
                <div
                  className={cn(
                    'flex flex-col gap-1 items-start justify-start w-full',
                    colSpan && `col-span-${colSpan}`
                  )}
                  key={label}
                >
                  <h2 className="text-sm font-semibold">{label}</h2>
                  <p className="text-base text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-end w-full">
        <Button className="gap-2 w-full" asChild>
          <Link
            href={
              !patientInfo?.Treatment
                ? `/dashboard/${workspaceID}/patient/${patientInfo?.dniNumber}/treatment/new`
                : `/dashboard/${workspaceID}/patient/${patientInfo?.dniNumber}/treatment/${patientInfo?.Treatment?.id}`
            }
          >
            {!patientInfo ? (
              <>
                Start new treatment
                <FilePlusIcon className="h-5 w-5 stroke-2" />
              </>
            ) : (
              <>
                See treatment history
                <ArrowRightIcon className="h-5 w-5 stroke-2" />
              </>
            )}
          </Link>
        </Button>
      </div>
    </div>
  );
};

PatientTreatment.Skeleton = function PatientTreatmentSkeleton() {
  const treatmentInformation = [
    {
      label: 'Diagnosis',
      colSpan: 2,
    },
    {
      label: 'Created date',
    },
    {
      label: 'Last update',
    },
    {
      label: 'Total price',
    },
    {
      label: 'Current balance',
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-3 w-full p-6 min-h-[274px]">
      <Skeleton className="h-8 w-full" />

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-2 gap-y-[18px] gap-x-2 w-full">
          {treatmentInformation.map(({ label, colSpan }) => (
            <div
              className={cn(
                'flex flex-col gap-1 items-start justify-start w-full',
                colSpan && `col-span-${colSpan}`
              )}
              key={label}
            >
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-9 w-full" />
    </div>
  );
};
