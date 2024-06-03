'use client';

import { useEffect, useOptimistic, useState } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppointmentCreateModal } from './AppointmentCreateModal';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, ScrollArea } from '../ui';
import { cn } from '@/lib/utils';
import type { IAppointment } from '@/interfaces';
import { getCalendarAppointments } from '@/actions';
import { useParams } from 'next/navigation';
import { formatDate } from '@/helpers';
import { AppointmentDashboardCard } from './AppointmentDashboardCard';

export const AppointmentsHomeList = () =>
  // { appointments }: { appointments: IAppointment[] }
  {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date(new Date().setHours(0, 0, 0, 0))
    );
    const [activeAppointment, setActiveAppointment] = useState<IAppointment | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { workspaceID } = useParams();

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

    const getAppointments = async () => {
      setIsLoading(true);

      try {
        const response = await getCalendarAppointments(
          workspaceID as string,
          selectedDate!.toISOString().split('T')[0]
        );

        setIsLoading(false);

        if (!response.ok) {
          console.log(response.errorMessage);
        }

        setAppointments(response?.appointments!);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const handleNextDay = () => {
      setSelectedDate((prevDate) => {
        const nextDate = new Date(prevDate!);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate;
      });
    };

    const handlePreviousDay = () => {
      setSelectedDate((prevDate) => {
        const previousDate = new Date(prevDate!);
        previousDate.setDate(previousDate.getDate() - 1);
        return previousDate;
      });
    };

    useEffect(() => {
      getAppointments();
    }, [selectedDate]);

    return (
      <div
        className={cn(
          'flex flex-col items-start justify-start col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[540px] h-full overflow-hidden dark:bg-zinc-900',
          optimisticAppointments?.length > 2 && 'pr-2'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between w-full mb-2 max-[488px]:flex-col max-[488px]:gap-2 max-[488px]:items-start',
            optimisticAppointments?.length > 2 && 'pr-4'
          )}
        >
          <h1 className="text-xl font-semibold">Citas programadas</h1>

          <div className="flex items-center justify-end gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'} className="capitalize whitespace-nowrap">
                  {selectedDate ? (
                    formatDate(selectedDate, true)
                  ) : (
                    <span>Seleccione una fecha</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  required
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                  }}
                  initialFocus
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>

            {/* TODO */}
            {/* <AppointmentCreateModal
              open={open}
              setOpen={setOpen}
              activeAppointment={activeAppointment}
              setActiveAppointment={setActiveAppointment}
              addOptimisticAppointments={addOptimisticAppointments}
            /> */}
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-3 h-full w-full">
            <AppointmentDashboardCard.Skeleton />
            <AppointmentDashboardCard.Skeleton />
          </div>
        )}

        {!isLoading && optimisticAppointments?.length === 0 && (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-lg text-center text-balance">No hay citas programadas</h1>
          </div>
        )}

        {!isLoading && optimisticAppointments?.length > 0 && (
          <ScrollArea className="w-full h-full">
            <div
              className={cn(
                'flex flex-col justify-start items-start gap-3 w-full ',
                optimisticAppointments?.length > 2 && 'pr-4'
              )}
            >
              {optimisticAppointments?.map((appointment) => (
                <AppointmentDashboardCard
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

        <div className="flex items-center justify-end w-full mb-2">
          <div className="flex justify-end items-center gap-4">
            <Button size="icon" onClick={handlePreviousDay}>
              <ChevronLeft size={20} />
            </Button>
            <Button size="icon" onClick={handleNextDay}>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  };
