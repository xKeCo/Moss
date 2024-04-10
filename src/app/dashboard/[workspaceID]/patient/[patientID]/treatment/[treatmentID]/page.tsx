import { HeaderSectionTitle, NotFound, Odontogram } from '@/components';
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

  if (!ok) {
    return (
      <NotFound
        errorMessage={errorMessage}
        redirectPath={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
        redirectText="Volver a la página del paciente"
      />
    );
  }

  return (
    <>
      <HeaderSectionTitle
        href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
        title={`Información del tratamiento - ${treatmentInfo?.Patient?.name}`}
        containerClassName="mb-6"
      />

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
                <p className="text-base font-medium mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TreatmentBasicInfo treatmentInfo={treatmentInfo!} />
    </>
  );
}
