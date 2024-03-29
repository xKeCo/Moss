import { Breadcrumb } from '@/components';
import {
  FilesInformation,
  PatientAlert,
  PatientCard,
  PatientInformation,
  PatientTreatment,
} from './components';
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
    { name: 'Pacientes', href: '/dashboard' },
    { name: patientInfo?.name ?? 'Loading..' },
  ];

  return (
    <div className="py-5 px-8 flex flex-col gap-4">
      <Breadcrumb values={breadcrumbValues} />

      <PatientAlert
        personalBackground={patientInfo?.HealthInformation?.PersonalBackground!}
        extraInformation={patientInfo?.hasExtraInfo!}
        params={params}
      />

      <div className="grid md:grid-cols-6 xl:grid-cols-8 gap-4">
        <PatientCard patientInfo={patientInfo!} />
        <PatientInformation patientInfo={patientInfo!} />
        <PatientTreatment
          treatmentInfo={patientInfo?.Treatment!}
          patientName={patientInfo?.name!}
          params={params}
        />
        <FilesInformation files={patientInfo?.Files!} params={params} />
      </div>
    </div>
  );
}
