import { HeaderSectionTitle, HealthForm } from '@/components';

interface IHealthInfoPageProps {
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export default function HealthInfoPage({ params }: Readonly<IHealthInfoPageProps>) {
  return (
    <div className="dark:bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto py-12 p-6">
        <HeaderSectionTitle
          href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
          title={`Información de la salud del paciente`}
        />

        <HealthForm />
      </div>
    </div>
  );
}
