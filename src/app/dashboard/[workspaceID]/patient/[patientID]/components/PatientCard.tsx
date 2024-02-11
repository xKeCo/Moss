import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui';
import type { IPatient } from '@/interfaces';

interface IPatientCardProps {
  patientInfo: IPatient;
}

export const PatientCard = ({ patientInfo }: IPatientCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-4 md:col-span-2 border rounded-2xl gap-6 w-full p-6">
      <Avatar className="w-28 h-28">
        <AvatarImage src={patientInfo?.photoURL!} alt={patientInfo?.name} />
        <AvatarFallback>
          {patientInfo?.name
            .split(' ')
            .map((name: string) => name[0])
            .join('')}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center justify-center gap-1 w-full">
        <h1 className="text-xl font-semibold text-center capitalize">{patientInfo?.name}</h1>
        <p className="text-muted-foreground">{patientInfo?.email}</p>
        <p className="text-muted-foreground">{patientInfo?.reasonForConsultation}</p>
      </div>
    </div>
  );
};

PatientCard.Skeleton = function PatientCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center col-span-4 md:col-span-2 border rounded-2xl gap-6 w-full p-6">
      <Skeleton className="w-28 h-28 rounded-full" />

      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-5 w-full max-w-64" />
        <Skeleton className="h-5 w-full max-w-44" />
      </div>
    </div>
  );
};
