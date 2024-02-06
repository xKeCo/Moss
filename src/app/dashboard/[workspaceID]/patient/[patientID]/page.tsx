import { Breadcrumb } from '@/components';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { PatientCard, PatientInformation, PatientTreatment } from './components';
import { getPatientById } from '@/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

interface IPatientInfoPageProps {
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export default async function PatientInfoPage({ params }: Readonly<IPatientInfoPageProps>) {
  const { patientInfo } = await getPatientById(params.patientID);

  const breadcrumbValues = [
    { name: 'Patients', href: '/dashboard' },
    { name: patientInfo?.name ?? 'Loading..' },
  ];

  return (
    <div className="py-5 px-8 flex flex-col gap-4">
      <Breadcrumb values={breadcrumbValues} />

      <Alert variant="warning">
        <InfoCircledIcon className="h-5 w-5" />
        <AlertTitle className="text-base font-semibold">Alerta!</AlertTitle>
        <AlertDescription className="text-base font-medium">
          Paciente anticuagulado!
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-6 xl:grid-cols-8 xl:grid-rows-2 gap-4">
        <PatientCard patientInfo={patientInfo!} />
        <PatientInformation patientInfo={patientInfo!} />
        <PatientTreatment
          treatmentInfo={patientInfo?.Treatment!}
          patientName={patientInfo?.name!}
          params={params}
        />
      </div>
    </div>
  );
}
