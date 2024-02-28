import { Skeleton } from '@/components/ui';
import { FileCard, type IFileProps } from './FileCard';
import { FileUploadModal } from './FileUploadModal';
import { FilesViewAll } from './FilesViewAll';

interface IFilesInformationProps {
  files: IFileProps[];
  params: {
    workspaceID: string;
    patientID: string;
  };
}

export const FilesInformation = ({ files, params }: IFilesInformationProps) => {
  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[274px] overflow-hidden dark:bg-zinc-900">
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-xl font-semibold">
          Archivos <span className="hidden sm:inline">/ Documentos</span>
        </h1>
        <FileUploadModal params={params} />
      </div>
      {files.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-lg text-center text-balance">Aún no hay archivos o documentos.</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-2 w-full ">
          {files.slice(0, 4).map((file) => (
            <FileCard file={file} key={file.id} />
          ))}
        </div>
      )}

      {files.length > 4 && <FilesViewAll files={files} />}
    </div>
  );
};

FilesInformation.Skeleton = function FilesInformationSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[274px] overflow-hidden dark:bg-zinc-900">
      <div className="flex items-center justify-between w-full gap-2">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-9 w-9" />
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <FileCard.Skeleton />
        <FileCard.Skeleton />
        <FileCard.Skeleton />
        <FileCard.Skeleton />
      </div>

      <Skeleton className="h-9 w-full mt-1" />
    </div>
  );
};
