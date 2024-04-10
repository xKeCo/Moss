import Link from 'next/link';
import React from 'react';
import { ArrowLeftIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Button } from '../ui';

interface INotFoundProps {
  errorMessage?: string;
  redirectPath?: string;
  redirectText?: string;
}

export const NotFound = ({
  errorMessage = 'Ha ocurrido un error inesperado',
  redirectPath,
  redirectText,
}: INotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-[calc(100dvh-170px)] p-4">
      <CrossCircledIcon className="w-24 h-24 text-red-500" />

      <h1 className="text-2xl text-center w-full">{errorMessage}</h1>

      <Button asChild>
        {redirectPath ? (
          <Link href={redirectPath}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {redirectText}
          </Link>
        ) : (
          <Link href="/">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        )}
      </Button>
    </div>
  );
};
