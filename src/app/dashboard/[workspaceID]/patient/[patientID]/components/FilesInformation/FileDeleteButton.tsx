'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TrashIcon } from '@radix-ui/react-icons';
import { deleteFiles } from '@/actions';
import { Icons } from '@/components';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';

export const FileDeleteButton = ({ fileId }: { fileId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async () => {
    console.log(fileId);
    setLoading(true);

    const deletedFile = await deleteFiles(fileId);

    setLoading(false);

    if (!deletedFile.ok) {
      toast.error(deletedFile.errorMessage);
      return;
    }

    if (deletedFile.ok) {
      toast.success(deletedFile.message);
    }

    router.refresh();
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
                className="h-4 w-4 cursor-pointer hover:text-muted-foreground transition-colors"
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
