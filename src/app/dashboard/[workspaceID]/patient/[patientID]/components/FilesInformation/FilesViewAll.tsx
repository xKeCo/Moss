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
import { FileCard, type IFileProps } from './FileCard';

interface IFilesViewAllProps {
  files: IFileProps[];
}

export const FilesViewAll = ({ files }: IFilesViewAllProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
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
              <FileCard file={file} key={file.id} />
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
