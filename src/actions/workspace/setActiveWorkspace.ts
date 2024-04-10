'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setActiveWorkspace = (workspaceId: string) => {
  cookies().set('activeWorkspace', workspaceId);
  redirect(`/dashboard/${workspaceId}`);
};

export const getActiveWorkspace = () => {
  return cookies().get('activeWorkspace')?.value;
};
