'use server';
import prisma from '@/lib/prisma';

export const getWorkspaceInfo = async (workspaceKey: string) => {
  try {
    const existingWorkspaceKey = await prisma.workspace.findFirst({
      where: {
        key: workspaceKey,
      },
      select: {
        id: true,
        name: true,
        key: true,
        logoURL: true,
      },
    });

    if (!existingWorkspaceKey) {
      return {
        ok: false,
        errorMessage: 'This workspace does not exist.',
        error: 'workspaceNotFound',
      };
    }

    return {
      ok: true,
      workspace: existingWorkspaceKey,
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
