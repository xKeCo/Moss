import Link from 'next/link';
import {
  ArrowBottomRightIcon,
  ArrowRightIcon,
  FilePlusIcon,
} from '@radix-ui/react-icons';
import { usePatientsStore, useTreatmentsStore } from '@/hooks';
import { Button, Skeleton } from '@/components/ui';
import { formatCurrency, formatDate } from '@/helpers';
import { cn } from '@/lib/utils';

interface ITreatmentInfo {
  label: string;
  value: string | number;
  colSpan?: number;
}

export const PatientTreatment = () => {
  const { activePatient } = usePatientsStore();
  const { activeTreatment, loading } = useTreatmentsStore();

  const treatmentInformation: ITreatmentInfo[] = [
    {
      label: 'Diagnostic',
      value: activeTreatment?.diagnosis!,
      colSpan: 2,
    },
    {
      label: 'Created date',
      value: formatDate(activeTreatment?.createdAt!, true),
    },
    {
      label: 'Last update',
      value: formatDate(activeTreatment?.updatedAt!, true),
    },
    {
      label: 'Total price',
      value: formatCurrency(activeTreatment?.totalPrice!),
    },
    {
      label: 'Current balance',
      value: formatCurrency(activeTreatment?.balance!),
    },
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-3 w-full p-6">
        {!activeTreatment ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl text-center">
              <span className="font-semibold">{activePatient?.name}</span> has no active
              treatment, start a new one! <ArrowBottomRightIcon className="h-5 w-5" />
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
                    {loading ? (
                      <>
                        <Skeleton className="h-5 w-[100px]" />
                        <Skeleton className="h-6 w-full" />
                      </>
                    ) : (
                      <>
                        <h2 className="text-sm font-semibold">{label}</h2>
                        <p className="text-base text-muted-foreground">{value}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-end w-full">
          {loading ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Button className="gap-2 w-full" asChild>
              <Link
                href={
                  !activeTreatment
                    ? `/dashboard/patient/${activePatient?.dniNumber}/treatment/new`
                    : `/dashboard/patient/${activeTreatment?.patientId}/treatment/${activeTreatment?._id}`
                }
              >
                {!activeTreatment ? (
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
          )}
        </div>
      </div>
    </>
  );
};
