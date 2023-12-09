'use client';
import React from 'react';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  values: {
    name: string;
    href?: string;
  }[];

  loading?: boolean;
}

export const Breadcrumb = ({ values, loading }: BreadcrumbProps) => {
  return (
    <div className="flex items-center justify-start gap-2 mb-8">
      {values.map((value, index) => (
        <React.Fragment key={value.name}>
          {loading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <>
              {value.href ? (
                <Link href={value.href}>
                  <p className="text-slate-400 hover:text-primary">{value.name}</p>
                </Link>
              ) : (
                <p
                  className={cn(
                    'text-slate-400',
                    index === values.length - 1 && 'text-primary'
                  )}
                >
                  {value.name}
                </p>
              )}
            </>
          )}

          {index === values.length - 1 ? null : (
            <div className="text-slate-400 text-base">/</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
