'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePatientsStore } from '@/hooks';
import { Breadcrumb } from '@/components';
import { PatientCard, PatientInformation } from './components';
import { Button } from '@/components/ui';
import { ArrowRightIcon, PlusIcon } from '@radix-ui/react-icons';

export default function PatientInfoPage() {
  const { id } = useParams() as { id: string };
  const { activePatient, loading, setPatientByID } = usePatientsStore();

  const breadcrumbValues = [
    { name: 'Patients', href: '/dashboard' },
    { name: activePatient?.name ?? 'Loading...' },
  ];

  const treatmentInformation = [
    {
      label: 'Start date',
      value: '12/12/2023',
    },
    {
      label: 'Start date 1',
      value: '12/12/2023',
    },
    {
      label: 'Start date 2',
      value: '12/12/2023',
    },
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

      <div className="grid md:grid-cols-6 xl:grid-cols-8 gap-4">
        <PatientCard />
        <PatientInformation />

        <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-4 w-full p-6">
          <h1 className="text-2xl font-semibold">Treatment</h1>

          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col gap-4 items-start justify-start">
              {treatmentInformation.map((value) => (
                <div
                  className="flex flex-col gap-1 items-start justify-start"
                  key={value.label}
                >
                  <h2 className="text-sm font-semibold">{value.label}</h2>
                  <p className="text-base text-muted-foreground">{value.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h1>Image</h1>
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            <Button className="gap-2 w-full">
              See treatment history
              <ArrowRightIcon className="h-5 w-5 stroke-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
