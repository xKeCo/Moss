import React, { Fragment } from 'react';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  values: {
    name: string;
    href?: string;
  }[];
}

export const Breadcrumb = ({ values }: BreadcrumbProps) => {
  return (
    <div className="flex items-center justify-start gap-2 mb-8">
      {values.map((value, index) => (
        <React.Fragment key={value.name}>
          <>
            {value.href ? (
              <Link href={value.href}>
                <p className="text-muted-foreground hover:text-primary">{value.name}</p>
              </Link>
            ) : (
              <p
                className={cn(
                  'text-muted-foreground',
                  index === values.length - 1 && 'text-primary'
                )}
              >
                {value.name}
              </p>
            )}
          </>

          {index === values.length - 1 ? null : (
            <div className="text-muted-foreground text-base">/</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

Breadcrumb.Skeleton = function BreadcrumbSkeleton({ positions = 2 }) {
  return (
    <div className="flex items-center justify-start gap-2 mb-8">
      {Array.from({ length: positions }).map((_, index) => (
        <Fragment key={`breadcrumb-skeleton-${index}`}>
          <Skeleton className="h-5 w-20" />

          {index === positions - 1 ? null : (
            <div className="text-muted-foreground text-base">/</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
