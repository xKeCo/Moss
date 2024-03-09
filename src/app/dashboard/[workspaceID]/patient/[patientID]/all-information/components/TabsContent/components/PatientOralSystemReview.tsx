import { Fragment } from 'react';
import {
  formatATM,
  formatJointSoundsType,
  formatOcclusionType,
  formatPainThreshold,
  formatSalivarGlandsType,
  formatTeethType,
  formatTongue,
} from '@/helpers/healthInformation';
import type { IOralSystemReview } from '@/interfaces';

interface IPatientOralSystemReview {
  patientOralSystemReview: IOralSystemReview;
}

export const PatientOralSystemReview = ({ patientOralSystemReview }: IPatientOralSystemReview) => {
  const patientOralSystemReviewValues = [
    {
      label: 'Faneras',
      value: patientOralSystemReview?.faneras,
    },
    {
      label: 'Cavidad oral',
      value: patientOralSystemReview?.oralCavity,
    },
    {
      label: 'Dientes',
      value: formatTeethType(patientOralSystemReview?.teeth),
    },
    {
      label: 'Lengua',
      value: formatTongue(patientOralSystemReview?.tongue),
    },
    {
      label: 'ATM Izquierdo',
      value: formatATM(patientOralSystemReview?.ATMLeft),
    },
    {
      label: 'ATM Derecho',
      value: formatATM(patientOralSystemReview?.ATMRight),
    },
    {
      label: 'Glándulas salivales',
      value: formatSalivarGlandsType(patientOralSystemReview?.salivaryGlands),
    },
    {
      label: 'Oclusión',
      value: formatOcclusionType(patientOralSystemReview?.occlusion),
    },
    {
      label: 'Color de dientes',
      value: patientOralSystemReview?.teethColor,
    },
    {
      label: 'Umbral de dolor',
      value: formatPainThreshold(patientOralSystemReview?.painThreshold),
    },
    {
      label: 'Apertura mandibular máxima',
      value: `${patientOralSystemReview?.maxMandibularOpening} Milímetros`,
    },
    {
      label: 'Lateralidad izquierda',
      value: `${patientOralSystemReview?.leftLaterality} Milímetros`,
    },
    {
      label: 'Lateralidad derecha',
      value: `${patientOralSystemReview?.rightLaterality} Milímetros`,
    },
    {
      label: 'Protrusión',
      value: `${patientOralSystemReview?.protrusion} Milímetros`,
    },
    {
      label: 'Sonidos articulares',
      value: formatJointSoundsType(patientOralSystemReview?.jointSounds),
    },
  ];

  return (
    <>
      <div className="my-6">
        <h1 className="font-semibold">Inspección por sistemas</h1>
        <div className="h-[2px] bg-secondary mt-2"></div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {patientOralSystemReviewValues.map((patient) => (
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
