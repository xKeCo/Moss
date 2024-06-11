'use server';
import prisma from '@/lib/prisma';

export const getPatientsByWorkspaceThatNotHaveExtraInfo = async (workspaceId: string) => {
  try {
    const workspaceInfo = await prisma.workspace.findUnique({
      where: { key: workspaceId },
      include: {
        patients: {
          select: {
            id: true,
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
