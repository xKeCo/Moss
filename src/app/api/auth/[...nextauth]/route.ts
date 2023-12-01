import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { MossApi } from '@/api';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },

      async authorize(credentials, req) {
        const { data } = await MossApi.post('/auth/login', {
          email: credentials!.email,
          password: credentials!.password,
        });

        if (!data.user) throw new Error(data.message);

        return data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },

    session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
