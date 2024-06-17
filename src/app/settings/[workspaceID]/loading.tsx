import { Separator } from '@/components/ui';
import { GeneralInfoFormSkeleton } from '@/components';
import { WorkspaceImageSkeleton } from './workspace/components/WorkspaceImage';
import { DeleteWorkspaceButtonSkeleton } from './workspace/components/DeleteWorkspaceButton';

export default function SettingsLoadingPage() {
  return (
    <main className="flex justify-center h-full">
      <div className="flex flex-col w-full max-w-2xl mt-4">
        <h1 className="text-2xl font-medium mb-2">Sucursal</h1>

        <p className="text-sm font-medium text-muted-foreground">
          Aquí puedes configurar la información de tu sucursal.
        </p>

        <Separator className="my-6" />

        <WorkspaceImageSkeleton />

        <Separator className="my-8" />

        <GeneralInfoFormSkeleton />

        <Separator className="my-8" />

        <DeleteWorkspaceButtonSkeleton />
      </div>
    </main>
  );
}
