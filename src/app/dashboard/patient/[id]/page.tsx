'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePatientsStore, useTreatmentsStore } from '@/hooks';
import { Breadcrumb } from '@/components';
import { PatientCard, PatientInformation, PatientTreatment } from './components';

export default function PatientInfoPage() {
  const { id } = useParams() as { id: string };
  const { activePatient, loading, setPatientByID } = usePatientsStore();
  const { setTreatmentByPatientId } = useTreatmentsStore();

  const breadcrumbValues = [
    { name: 'Patients', href: '/dashboard' },
    { name: activePatient?.name ?? 'Loading...' },
  ];

  useEffect(() => {
    setPatientByID(id);
    setTreatmentByPatientId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="py-5 px-8 flex flex-col gap-4">
      <Breadcrumb values={breadcrumbValues} loading={loading} />

      {/* <Alert className="text-yellow-600 border-yellow-600">
        <InfoCircledIcon className="h-6 w-6" />
        <AlertTitle className="text-base">Alerta!</AlertTitle>
        <AlertDescription className="text-base">Paciente anticuagulado!</AlertDescription>
      </Alert> */}

      <div className="grid md:grid-cols-6 xl:grid-cols-8 xl:grid-rows-2 gap-4">
        <PatientCard />
        <PatientInformation />
        <PatientTreatment />
      </div>
      {/* <div className="grid md:grid-cols-6 xl:grid-cols-8 gap-4">
          <PatientInformation />
          <PatientTreatment />
          <PatientTreatment />
        </div> */}
    </div>
  );
}
