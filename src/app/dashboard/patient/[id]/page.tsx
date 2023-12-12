'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePatientsStore } from '@/hooks';
import { Breadcrumb } from '@/components';
import { PatientCard, PatientInformation } from './components';

export default function PatientInfoPage() {
  const { id } = useParams() as { id: string };
  const { activePatient, loading, setPatientByID } = usePatientsStore();

  const breadcrumbValues = [
    { name: 'Patients', href: '/dashboard' },
    { name: activePatient?.name ?? 'Loading...' },
  ];

  useEffect(() => {
    setPatientByID(id as string);
  }, [id]);

  return (
    <div className="py-5 px-8 flex flex-col gap-4">
      <Breadcrumb values={breadcrumbValues} loading={loading} />

      {/* <Alert className="text-yellow-600 border-yellow-600">
        <InfoCircledIcon className="h-6 w-6" />
        <AlertTitle className="text-base">Alerta!</AlertTitle>
        <AlertDescription className="text-base">Paciente anticuagulado!</AlertDescription>
      </Alert> */}

      <div className="grid grid-cols-8 gap-4">
        <PatientCard />
        <PatientInformation />
      </div>
    </div>
  );
}
