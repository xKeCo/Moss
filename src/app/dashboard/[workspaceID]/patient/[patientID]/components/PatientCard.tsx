import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { formatPhone } from '@/helpers';
import { IPatient } from '@/interfaces';

interface IPatientCardProps {
  patientInfo: IPatient;
}

export const PatientCard = ({ patientInfo }: IPatientCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-4 md:col-span-2 border rounded-2xl gap-6 w-full p-6">
      {/* {loading ? (
        <Skeleton className="w-28 h-28 rounded-full" />
      ) : ( */}
      <Avatar className="w-28 h-28">
        <AvatarImage src={patientInfo?.photoURL!} alt={patientInfo?.name} />
        <AvatarFallback>
          {patientInfo?.name
            .split(' ')
            .map((name: string) => name[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      {/* )} */}

      <div className="flex flex-col items-center justify-center gap-1 w-full">
        {/* {loading ? (
          <>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : ( */}

        <h1 className="text-2xl font-semibold text-center">{patientInfo?.name}</h1>
        <p className="text-muted-foreground">{patientInfo?.email}</p>
        <p className="text-muted-foreground">
          {formatPhone(patientInfo?.ContactInformation?.phone1!)}
        </p>
        {/* )} */}
      </div>
    </div>
  );
};
