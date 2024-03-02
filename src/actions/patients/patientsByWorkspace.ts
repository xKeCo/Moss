'use server';
import { IPatient } from '@/interfaces';
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

export const getPatientById = async (patientId: string) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { dniNumber: patientId },
      include: {
        BasicInformation: true,
        ContactInformation: true,
        MedicalInformation: true,
        HealthInformation: {
          include: {
            SystemReview: true,
            FamilyBackground: true,
            PersonalBackground: true,
            OralSystemReview: true,
          },
        },
        Files: true,
        Treatment: true,
      },
    });

    if (!patient) {
      return {
        ok: false,
        errorMessage: 'There is no patient with that ID.',
      };
    }

    return {
      ok: true,
      patientInfo: patient,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      errorMessage: 'There was an error getting the patient, please try again.',
    };
  }
};
