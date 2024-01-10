'use server';
import { IPatient } from '@/interfaces';
import prisma from '@/lib/prisma';

export const createPatient = async (patientData: IPatient, workspaceId: string) => {
  try {
    const existingPatient = await prisma.patient.findFirst({
      where: {
        dniNumber: patientData.dniNumber,
      },
    });

    if (existingPatient) {
      return {
        ok: false,
        errorMessage:
          'A patient with that dni number already exists. Please select another dni number.',
        error: 'patientExists',
      };
    }

    const { basicInformation, contactInformation, medicalInformation } = patientData;

    const newPatient = await prisma.patient.create({
      data: {
        dniNumber: patientData.dniNumber,
        email: patientData.email,
        name: patientData.name,
        photoURL: `https://source.boringavatars.com/marble/50/${patientData.dniNumber}`,
        workspaceId: workspaceId,
      },
      select: {
        id: true,
      },
    });

    const newBasicInformation = await prisma.basicInformation.create({
      data: {
        ...basicInformation,
        patientId: patientData.dniNumber,
      },
      select: {
        id: true,
      },
    });

    const newContactInformation = await prisma.contactInformation.create({
      data: {
        ...contactInformation,
        patientId: patientData.dniNumber,
      },
      select: {
        id: true,
      },
    });

    const newMedicalInformation = await prisma.medicalInformation.create({
      data: { ...medicalInformation, patientId: patientData.dniNumber },
      select: {
        id: true,
      },
    });

    const updatedPatient = await prisma.patient.update({
      where: {
        id: newPatient.id,
      },
      data: {
        BasicInformation: {
          connect: {
            id: newBasicInformation.id,
          },
        },
        ContactInformation: {
          connect: {
            id: newContactInformation.id,
          },
        },
        MedicalInformation: {
          connect: {
            id: newMedicalInformation.id,
          },
        },
      },
      select: {
        id: true,
        dniNumber: true,
        email: true,
        name: true,
        photoURL: true,
        BasicInformation: true,
        ContactInformation: true,
        MedicalInformation: true,
      },
    });

    return {
      ok: true,
      patient: updatedPatient,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'Could not create patient. Please try again.',
      error: 'unknownError',
    };
  }
};
