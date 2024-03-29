import { ReaderIcon, ImageIcon, PinBottomIcon, FileIcon } from '@radix-ui/react-icons';
import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { FileDeleteButton } from './FileDeleteButton';
import { formatByte } from '@/helpers';

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
  const generateFileIcon = () => {
    switch (file.extension) {
      case 'pdf':
        return <ReaderIcon className="min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
      case 'webp':
        return <ImageIcon className="min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]" />;
      default:
        return <FileIcon className="min-h-[18px] min-w-[18px] max-h-[18px] max-w-[18px]" />;
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-center justify-start gap-2 overflow-hidden">
        {generateFileIcon()}

        <TooltipProvider>
          <Tooltip delayDuration={450}>
            <TooltipTrigger asChild>
              <p className="truncate">{file.name}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{file.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs truncate">({formatByte(file.size)})</p>

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
              <p>Descargar documento ({formatByte(file.size)})</p>
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
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-full" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
};
