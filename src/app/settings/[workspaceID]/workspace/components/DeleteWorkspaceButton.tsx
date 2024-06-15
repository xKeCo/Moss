'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components/ui';
import { useParams, useRouter } from 'next/navigation';

export const DeleteWorkspaceButton = () => {
  const router = useRouter();
  const { workspaceID } = useParams();

  const handleDelete = () => {
    console.log('Deleting workspace', workspaceID);
  };

  return (
    <>
      <h1 className="text-base font-medium mb-4">Eliminar sucursal</h1>

      <p className="text-sm mb-6 text-muted-foreground">
        Si eliminas tu sucursal, perderás todos los datos asociados a ella, incluyendo pacientes,
        citas, tratamientos, archivos y más. Esta acción es irreversible.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-fit" variant="destructive">
            Eliminar sucursal
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de que quieres eliminar esta sucursal?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Si eliminas tu sucursal, perderás todos los datos asociados a ella, incluyendo
              pacientes, citas, tratamientos, archivos y más. Esta acción es irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} asChild>
              <Button>Si, eliminar sucursal</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
