import NextAuth from 'next-auth';
import { IUser } from '.';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      name: string;
      photoURL: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}
