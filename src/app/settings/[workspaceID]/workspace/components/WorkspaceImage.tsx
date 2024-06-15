'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const WorkspaceImage = ({ logoURL }: { logoURL: string }) => {
  const { data: session, update } = useSession();

  return (
    <>
      <h1 className="text-base font-medium mb-4">Logo</h1>

      <div className="w-16 h-16 object-cover mt-1 mb-4">
        <Image
          blurDataURL="/logo1.svg"
          placeholder="blur"
          className="rounded-md"
          src={logoURL || '/logo1.svg'}
          alt="Logo de la sucursal"
          width={64}
          height={64}
        />
      </div>

      <p className="text-xs font-medium text-muted-foreground">
        Elije un logo para tu sucursal. Tamaño recomendado: 256x256px.
      </p>
    </>
  );
};
