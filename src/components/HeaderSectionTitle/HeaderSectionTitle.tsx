import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button, Skeleton } from '../ui';
import { cn } from '@/lib/utils';

interface IHeaderSectionTitle {
  href: string;
  title: string;
  containerClassName?: string;
}

export const HeaderSectionTitle = ({ href, title, containerClassName }: IHeaderSectionTitle) => {
  return (
    <div className={cn('flex flex-col items-start justify-center', containerClassName)}>
      <div className="flex items-center justify-start gap-4 mb-3 truncate w-full">
        <Button size="icon" asChild className="min-w-8 max-w-8 max-h-8 md:min-w-9 md:max-h-9">
          <Link href={href}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
        </Button>

        <h1 className="text-2xl xl:text-3xl font-semibold truncate">{title}</h1>
      </div>

      <div className="h-[2px] bg-secondary w-full"></div>
    </div>
  );
};

HeaderSectionTitle.Skeleton = function HeaderSectionTitleSkeleton({
  containerClassName,
}: {
  containerClassName?: string;
}) {
  return (
    <div className={cn('flex flex-col items-start justify-center', containerClassName)}>
      <div className="flex items-center justify-start gap-4 mb-3 truncate w-full">
        <Skeleton className="w-8 h-8 md:w-9 md:h-9" />
        <Skeleton className="w-1/2 h-8 md:h-9"></Skeleton>
      </div>

      <div className="h-[2px] bg-secondary w-full"></div>
    </div>
  );
};
