import { EyeOpenIcon, FileIcon, ImageIcon, PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

export interface IFileProps {
  name: string;
  extension: string;
  size: string;
}

export const FileCard = ({ file }: { file: IFileProps }) => {
  const filesActions = [
    {
      name: 'Ver documento',
      icon: <EyeOpenIcon className="h-4 w-4 cursor-pointer" />,
    },
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
        {filesActions.map((action) => (
          <TooltipProvider key={action.name}>
            <Tooltip delayDuration={350}>
              <TooltipTrigger asChild>
                <div className="hover:text-muted-foreground transition-colors">{action.icon}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
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
