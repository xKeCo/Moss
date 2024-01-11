import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { PatientCard } from '..';
import { Alert, AlertDescription, AlertTitle } from '../ui';

import { getPatientsByWorkspaceThatNotHaveExtraInfo } from '@/actions';

export const PatientsList = async ({ workspaceID }: { workspaceID: string }) => {
  const { patients, errorMessage } = await getPatientsByWorkspaceThatNotHaveExtraInfo(
    workspaceID
  );

  return (
    <>
      {patients?.length === 0 ? (
        <Alert>
          <InfoCircledIcon className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            You don&apos;t have any patients yet.{' '}
            <Link
              href={`/dashboard/${workspaceID}/patient/new`}
              className="font-bold hover:text-primary/80"
            >
              Add one!
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-4">
          {patients?.map((patient) => (
            <Link
              key={patient?.dniNumber}
              href={`/dashboard/${workspaceID}/patient/${patient?.dniNumber}`}
              className="flex items-center justify-between"
            >
              <PatientCard patient={patient} />
            </Link>
          ))}
        </div>
      )}

      {/* ) : (
            <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-4">
              {patients.map((patient) => (
                <Link
                  key={patient?.dniNumber}
                  href={`/dashboard/patient/${patient?.dniNumber}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={patient?.photoURL} alt={patient?.name} />
                      <AvatarFallback>
                        {patient?.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-lg font-semibold">{patient?.name}</h3>
                      <p className="text-sm text-gray-500">{patient?.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )} */}
    </>
  );
};
