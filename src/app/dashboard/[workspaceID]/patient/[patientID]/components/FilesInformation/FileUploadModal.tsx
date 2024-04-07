'use client';
import { FormEvent, startTransition, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { EyeOpenIcon, PinTopIcon, TrashIcon } from '@radix-ui/react-icons';
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
  Label,
} from '@/components/ui';
import { uploadFiles } from '@/actions';
import { Icons } from '@/components';
import type { IFile } from '@/interfaces';

interface IFileUploadModalProps {
  patientID: string;
  addOptimisticFiles: (action: IFile[]) => void;
}

export const FileUploadModal = ({ patientID, addOptimisticFiles }: IFileUploadModalProps) => {
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  const onFileInputChange = async (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (!files) return;

    const filesArray = Array.from(files);

    const replaceFiles = filesArray.filter(
      (file) => !filesUpload.some((f) => f.name === file.name)
    );

    setFilesUpload([...replaceFiles, ...filesUpload]);
  };

  const onFileRemove = (file: File) => {
    setFilesUpload(filesUpload.filter((f) => f.name !== file.name));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filesUpload.length === 0) {
      toast.error('No se ha seleccionado ningún archivo');
      return;
    }

    const formData = new FormData();

    for (const element of filesUpload) {
      formData.append('files', element);
    }

    setLoading(true);

    const fileRes = await uploadFiles(formData, patientID, pathname);

    setLoading(false);

    fileRes.forEach((file) => {
      if (file.ok) {
        toast.success(`Archivo ${file.name} subido correctamente`);
      } else {
        toast.error(`Error al subir archivo ${file.name}`);
      }
    });

    startTransition(() => addOptimisticFiles(fileRes.filter((file) => file.ok) as IFile[]));

    setFilesUpload([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <PinTopIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Subir archivo</DialogTitle>
          <DialogDescription>
            Sube un archivo para adjuntarlo a la ficha del paciente.
          </DialogDescription>
        </DialogHeader>

        <input
          type="file"
          name="files"
          ref={fileInput}
          style={{ display: 'none' }}
          multiple
          onChange={onFileInputChange}
        />

        <Button className="w-full" type="button" onClick={() => fileInput.current?.click()}>
          <PinTopIcon className="h-4 w-4 mr-2" />
          Subir archivo
        </Button>

        <form className="flex flex-col gap-4 mt-2 w-full" onSubmit={onSubmit}>
          {filesUpload?.length === 0 && <h1>No hay archivos seleccionados.</h1>}

          {filesUpload.map((file) => (
            <div key={file.name} className="flex items-center justify-between gap-2 w-full">
              <Label>{file.name}</Label>
              <div className="flex items-center justify-between gap-2">
                <a href={URL.createObjectURL(file)} target="_blank">
                  <EyeOpenIcon className="h-5 w-5 cursor-pointer hover:text-blue-500 transition-colors" />
                </a>
                <TrashIcon
                  className="h-5 w-5 cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => onFileRemove(file)}
                />
              </div>
            </div>
          ))}

          <DialogFooter className="mt-4 flex flex-row justify-end gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => setFilesUpload([])}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading && <Icons.Spinner className="mr-2 h-5 w-5 animate-spin" />}
              Guardar {filesUpload.length > 1 ? 'archivos' : 'archivo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
