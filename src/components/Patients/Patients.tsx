'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePatientsStore } from '@/hooks';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export const Patients = () => {
  const { patients, loading, startLoadingPatients } = usePatientsStore();

  useEffect(() => {
    startLoadingPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {patients.length === 0 ? (
            <Alert>
              <InfoCircledIcon className="h-4 w-4" />
              <AlertTitle>Oops!</AlertTitle>
              <AlertDescription>
                You don&apos;t have any patients yet.{' '}
                <Link
                  href="/dashboard/patient/new"
                  className="font-bold hover:text-primary/80"
                >
                  Add one!
                </Link>
              </AlertDescription>
            </Alert>
          ) : (
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
      )}
    </>
  );
};
