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
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { workspace } = await getWorkspaceInfo(params.workspaceID);

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
