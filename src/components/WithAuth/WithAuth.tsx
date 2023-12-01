'use client';
// React
import { useCallback, useEffect } from 'react';

//  HOC
import { NextComponentType } from 'next';

// Local component

// Hooks
import { useAuthStore } from '@/hooks';

export function withAuth(Component: NextComponentType) {
  const Auth = (props: JSX.IntrinsicAttributes) => {
    const { checkAuthToken } = useAuthStore();

    const memoizedCheckAuthToken = useCallback(() => {
      checkAuthToken();
    }, []);

    useEffect(() => {
      memoizedCheckAuthToken();
    }, [memoizedCheckAuthToken]);

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
