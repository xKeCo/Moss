import { Badge, Skeleton } from '@/components/ui';
import { AppointmentOptions } from './AppointmentOptions';
import { formatDate } from '@/helpers';

interface IAppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    treatment: string;
    doctor: string;
    office: string;
    status:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'outline'
      | 'pendiente'
      | 'nueva'
      | 'confirmada'
      | null
      | undefined;
    emailSent: boolean;
    SMSsent: boolean;
    WhatsAppSent: boolean;
  };
}

export const AppointmentCard = ({ appointment }: IAppointmentCardProps) => {
  return (
    <div className="flex items-center border p-4 rounded-lg w-full gap-2 dark:bg-[#0e0e0f]">
      <div className="flex md:hidden lg:flex flex-col items-start justify-between gap-4 w-[92px]">
        <h1 className="text-base font-bold capitalize">{formatDate(appointment.date, true)}</h1>
        <p className="text-xs text-muted-foreground font-medium">
          {appointment.startTime} - {appointment.endTime}
        </p>
      </div>

      <div className="block md:hidden lg:block h-[96px] bg-zinc-200 w-px mx-2"></div>

      <div className="flex flex-col justify-center w-full">
        <div className="flex items-start justify-between mb-1">
          <p className="text-sm text-muted-foreground">Tratamiento</p>

          <div className="flex items-center gap-2">
            <Badge
              className="md:hidden lg:inline-flex text-xs capitalize"
              variant={appointment.status}
            >
              {appointment.status}
            </Badge>

            <AppointmentOptions {...appointment} />
          </div>
        </div>

        <h1 className="text-base font-semibold mb-2 capitalize">{appointment.treatment}</h1>

        <div className="hidden md:flex lg:hidden items-center justify-between gap-4 w-full">
          <h1 className="text-base font-bold capitalize">{formatDate(appointment.date, true)}</h1>
          <p className="text-xs text-muted-foreground font-medium">
            {appointment.startTime} - {appointment.endTime}
          </p>
        </div>

        <div className="flex md:hidden lg:flex items-center justify-start gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground font-medium">Doctor</p>
            <h1 className="text-sm font-medium capitalize">{appointment.doctor}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground font-medium">Consultorio</p>
            <h1 className="text-sm font-medium capitalize">{appointment.office}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

AppointmentCard.Skeleton = function AppointmentCardSkeleton() {
  return (
    <div className="flex items-center border p-4 rounded-lg w-full gap-2 dark:bg-[#0e0e0f]">
      <div className="flex md:hidden lg:flex flex-col items-start justify-between gap-3 w-[92px]">
        <Skeleton className="h-12 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>

      <div className="block md:hidden lg:block h-[96px] bg-zinc-200 w-px mx-2"></div>

      <div className="flex flex-col justify-center w-full">
        <div className="flex items-start justify-between mb-1">
          <Skeleton className="h-6 w-24" />

          <div className="flex items-center gap-2">
            <Skeleton className="md:hidden lg:inline-flex h-6 w-20" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>

        <Skeleton className="h-5 w-full mb-2" />

        <div className="hidden md:flex lg:hidden items-center justify-between gap-4 w-full">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex md:hidden lg:flex items-center justify-start gap-4">
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
