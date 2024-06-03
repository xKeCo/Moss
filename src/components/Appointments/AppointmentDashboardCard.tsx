import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Badge,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { formatDate } from '@/helpers';
import type { IAppointment } from '@/interfaces';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { AppointmentDashboardOptions } from './AppointmentDashboardOptions';

interface IAppointmentDashboardCardProps {
  appointment: IAppointment;
  deleteOptimisticAppointment: (appointmentID: string) => void;
  setActiveAppointment: (appointment: IAppointment) => void;
  setOpen: (open: boolean) => void;
}

export const AppointmentDashboardCard = ({
  appointment,
  deleteOptimisticAppointment,
  setActiveAppointment,
  setOpen,
}: IAppointmentDashboardCardProps) => {
  return (
    <div className="flex items-center border p-4 rounded-lg w-full gap-2 dark:bg-[#0e0e0f]">
      <div className="hidden lg:flex flex-col items-start justify-between gap-4 w-[92px]">
        <h1 className="text-base font-bold capitalize">{formatDate(appointment.date, true)}</h1>
        <p className="text-xs text-muted-foreground font-medium">
          {appointment.startTime}
          {appointment.startTimeAMPM} - {appointment.endTime}
          {appointment.endTimeAMPM}
        </p>
      </div>

      <div className="hidden lg:block h-[96px] bg-zinc-200 w-px mx-2"></div>

      <div className="flex flex-col justify-center w-full">
        <div className="flex items-start justify-between">
          <p className="text-sm text-muted-foreground">Paciente</p>

          <div className="flex items-center gap-2">
            <Badge
              className="hidden lg:inline-flex text-xs capitalize"
              variant={appointment.status}
            >
              {appointment.status}
            </Badge>

            {/* TODO */}
            {/* <AppointmentDashboardOptions
              appointment={appointment}
              deleteOptimisticAppointment={deleteOptimisticAppointment}
              setActiveAppointment={setActiveAppointment}
              setOpen={setOpen}
            /> */}
          </div>
        </div>

        <Link
          href={`/dashboard/${appointment.workspaceId}/patient/${appointment?.Patient?.id}`}
          className="flex items-center justify-start gap-1 mb-2"
        >
          <h1 className="text-base font-semibold capitalize">{appointment?.Patient?.name}</h1>

          <ExternalLink className="w-4 h-4" />
        </Link>

        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground font-medium">Tratamiento</p>
          <div className="flex items-center justify-start gap-1">
            <p className="text-sm font-medium capitalize">{appointment.treatment}</p>
            {appointment.description && (
              <TreatmentDescription description={appointment.description} />
            )}
          </div>
        </div>

        <div className="flex mt-2 lg:hidden items-center justify-between gap-4 w-full">
          <h1 className="text-base font-bold capitalize">{formatDate(appointment.date, true)}</h1>
          <p className="text-xs text-muted-foreground font-medium">
            {appointment.startTime}
            {appointment.startTimeAMPM}- {appointment.endTime}
            {appointment.endTimeAMPM}
          </p>
        </div>
      </div>
    </div>
  );
};

const TreatmentDescription = ({ description }: { description: string }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={350}>
        <TooltipTrigger asChild>
          <InfoCircledIcon className="w-4 h-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

AppointmentDashboardCard.Skeleton = function AppointmentDashboardCardSkeleton() {
  return (
    <div className="flex items-center border p-4 rounded-lg w-full gap-2 dark:bg-[#0e0e0f]">
      <div className="hidden lg:flex flex-col items-start justify-between gap-3 w-[92px]">
        <Skeleton className="h-12 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>

      <div className="hidden lg:block h-[96px] bg-zinc-200 w-px mx-2"></div>

      <div className="flex flex-col justify-center w-full">
        <div className="flex items-start justify-between mb-1">
          <Skeleton className="h-6 w-24" />

          <div className="flex items-center gap-2">
            <Skeleton className="hidden lg:inline-flex h-6 w-20" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>

        <Skeleton className="h-5 w-full mb-2" />

        <div className="flex mb-2 lg:hidden items-center justify-between gap-4 w-full">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="hidden lg:flex items-center justify-start gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
