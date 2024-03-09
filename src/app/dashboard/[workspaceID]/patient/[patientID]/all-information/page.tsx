import Link from 'next/link';
import { getPatientAllPersonalInformation } from '@/actions';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { ArrowLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { PatientGeneralInfo, PatientHealthInfo } from './components';
import { HeaderSectionTitle } from '@/components';

interface IAllInformationPageProps {
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export default async function AllInformationPage({ params }: Readonly<IAllInformationPageProps>) {
  const { patientInfo, ok, errorMessage } = await getPatientAllPersonalInformation(
    params.patientID
  );

  return (
    <div className="dark:bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto min-h-screenwithoutheader py-12 p-6">
        {!ok ? (
          <div className="flex flex-col items-center justify-center gap-10">
            <CrossCircledIcon className="w-24 h-24 text-red-500" />
            <h1 className="text-2xl text-center w-2/5">{errorMessage}</h1>
            <Button asChild>
              <Link href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Volver a la página del paciente
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <HeaderSectionTitle
              href={`/dashboard/${params.workspaceID}/patient/${params.patientID}`}
              title={`Información personal - ${patientInfo?.name}`}
              containerClassName="mb-6"
            />

            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Información personal</TabsTrigger>
                <TabsTrigger value="health">Información de salud</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PatientGeneralInfo patientInfo={patientInfo} />
              </TabsContent>

              <TabsContent value="health">
                <PatientHealthInfo patientInfo={patientInfo} params={params} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
