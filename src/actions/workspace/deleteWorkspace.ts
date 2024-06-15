'use server';
import prisma from '@/lib/prisma';

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    await prisma.workspace.delete({
      where: {
        id: workspaceId,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error deleting your workspace, please try again.',
      error: 'serverError',
    };
  }
};
