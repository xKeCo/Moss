import { Fragment } from 'react';
import { formatOralHabits } from '@/helpers/healthInformation';
import type { IPersonalBackground } from '@/interfaces';

interface IPatientPersonalBgInfoProps {
  patientPersonalBgInfo: IPersonalBackground;
}

export const PatientPersonalBgInfo = ({ patientPersonalBgInfo }: IPatientPersonalBgInfoProps) => {
  const patientPersonalBackgroundValues = [
    {
      label: 'Alergias',
      value:
        patientPersonalBgInfo?.allergies.length === 0
          ? 'Ninguna'
          : patientPersonalBgInfo?.allergies.join(', '),
      colSpan: patientPersonalBgInfo?.medications.length === 0 ? 1 : 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Medicamentos',
      value:
        patientPersonalBgInfo?.medications.length === 0
          ? 'Ninguno'
          : patientPersonalBgInfo?.medications.join(', '),
      colSpan: patientPersonalBgInfo?.medications.length === 0 ? 1 : 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Diabetes',
      value: patientPersonalBgInfo?.diabetes ? 'Si' : 'No',
    },
    {
      label: 'Cáncer',
      value: patientPersonalBgInfo?.cancer ? 'Si' : 'No',
    },
    {
      label: 'Leucemia',
      value: patientPersonalBgInfo?.leukemia ? 'Si' : 'No',
    },
    {
      label: 'Enfermedad cardíaca',
      value: patientPersonalBgInfo?.heartDisease ? 'Si' : 'No',
    },
    {
      label: 'Hospitalización',
      value: patientPersonalBgInfo?.hospitalization ? 'Si' : 'No',
    },
    {
      label: 'Psicología',
      value: patientPersonalBgInfo?.psychological ? 'Si' : 'No',
    },
    {
      label: 'Hipertensión',
      value: patientPersonalBgInfo?.hypertension ? 'Si' : 'No',
    },
    {
      label: 'Cirugías',
      value: patientPersonalBgInfo?.surgeries ? 'Si' : 'No',
    },
    {
      label: 'Descripción de cirugías',
      value: patientPersonalBgInfo?.surgeriesDescription,
      hide: !patientPersonalBgInfo?.surgeries,
      valueClass: 'capitalize',
    },
    {
      label: 'Otros',
      value: patientPersonalBgInfo?.others ? 'Si' : 'No',
      colSpan: patientPersonalBgInfo?.habits !== 'Otros' ? 1 : 2,
    },
    {
      label: 'Descripción de otros',
      value: patientPersonalBgInfo?.othersDescription,
      hide: !patientPersonalBgInfo?.others,
      valueClass: 'capitalize',
    },
    {
      label: 'Hábitos',
      value: formatOralHabits(patientPersonalBgInfo?.habits),
      valueClass: 'capitalize',
    },
    {
      label: 'Descripción de hábitos',
      value: patientPersonalBgInfo?.habitsDescription,
      hide: patientPersonalBgInfo?.habits !== 'Otros',
      valueClass: 'capitalize',
    },
  ];

  return (
    <>
      <div className="my-6">
        <h1 className="font-semibold">Antecedentes médicos personales</h1>
        <div className="h-[2px] bg-secondary mt-2"></div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {patientPersonalBackgroundValues.map((patient) => (
          <Fragment key={patient.label}>
            {patient.hide ? null : (
              <div
                className={`flex flex-col gap-1 items-start justify-start col-span-${patient.colSpan} p-3 rounded-2xl bg-accent1 dark:border-[#29292f] dark:bg-zinc-900`}
              >
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
