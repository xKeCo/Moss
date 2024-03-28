import { ScrollArea, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentCreateModal } from './AppointmentCreateModal';
import type { IAppointment } from '@/interfaces';

interface IAppointmentInformationProps {
  appointments: IAppointment[];
}

export const AppointmentInformation = ({ appointments }: IAppointmentInformationProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[382px] overflow-hidden dark:bg-zinc-900',
        appointments?.length > 2 && 'pr-2'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full mb-2',
          appointments?.length > 2 && 'pr-4'
        )}
      >
        <h1 className="text-xl font-semibold">Citas médicas</h1>
        <AppointmentCreateModal />
      </div>

      {appointments?.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-lg text-center text-balance">
            Aún no hay citas médicas programadas.
          </h1>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div
            className={cn(
              'flex flex-col justify-start items-start gap-3 w-full max-h-[276px]',
              appointments?.length > 2 && 'pr-4'
            )}
          >
            {appointments?.map((appointment) => (
              <AppointmentCard appointment={appointment} key={appointment.id} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

AppointmentInformation.Skeleton = function AppointmentInformationSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[306px] overflow-hidden dark:bg-zinc-900 pr-2">
      <div className="flex items-center justify-between w-full mb-2 pr-4 gap-2">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-9 w-9" />
      </div>

      <ScrollArea className="w-full">
        <div className="flex flex-col justify-start items-start gap-3 w-full max-h-[276px] pr-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <AppointmentCard.Skeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
