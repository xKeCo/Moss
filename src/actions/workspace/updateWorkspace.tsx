'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateWorkspace = async (
  workspaceId: string,
  workspaceName: string,
  workspaceKey: string
) => {
  try {
    const existingWorkspaceKey = await prisma.workspace.findFirst({
      where: {
        key: workspaceKey,
        NOT: {
          id: workspaceId,
        },
      },
    });

    if (existingWorkspaceKey) {
      return {
        ok: false,
        errorMessage: 'Ya existe una sucursal con esa URL. Por favor selecciona otra clave.',
        error: 'workspaceKeyExists',
      };
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        name: workspaceName,
        key: workspaceKey,
        logoURL: `https://source.boringavatars.com/marble/256/${workspaceKey}?square=true`,
      },
      select: {
        id: true,
        name: true,
        key: true,
        logoURL: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath(`/settings/${workspaceKey}/workspace`);

    return {
      ok: true,
      workspace: updatedWorkspace,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error updating your workspace, please try again.',
      error: 'serverError',
    };
  }
};
