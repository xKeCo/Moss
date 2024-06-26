'use client';
import { useOptimistic, useState } from 'react';
import { ScrollArea, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AppointmentCard, AppointmentCreateModal } from '@/components';
import type { IAppointment } from '@/interfaces';

interface IAppointmentInformationProps {
  appointments: IAppointment[];
}

export const AppointmentInformation = ({ appointments }: IAppointmentInformationProps) => {
  const [optimisticCreatedAppointments, addOptimisticAppointments] = useOptimistic<
    IAppointment[],
    IAppointment
  >(appointments, (state, appointment) => {
    const filteredAppointments = state.filter(
      (stateAppointment) => stateAppointment.id !== appointment.id
    );

    const newAppointments = [...filteredAppointments, appointment].sort((a, b) => {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison !== 0) return dateComparison;

      const amPmComparison = a.startTimeAMPM.localeCompare(b.startTimeAMPM);
      if (amPmComparison !== 0) return amPmComparison;

      const startTimeComparison = a.startTime.localeCompare(b.startTime);
      return startTimeComparison;
    });

    return newAppointments;
  });

  const [optimisticAppointments, deleteOptimisticAppointment] = useOptimistic(
    optimisticCreatedAppointments,
    (state, appointmentID) => state.filter((appointment) => appointment.id !== appointmentID)
  );

  const [activeAppointment, setActiveAppointment] = useState<IAppointment | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[382px] overflow-hidden dark:bg-zinc-900',
        optimisticAppointments?.length > 2 && 'pr-2'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full mb-2',
          optimisticAppointments?.length > 2 && 'pr-4'
        )}
      >
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="text-xl font-semibold">Citas médicas</h1>
          <p className="text-muted-foreground text-xs font-medium">
            Las notificaciones se activan 48 horas antes de la cita.
          </p>
        </div>
        <AppointmentCreateModal
          open={open}
          setOpen={setOpen}
          activeAppointment={activeAppointment}
          setActiveAppointment={setActiveAppointment}
          addOptimisticAppointments={addOptimisticAppointments}
        />
      </div>

      {optimisticAppointments?.length === 0 ? (
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
              optimisticAppointments?.length > 2 && 'pr-4'
            )}
          >
            {optimisticAppointments?.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                deleteOptimisticAppointment={deleteOptimisticAppointment}
                setActiveAppointment={setActiveAppointment}
                setOpen={setOpen}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export function AppointmentInformationSkeleton() {
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
}
