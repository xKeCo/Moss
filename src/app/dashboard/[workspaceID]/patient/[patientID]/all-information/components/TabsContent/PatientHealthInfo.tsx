import Link from 'next/link';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import {
  PatientFamilyInfo,
  PatientOralSystemReview,
  PatientPersonalBgInfo,
  PatientSystemReview,
} from './components';

interface IPatientHealthInfo {
  patientInfo: any;
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export const PatientHealthInfo = ({ patientInfo, params }: IPatientHealthInfo) => {
  return (
    <>
      {!patientInfo?.hasExtraInfo ? (
        <Alert variant="default_filled">
          <InfoCircledIcon className="h-5 w-5" />
          <AlertTitle className="text-sm font-bold dark:font-medium">Información</AlertTitle>
          <AlertDescription className="text-sm font-medium dark:font-normal">
            Este paciente no tiene información adicional.{' '}
            <Link
              href={`/dashboard/${params.workspaceID}/patient/${params.patientID}/health-info`}
              className="font-bold hover:text-primary/80"
            >
              Agregar información adicional aquí.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <PatientSystemReview patientSystemInfo={patientInfo?.HealthInformation?.SystemReview} />

          <PatientPersonalBgInfo
            patientPersonalBgInfo={patientInfo?.HealthInformation?.PersonalBackground}
          />

          <PatientFamilyInfo patientFamilyInfo={patientInfo?.HealthInformation?.FamilyBackground} />

          <PatientOralSystemReview
            patientOralSystemReview={patientInfo?.HealthInformation?.OralSystemReview}
          />
        </>
      )}
    </>
  );
};
