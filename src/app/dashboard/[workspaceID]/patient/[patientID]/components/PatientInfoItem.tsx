import { Skeleton } from '@/components/ui';

interface PatientInfoItemProps {
  label: string;
  value: string;
  colSpan?: number;
  loading?: boolean;
}

export const PatientInfoItem = ({
  label,
  value,
  colSpan = 1,
  loading,
}: PatientInfoItemProps) => {
  return (
    <div className={`flex flex-col gap-1 items-start justify-start col-span-${colSpan}`}>
      {loading ? (
        <>
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-6 w-full" />
        </>
      ) : (
        <>
          <h1 className="text-sm font-medium text-muted-foreground">{label}</h1>
          <p>{value}</p>
        </>
      )}
    </div>
  );
};
