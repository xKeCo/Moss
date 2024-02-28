import Link from 'next/link';
import { PatientsList, Icons } from '@/components';
import { Button } from '@/components/ui';

interface IDashboardProps {
  params: {
    workspaceID: string;
  };
}

export default function Dashboard({ params }: Readonly<IDashboardProps>) {
  return (
    <main className="py-5 px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold">Dashboard</h1>

        <Button className="text-sm" asChild>
          <Link href={`/dashboard/${params.workspaceID}/patient/new`}>
            <Icons.Add className="mr-2 h-4 w-4" />
            Añadir paciente
          </Link>
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Patients</h2>

        <PatientsList workspaceID={params.workspaceID} />
      </div>
    </main>
  );
}
