import { getPatientAllPersonalInformation } from '@/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { PatientGeneralInfo, PatientHealthInfo } from './components';
import { HeaderSectionTitle, NotFound } from '@/components';

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

  if (!ok) {
    return <NotFound errorMessage={errorMessage} />;
  }

  return (
    <div className="dark:bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto min-h-screenwithoutheader py-12 p-6">
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
      </div>
    </div>
  );
}
