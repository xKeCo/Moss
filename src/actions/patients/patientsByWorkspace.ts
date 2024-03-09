'use server';
import prisma from '@/lib/prisma';

export const getPatientsByWorkspace = async (workspaceId: string) => {
  try {
    const patients = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        patients: {
          select: {
            name: true,
            email: true,
            dniNumber: true,
            photoURL: true,
          },
        },
      },
    });
  } catch (error) {}
};

export const getPatientsByWorkspaceThatNotHaveExtraInfo = async (workspaceId: string) => {
  try {
    const workspaceInfo = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        patients: {
          select: {
            name: true,
            email: true,
            dniNumber: true,
            photoURL: true,
          },
        },
      },
    });

    if (!workspaceInfo?.patients) {
      return {
        ok: false,
        patients: [],
      };
    }

    return {
      ok: true,
      patients: workspaceInfo?.patients,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error getting the patients, please try again.',
    };
  }
};
