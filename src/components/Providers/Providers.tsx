'use client';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/services/redux';

interface IProviders {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
};
