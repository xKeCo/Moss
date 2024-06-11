import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';
import bycryptjs from 'bcryptjs';
import { cookies } from 'next/headers';

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
          include: {
            workspaces: true,
          },
        });

        if (!user) throw new Error('UserNotFound');

        if (!bycryptjs.compareSync(password, user.password)) {
          return null;
        }

        const { password: _, ...rest } = user;

        if (rest.workspaces.length > 0) {
          const validWorkspace = rest.workspaces.find(
            (workspace) => workspace.key === cookies().get('activeWorkspace')?.value
          );

          if (!validWorkspace) {
            cookies().set('activeWorkspace', rest.workspaces[0].key);
          }
        }

        return rest;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, session, trigger }: { token: any; session?: any; trigger?: any }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token.email.toLowerCase(),
        },
        include: {
          workspaces: true,
        },
      });

      if (user) token.user = user;

      if (trigger === 'update') {
        return { ...token, user: session.user };
      }

      return token;
    },

    session({ session, token }: { session: any; token: any }) {
      session.user = token.user;

      if (!cookies().get('activeWorkspace')?.value) {
        cookies().set('activeWorkspace', session.user.workspaces[0].key);
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
});

export { handler as GET, handler as POST };
