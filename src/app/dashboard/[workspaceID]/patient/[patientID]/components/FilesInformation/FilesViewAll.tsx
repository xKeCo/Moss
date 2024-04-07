'use client';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from '@/components/ui';
import { FileCard } from './FileCard';
import type { IFile } from '@/interfaces';
import { cn } from '@/lib/utils';

interface IFilesViewAllProps {
  files: IFile[];
  deleteOptimisticFile: (fileID: string) => void;
}

export const FilesViewAll = ({ files, deleteOptimisticFile }: IFilesViewAllProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn('w-full hidden', files.length > 7 && 'inline-flex')}
        >
          Ver todos los archivos
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">Subir archivo</DialogTitle>
          <DialogDescription>
            Sube un archivo para adjuntarlo a la ficha del paciente.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          <div className="flex flex-col justify-start items-start gap-2 pr-4 w-full">
            {files.map((file) => (
              <FileCard
                key={file.fileKey}
                file={file}
                deleteOptimisticFile={deleteOptimisticFile}
              />
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
