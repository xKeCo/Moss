import Link from 'next/link';
import { ArrowBottomRightIcon, ArrowRightIcon, FilePlusIcon } from '@radix-ui/react-icons';
import { Button, Skeleton } from '@/components/ui';
import { formatCurrency, formatDate } from '@/helpers';
import { cn } from '@/lib/utils';
import type { ITreatment } from '@/interfaces';

interface ITreatmentInfo {
  label: string;
  value: string | number;
  colSpan?: number;
}

interface IPatientTreatmentProps {
  treatmentInfo: ITreatment;
  patientName: string;
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export const PatientTreatment = ({
  treatmentInfo,
  params,
  patientName,
}: IPatientTreatmentProps) => {
  const treatmentInformation: ITreatmentInfo[] = [
    {
      label: 'Diagnóstico',
      value: treatmentInfo?.diagnosis,
      colSpan: 2,
    },
    {
      label: 'F. de creación',
      value: formatDate(treatmentInfo?.createdAt as string),
    },
    {
      label: 'Últimos cambios',
      value: formatDate(treatmentInfo?.updatedAt as string),
    },
    {
      label: 'Precio total',
      value: formatCurrency(treatmentInfo?.totalPrice),
    },
    {
      label: 'Saldo actual',
      value: formatCurrency(treatmentInfo?.totalPending),
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-3 w-full p-6 min-h-[274px]">
      {!treatmentInfo ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl text-center text-balance">
            <span className="font-semibold">{patientName}</span> no tiene un tratamiento, empieza
            uno nuevo!
            <ArrowBottomRightIcon className="h-5 w-5" />
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
              !treatmentInfo
                ? `/dashboard/${params?.workspaceID}/patient/${params.patientID}/treatment/new`
                : `/dashboard/${params?.workspaceID}/patient/${params.patientID}/treatment/${treatmentInfo?.id}`
            }
          >
            {!treatmentInfo ? (
              <>
                Empezar tratamiento
                <FilePlusIcon className="h-5 w-5 stroke-2" />
              </>
            ) : (
              <>
                Ver tratamiento
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
      label: 'Diagnóstico',
      colSpan: 2,
    },
    {
      label: 'Fecha de creación',
    },
    {
      label: 'Última actualización',
    },
    {
      label: 'Precio total',
    },
    {
      label: 'Saldo actual',
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
