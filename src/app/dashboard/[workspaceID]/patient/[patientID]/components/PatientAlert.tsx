import { Alert, AlertDescription, AlertTitle, Skeleton } from '@/components/ui';
import { IPersonalBackground } from '@/interfaces';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface IPatientAlertProps {
  personalBackground: IPersonalBackground;
  extraInformation: boolean;
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export const PatientAlert = ({
  personalBackground,
  extraInformation,
  params,
}: IPatientAlertProps) => {
  const diseases = [
    {
      name: 'Diabetes',
      value: personalBackground?.diabetes,
    },
    {
      name: 'Cáncer',
      value: personalBackground?.cancer,
    },
    {
      name: 'Leucemia',
      value: personalBackground?.leukemia,
    },
    {
      name: 'Enfermedad cardíaca',
      value: personalBackground?.heartDisease,
    },
    {
      name: 'Enfermedad(es) hospitalaria(s)',
      value: personalBackground?.hospitalization,
    },
    {
      name: 'Enfermedad(es) psicológica(s)',
      value: personalBackground?.psychological,
    },
    {
      name: 'Hipertensión',
      value: personalBackground?.hypertension,
    },
    // {
    //   name: `Cirugía(s) previa(s): ${personalBackground?.surgeriesDescription}`,
    //   value: personalBackground?.surgeries,
    // },
    // {
    //   name: `Otras enfermedades: ${personalBackground?.othersDescription}`,
    //   value: personalBackground?.others,
    // },
  ];

  const hasDisease = diseases.some((disease) => disease.value);
  const hasAllergies = personalBackground?.allergies.length > 0;
  const alertTitle = extraInformation && (hasDisease || hasAllergies) ? 'Alerta!' : 'Información';

  const getAlertVariant = () => {
    if (extraInformation && (hasDisease || hasAllergies)) {
      return 'warning_filled';
    }
    if (extraInformation && !(hasDisease || hasAllergies)) {
      return 'success_filled';
    }
    return 'default_filled';
  };

  return (
    <Alert variant={getAlertVariant()}>
      <InfoCircledIcon className="h-5 w-5" />
      <AlertTitle className="text-sm font-bold dark:font-medium">{alertTitle}</AlertTitle>
      <AlertDescription className="text-sm font-medium dark:font-normal">
        {extraInformation && hasDisease && (
          <p>
            Compromisos sistémicos:{' '}
            <span className="text-primary font-bold capitalize">
              {diseases
                .filter((disease) => disease.value)
                .map((disease) => disease.name.toLowerCase())
                .join(', ')}
            </span>
            {''}.
          </p>
        )}

        {extraInformation && hasAllergies && (
          <p>
            Alergias:{' '}
            {personalBackground?.allergies.map((allergy, index) => (
              <span key={allergy.toString()} className="text-primary font-bold capitalize">
                {allergy}
                {index !== personalBackground?.allergies.length - 1 ? ', ' : ''}
              </span>
            ))}
            .
          </p>
        )}

        {extraInformation && !(hasDisease || hasAllergies) && (
          <>El paciente no tiene ninguna restricción.</>
        )}

        {!extraInformation && (
          <>
            Este paciente no tiene información adicional.{' '}
            <Link
              href={`/dashboard/${params.workspaceID}/patient/${params.patientID}/health-info`}
              className="font-bold hover:text-primary/80"
            >
              Agregar información adicional aquí.
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

PatientAlert.Skeleton = function PatientAlertSkeleton() {
  return <Skeleton className="h-[70px]" />;
};
