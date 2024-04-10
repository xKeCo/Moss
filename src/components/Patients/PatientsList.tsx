import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { PatientCard } from '..';
import { Alert, AlertDescription, AlertTitle } from '../ui';

import { getPatientsByWorkspaceThatNotHaveExtraInfo } from '@/actions';

export const PatientsList = async ({ workspaceID }: { workspaceID: string }) => {
  const { patients } = await getPatientsByWorkspaceThatNotHaveExtraInfo(workspaceID);

  if (!patients || patients.length === 0) {
    return (
      <Alert>
        <InfoCircledIcon className="h-4 w-4" />
        <AlertTitle>Oops!</AlertTitle>
        <AlertDescription>
          Aún no tiene pacientes registrados.{' '}
          <Link
            href={`/dashboard/${workspaceID}/patient/new`}
            className="font-bold hover:text-primary/80"
          >
            Añadir uno!
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-4">
      {patients?.map((patient) => (
        <Link
          key={patient?.id}
          href={`/dashboard/${workspaceID}/patient/${patient?.id}`}
          className="flex items-center justify-between"
        >
          <PatientCard patient={patient} />
        </Link>
      ))}
    </div>
  );
};
