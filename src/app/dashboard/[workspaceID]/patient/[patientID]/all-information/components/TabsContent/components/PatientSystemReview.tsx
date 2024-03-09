import { Fragment } from 'react';
import type { ISystemReview } from '@/interfaces';

interface IPatientSystemReviewProps {
  patientSystemInfo: ISystemReview;
}

export const PatientSystemReview = ({ patientSystemInfo }: IPatientSystemReviewProps) => {
  const patientSystemReviewValues = [
    {
      label: 'Cabeza',
      value: patientSystemInfo?.head,
    },
    {
      label: 'Cuello',
      value: patientSystemInfo?.neck,
    },
    {
      label: 'Genitourinario',
      value: patientSystemInfo?.genitourinary,
    },
    {
      label: 'Ojos',
      value: patientSystemInfo?.eyes,
    },
    {
      label: 'Cardiovascular',
      value: patientSystemInfo?.cardiovascular,
    },
    {
      label: 'Locomotor',
      value: patientSystemInfo?.locomotor,
    },
    {
      label: 'ORL',
      value: patientSystemInfo?.ORL,
    },
    {
      label: 'Respiratorio',
      value: patientSystemInfo?.respiratory,
    },
    {
      label: 'Piel',
      value: patientSystemInfo?.skin,
    },
    {
      label: 'Estomatológico',
      value: patientSystemInfo?.stomological,
    },
    {
      label: 'Gastrointestinal',
      value: patientSystemInfo?.gastrointestinal,
    },
    {
      label: 'Circulatorio',
      value: patientSystemInfo?.circulatory,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold">Revisión por sistema</h1>
        <div className="h-[2px] bg-secondary mt-2"></div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {patientSystemReviewValues.map((patient) => (
          <Fragment key={patient.label}>
            <div className="flex flex-col gap-1 items-start justify-start p-3 rounded-2xl bg-accent1 dark:border-[#29292f] dark:bg-zinc-900">
              <h1 className="text-sm font-medium text-muted-foreground">{patient.label}</h1>
              <p>{patient.value}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
