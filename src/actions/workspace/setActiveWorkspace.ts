'use server';

import { cookies } from 'next/headers';

export const setActiveWorkspace = async (workspaceId: string) => {
  cookies().set('activeWorkspace', workspaceId);
};

export const getActiveWorkspace = () => {
  return cookies().get('activeWorkspace')?.value;
};
