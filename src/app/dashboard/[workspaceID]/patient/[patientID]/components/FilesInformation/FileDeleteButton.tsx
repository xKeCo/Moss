'use client';
import { startTransition, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteFiles } from '@/actions';
import { Icons } from '@/components';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';

interface IFileDeleteButtonProps {
  fileId: string;
  deleteOptimisticFile: (fileID: string) => void;
}

export const FileDeleteButton = ({ fileId, deleteOptimisticFile }: IFileDeleteButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const handleDelete = async () => {
    setLoading(true);

    const deletedFile = await deleteFiles(fileId, pathname);

    setLoading(false);

    if (!deletedFile.ok) {
      toast.error(deletedFile.errorMessage);
      return;
    }

    toast.success(deletedFile.message);

    startTransition(() => deleteOptimisticFile(fileId));
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={350}>
        <TooltipTrigger asChild>
          <>
            {loading ? (
              <Icons.Spinner className="h-4 w-4 animate-spin" />
            ) : (
              <TrashIcon
                className="min-h-[18px] min-w-[18px] cursor-pointer hover:text-red-500 transition-colors"
                onClick={handleDelete}
              />
            )}
          </>
        </TooltipTrigger>
        <TooltipContent>
          <p>Descargar documento</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
