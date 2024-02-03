'use server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export const createWorkspace = async (workspaceName: string, userId: any) => {
  try {
    const existingWorkspace = await prisma.workspace.findFirst({
      where: {
        name: workspaceName,
      },
    });

    if (existingWorkspace) {
      return {
        ok: false,
        errorMessage: 'A workspace with that name already exists. Please select another name.',
        error: 'workspaceExists',
      };
    }

    const newWorkspace = await prisma.workspace.create({
      data: {
        name: workspaceName,

        users: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        users: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    cookies().set('activeWorkspace', newWorkspace.id);

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
