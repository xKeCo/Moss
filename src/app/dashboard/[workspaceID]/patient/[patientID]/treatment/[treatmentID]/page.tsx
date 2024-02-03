import Link from 'next/link';
import { ArrowLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Odontogram } from '@/components';
import { Button, Skeleton } from '@/components/ui';
import { TreatmentBasicInfo } from './components/TreatmentBasicInfo';
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
  // await new Promise((resolve) => setTimeout(resolve, 1000000));

  const basicInfo = [
    { label: 'Diagnosis', value: treatmentInfo?.diagnosis },
    { label: 'Prognosis', value: treatmentInfo?.prognosis },
  ];

  return (
    <>
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

          <div>
            <h1 className="text-xl xl:text-xl font-semibold mt-2">Basic information</h1>

            <div className="mt-4 mb-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {basicInfo.map((item) => (
                  <div key={item.label}>
                    <p className="text-base font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-base mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <TreatmentBasicInfo treatmentInfo={treatmentInfo!} params={params} />
        </>
      )}
    </>
  );
}
