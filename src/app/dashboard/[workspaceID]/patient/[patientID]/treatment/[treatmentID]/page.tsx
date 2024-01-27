import { Odontogram } from '@/components';
import { Button, Skeleton } from '@/components/ui';
import { TreatmentBasicInfo } from './components/TreatmentBasicInfo';
import { ArrowLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getTreatmentById } from '@/actions';

interface TreatmentInformationProps {
  params: {
    workspaceID: string;
    patientID: string;
    treatmentID: string;
  };
}

export default async function TreatmentInformation({
  params,
}: Readonly<TreatmentInformationProps>) {
  const { ok, errorMessage, treatmentInfo } = await getTreatmentById(params.treatmentID);

  return (
    <>
      <p>{treatmentInfo?.id}</p>
      {!ok ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <CrossCircledIcon className="w-24 h-24 text-red-500" />
          <h1 className="text-2xl text-center w-2/5">{errorMessage}</h1>
          <Button asChild>
            <Link href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go back to patient page
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl xl:text-3xl font-semibold mb-3 flex items-center">
            {treatmentInfo?.Patient?.name} - Treatment Information
          </h1>
          <div className="h-[2px] bg-secondary"></div>

          <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontogram</h1>

          <Odontogram odontogramState={treatmentInfo?.InitialOdontogram?.Tooth!} readOnly />

          <TreatmentBasicInfo treatmentInfo={treatmentInfo!} />
        </>
      )}
    </>
  );
}
