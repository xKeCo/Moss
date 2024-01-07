import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';
import bycryptjs from 'bcryptjs';

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
        const { email, password } = credentials!;

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) throw new Error('UserNotFound');

        if (!bycryptjs.compareSync(password, user.password)) {
          return null;
        }

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if (user) token.user = user;

      return token;
    },

    session({ session, token }: { session: any; token: any }) {
      session.user = token.user as any;

      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
});

export { handler as GET, handler as POST };
