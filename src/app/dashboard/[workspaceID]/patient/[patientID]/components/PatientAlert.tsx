import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface IPatientAlertProps {
  allergies?: Array<{ name: string }>;
  extraInformation: boolean;
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export const PatientAlert = ({ allergies = [], extraInformation, params }: IPatientAlertProps) => {
  const alertTitle = extraInformation && allergies.length > 0 ? 'Alerta!' : 'Información';

  const getAlertVariant = () => {
    if (extraInformation && allergies.length > 0) {
      return 'warning_filled';
    }
    if (extraInformation && allergies.length === 0) {
      return 'success_filled';
    }
    return 'default';
  };

  const renderAlertInformation = () => {
    if (extraInformation && allergies.length > 0) {
      return allergies.map((allergy, index) => (
        <span key={allergy.name}>
          {allergy.name}
          {index !== allergies.length - 1 ? ', ' : ''}
        </span>
      ));
    }

    if (extraInformation && !allergies.length) {
      return 'El paciente no tiene ninguna restricción.';
    }

    if (!extraInformation) {
      return (
        <>
          Este paciente no tiene información adicional.{' '}
          <Link
            href={`/dashboard/${params.workspaceID}/patient/${params.patientID}/health-info`}
            className="font-bold hover:text-primary/80"
          >
            Agregar información adicional aquí.
          </Link>
        </>
      );
    }
  };

  return (
    <Alert variant={getAlertVariant()}>
      <InfoCircledIcon className="h-5 w-5" />
      <AlertTitle className="text-sm font-bold dark:font-medium">{alertTitle}</AlertTitle>
      <AlertDescription className="text-sm font-medium dark:font-normal">
        {renderAlertInformation()}
      </AlertDescription>
    </Alert>
  );
};

PatientAlert.Skeleton = function PatientAlertSkeleton() {
  return <Skeleton className="h-[70px]" />;
};
