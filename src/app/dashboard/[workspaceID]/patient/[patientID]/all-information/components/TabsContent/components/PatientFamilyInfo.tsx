import { Fragment } from 'react';
import type { IFamilyBackground } from '@/interfaces';

interface IPatientFamilyInfoProps {
  patientFamilyInfo: IFamilyBackground;
}

export const PatientFamilyInfo = ({ patientFamilyInfo }: IPatientFamilyInfoProps) => {
  const patientFamilyBackgroundValues = [
    {
      label: 'Diabetes',
      value: patientFamilyInfo?.diabetes ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con diabetes',
      value: patientFamilyInfo?.familyDiabetes,
      hide: !patientFamilyInfo?.diabetes,
      valueClass: 'capitalize',
    },
    {
      label: 'Cáncer',
      value: patientFamilyInfo?.cancer ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con cáncer',
      value: patientFamilyInfo?.familyCancer,
      hide: !patientFamilyInfo?.cancer,
      valueClass: 'capitalize',
    },
    {
      label: 'Leucemia',
      value: patientFamilyInfo?.leukemia ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con leucemia',
      value: patientFamilyInfo?.familyLeukemia,
      hide: !patientFamilyInfo?.leukemia,
      valueClass: 'capitalize',
    },
    {
      label: 'Enfermedad cardíaca',
      value: patientFamilyInfo?.heartDisease ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con enfermedad cardíaca',
      value: patientFamilyInfo?.familyHeartDisease,
      hide: !patientFamilyInfo?.heartDisease,
      valueClass: 'capitalize',
    },
    {
      label: 'Hipertensión',
      value: patientFamilyInfo?.hypertension ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con hipertensión',
      value: patientFamilyInfo?.familyHypertension,
      hide: !patientFamilyInfo?.hypertension,
      valueClass: 'capitalize',
    },
    {
      label: 'Otros',
      value: patientFamilyInfo?.others ? 'Si' : 'No',
    },
    {
      label: 'Familiar(es) con otros',
      value: patientFamilyInfo?.familyOthers,
      hide: !patientFamilyInfo?.others,
      valueClass: 'capitalize',
    },
  ];

  return (
    <>
      <div className="my-6">
        <h1 className="font-semibold">Antecedentes médicos familiares</h1>
        <div className="h-[2px] bg-secondary mt-2"></div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {patientFamilyBackgroundValues.map((patient) => (
          <Fragment key={patient.label}>
            {patient.hide ? null : (
              <div className="flex flex-col gap-1 items-start justify-start p-3 rounded-2xl bg-accent1 dark:border-[#29292f] dark:bg-zinc-900">
                <h1 className="text-sm font-medium text-muted-foreground">{patient.label}</h1>
                <p className={patient.valueClass}>{patient.value}</p>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};
