import { Breadcrumb } from '@/components';
import { PatientCard, PatientInformation, PatientTreatment } from './components';
import { getPatientById } from '@/actions';

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

      {/* <Alert className="text-yellow-600 border-yellow-600">
        <InfoCircledIcon className="h-6 w-6" />
        <AlertTitle className="text-base">Alerta!</AlertTitle>
        <AlertDescription className="text-base">Paciente anticuagulado!</AlertDescription>
      </Alert> */}

      <div className="grid md:grid-cols-6 xl:grid-cols-8 xl:grid-rows-2 gap-4">
        <PatientCard patientInfo={patientInfo!} />
        <PatientInformation patientInfo={patientInfo!} />
        <PatientTreatment patientInfo={patientInfo!} workspaceID={params.workspaceID} />
      </div>
      {/* <div className="grid md:grid-cols-6 xl:grid-cols-8 gap-4">
          <PatientInformation />
          <PatientTreatment />
          <PatientTreatment />
        </div> */}
    </div>
  );
}
