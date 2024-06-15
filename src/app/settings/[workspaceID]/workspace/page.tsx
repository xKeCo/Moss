import { Separator } from '@/components/ui';
import { GeneralInfoForm } from '@/components';
import { getWorkspaceInfo } from '@/actions';
import { DeleteWorkspaceButton } from './components/DeleteWorkspaceButton';
import { WorkspaceImage } from './components/WorkspaceImage';

interface IWorkspaceSettingsProps {
  params: {
    workspaceID: string;
  };
}

export default async function WorkspaceSettings({ params }: Readonly<IWorkspaceSettingsProps>) {
  const { workspace, ok } = await getWorkspaceInfo(params.workspaceID);

  if (!ok) {
    return (
      <div>
        <h1>Error de servidor</h1>
        <p>Hubo un error al cargar la información de tu sucursal. Por favor, intenta de nuevo.</p>
      </div>
    );
  }

  return (
    <main className="flex justify-center h-full">
      <div className="flex flex-col w-full max-w-2xl mt-4">
        <h1 className="text-2xl font-medium mb-2">Sucursal</h1>

        <p className="text-sm font-medium text-muted-foreground">
          Aquí puedes configurar la información de tu sucursal.
        </p>

        <Separator className="my-6" />

        <WorkspaceImage logoURL={workspace?.logoURL!} />

        <Separator className="my-8" />

        <GeneralInfoForm workspaceData={workspace!} />

        <Separator className="my-8" />

        <DeleteWorkspaceButton />
      </div>
    </main>
  );
}
