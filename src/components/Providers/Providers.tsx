'use client';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux';

interface IProviders {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};
