import { EyeOpenIcon, FileIcon, ImageIcon, PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { FileDeleteButton } from './FileDeleteButton';

export interface IFileProps {
  id: string;
  name: string;
  extension: string;
  size: number;
  ETag: string;
  url: string;
  type: string;
  fileKey: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FileCard = ({ file }: { file: IFileProps }) => {
  const filesActions = [
    // {
    //   name: 'Ver documento',
    //   icon: <EyeOpenIcon className="h-4 w-4 cursor-pointer" />,
    // },
    {
      name: 'Descargar documento',
      icon: <PinBottomIcon className="h-4 w-4 cursor-pointer" />,
    },
    {
      name: 'Eliminar documento',
      icon: <TrashIcon className="h-4 w-4 cursor-pointer" />,
    },
  ];

  return (
    <div className="flex items-center justify-between gap-2 w-full" key={file.name}>
      <div className="flex items-center justify-start gap-2 overflow-hidden">
        {file.extension === 'pdf' ? (
          <FileIcon className="min-h-4 min-w-4 max-h-4 max-w-4" />
        ) : (
          <ImageIcon className="min-h-4 min-w-4 max-h-4 max-w-4" />
        )}
        <p className="truncate">{file.name}</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <TooltipProvider>
          <Tooltip delayDuration={350}>
            <TooltipTrigger asChild>
              <a href={file.url}>
                <div className="hover:text-muted-foreground transition-colors">
                  <PinBottomIcon className="h-4 w-4 cursor-pointer" />
                </div>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Descargar documento</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <FileDeleteButton fileId={file.id} />
      </div>
    </div>
  );
};

FileCard.Skeleton = function FileCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center justify-start gap-2 overflow-hidden w-full">
        {/* <div className="h-4 w-4 bg-zinc-400 rounded-md" /> */}
        {/* <div className="h-4 w-24 bg-zinc-400 rounded-md" /> */}
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-5 w-full" />
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* <div className="h-4 w-4 bg-zinc-400 rounded-md" /> */}
        {/* <div className="h-4 w-4 bg-zinc-400 rounded-md" /> */}
        {/* <div className="h-4 w-4 bg-zinc-400 rounded-md" /> */}
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
};
