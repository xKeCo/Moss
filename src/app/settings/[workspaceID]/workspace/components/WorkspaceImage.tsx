'use client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui';

export const WorkspaceImage = ({ logoURL }: { logoURL: string }) => {
  return (
    <>
      <h1 className="text-base font-medium mb-4">Logo</h1>

      {logoURL ? (
        <div className="w-16 h-16 object-cover mt-1 mb-4">
          <Image
            blurDataURL="/logo1.svg"
            placeholder="blur"
            className="rounded-md"
            src={logoURL}
            alt="Logo de la sucursal"
            width={64}
            height={64}
          />
        </div>
      ) : (
        <Skeleton className="rounded-md w-16 h-16 mt-1 mb-4" />
      )}

      <p className="text-xs font-medium text-muted-foreground">
        Elije un logo para tu sucursal. Tamaño recomendado: 256x256px.
      </p>
    </>
  );
};

export const WorkspaceImageSkeleton = () => {
  return (
    <>
      <h1 className="text-base font-medium mb-4">Logo</h1>

      <Skeleton className="rounded-md w-16 h-16 mt-1 mb-4" />

      <p className="text-xs font-medium text-muted-foreground">
        Elije un logo para tu sucursal. Tamaño recomendado: 256x256px.
      </p>
    </>
  );
};
