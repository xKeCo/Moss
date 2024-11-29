'use server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const createWorkspace = async (workspaceName: string, workspaceKey: string, userId: any) => {
  try {
    const existingWorkspaceKey = await prisma.workspace.findFirst({
      where: {
        key: workspaceKey,
      },
    });

    if (existingWorkspaceKey) {
      return {
        ok: false,
        errorMessage: 'Ya existe una sucursal con esa URL. Por favor selecciona otra clave.',
        error: 'workspaceKeyExists',
      };
    }

    const newWorkspace = await prisma.workspace.create({
      data: {
        name: workspaceName,
        key: workspaceKey,
        logoURL: `https://avatar.vercel.sh/${workspaceKey}`,

        users: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        key: true,
        users: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    cookies().set('activeWorkspace', newWorkspace.key);

    return {
      ok: true,
      workspace: newWorkspace,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error creating your workspace, please try again.',
      error: 'serverError',
    };
  }
};
