'use client';
import { usePatientsStore } from '@/hooks';
import Link from 'next/link';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';

export const Patients = () => {
  const { patients, loading, startLoadingPatients } = usePatientsStore();

  useEffect(() => {
    startLoadingPatients();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}

      <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-4">
        {patients.map((patient) => (
          <Link
            key={patient.dniNumber}
            href={`/dashboard/patient/${patient.dniNumber}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://source.boringavatars.com/beam/120/${patient.email}?colors=0A0310,49007E`}
                  alt={patient.name}
                />
                <AvatarFallback>
                  {patient.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold">{patient.name}</h3>
                <p className="text-sm text-gray-500">{patient.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
