'use client';

import { SessionProvider } from 'next-auth/react';

interface IProviders {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return <SessionProvider>{children}</SessionProvider>;
};
