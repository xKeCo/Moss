'use client';
import { useOptimistic } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui';
import { FileCard } from './FileCard';
import { FileUploadModal } from './FileUploadModal';
import { FilesViewAll } from './FilesViewAll';
import type { IFile } from '@/interfaces';

interface IFilesInformationProps {
  files: IFile[];
}

export const FilesInformation = ({ files }: IFilesInformationProps) => {
  const [optimisticUploadedFiles, addOptimisticFiles] = useOptimistic<IFile[], IFile[]>(
    files,
    (state, newFiles) => [...state, ...newFiles]
  );

  const [optimisticFiles, deleteOptimisticFile] = useOptimistic(
    optimisticUploadedFiles,
    (state, fileID) => state.filter((file) => file.id !== fileID)
  );

  const { patientID } = useParams();

  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[274px] overflow-hidden dark:bg-zinc-900">
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-xl font-semibold">
          Archivos <span className="hidden sm:inline">/ Documentos</span>
        </h1>
        <FileUploadModal patientID={patientID as string} addOptimisticFiles={addOptimisticFiles} />
      </div>
      {optimisticFiles?.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-lg text-center text-balance">Aún no hay archivos o documentos.</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-2 w-full ">
          {optimisticFiles?.slice(0, 7).map((file) => (
            <FileCard key={file.fileKey} file={file} deleteOptimisticFile={deleteOptimisticFile} />
          ))}
        </div>
      )}

      <FilesViewAll files={optimisticFiles} deleteOptimisticFile={deleteOptimisticFile} />
    </div>
  );
};

export function FilesInformationSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[274px] overflow-hidden dark:bg-zinc-900">
      <div className="flex items-center justify-between w-full gap-2">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-9 w-9" />
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <FileCard.Skeleton key={index} />
        ))}
      </div>

      <Skeleton className="h-9 w-full mt-1" />
    </div>
  );
}
