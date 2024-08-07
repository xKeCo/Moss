import { Breadcrumb, NotFound } from '@/components';
import {
  AppointmentInformation,
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
  const { patientInfo, ok, errorMessage } = await getPatientById(
    params.patientID,
    params.workspaceID
  );

  const breadcrumbValues = [
    { name: 'Pacientes', href: '/dashboard' },
    { name: patientInfo?.name ?? 'Loading..' },
  ];

  if (!ok) {
    return <NotFound errorMessage={errorMessage} />;
  }

  return (
    <div className="pt-5 pb-12 px-4 sm:px-8 flex flex-col gap-4">
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

        <AppointmentInformation appointments={patientInfo?.Appointments!} />

        <FilesInformation files={patientInfo?.Files!} />
      </div>
    </div>
  );
}
