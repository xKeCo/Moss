'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';

export const setActiveWorkspace = async (workspaceId: string) => {
  cookies().set('activeWorkspace', workspaceId);
};

export const getActiveWorkspace = async () => {
  return cookies().get('activeWorkspace')?.value;
};
