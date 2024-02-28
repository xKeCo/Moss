import Link from 'next/link';
import { ArrowLeftIcon, ChevronLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Odontogram } from '@/components';
import { Button } from '@/components/ui';
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

  const basicInfo = [
    { label: 'Diagnóstico', value: treatmentInfo?.diagnosis },
    { label: 'Pronóstico', value: treatmentInfo?.prognosis },
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
          <div className="flex items-center justify-start gap-4 mb-3">
            <Button size="icon" asChild className="min-w-9">
              <Link href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}>
                <ChevronLeftIcon className="h-5 w-5" />
              </Link>
            </Button>

            <h1 className="text-2xl xl:text-3xl font-semibold truncate">
              {treatmentInfo?.Patient?.name} - Información del tratamiento
            </h1>
          </div>

          <div className="h-[2px] bg-secondary"></div>

          <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontograma</h1>

          <div className="overflow-x-auto">
            <Odontogram odontogramState={treatmentInfo?.InitialOdontogram?.Tooth!} readOnly />
          </div>

          <div>
            <h1 className="text-xl xl:text-xl font-semibold mt-2">
              Información básica del tratamiento
            </h1>

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
