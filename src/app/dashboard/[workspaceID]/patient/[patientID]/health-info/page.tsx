import { HealthForm } from '@/components';
import { Button } from '@/components/ui';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
        <div className="flex items-center justify-start gap-4 mb-3">
          <Button size="icon" asChild>
            <Link href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </Button>

          <h1 className="text-2xl xl:text-3xl font-semibold">
            Información de la salud del paciente
          </h1>
        </div>

        <div className="h-[2px] bg-secondary"></div>

        <HealthForm
          cancelUrl={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
          patientID={params.patientID}
        />
      </div>
    </div>
  );
}
