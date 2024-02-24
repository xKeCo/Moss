import { FileCard, type IFileProps } from './FileCard';

interface IFilesInformationProps {
  files: IFileProps[];
}

export const FilesInformation = ({ files }: IFilesInformationProps) => {
  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-3 border rounded-2xl gap-3 w-full p-6 min-h-[274px]">
      <h1 className="text-xl font-semibold">Archivos / Documentos</h1>
      {files.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-lg text-center text-balance">Aún no hay archivos o documentos.</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-2 w-full ">
          {files.map((file) => (
            <FileCard file={file} key={file.name} />
          ))}
        </div>
      )}
    </div>
  );
};
