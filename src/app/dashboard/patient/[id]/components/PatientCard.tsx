'use client';
import { usePatientsStore } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui';
import { formatPhone } from '@/helpers';

export const PatientCard = () => {
  const { activePatient, loading } = usePatientsStore();

  return (
    <div className="flex flex-col items-center justify-center col-span-4 md:col-span-2 border rounded-2xl gap-6 w-full p-6">
      {loading ? (
        <Skeleton className="w-28 h-28 rounded-full" />
      ) : (
        <Avatar className="w-28 h-28">
          <AvatarImage src={activePatient?.photoURL} alt={activePatient?.name} />
          <AvatarFallback>
            {activePatient?.name
              .split(' ')
              .map((name) => name[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col items-center justify-center gap-1 w-full">
        {loading ? (
          <>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">{activePatient?.name}</h1>
            <p className="text-muted-foreground">{activePatient?.email}</p>
            <p className="text-muted-foreground">
              {formatPhone(activePatient?.contactInformation?.phone1!)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
