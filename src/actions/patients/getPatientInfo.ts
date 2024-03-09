'use server';
import prisma from '@/lib/prisma';

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

export const getPatientAllPersonalInformation = async (patientId: string) => {
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
      },
    });

    if (!patient) {
      return {
        ok: false,
        patientInfo: null,
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
      patientInfo: null,
      errorMessage: 'There was an error getting the patient, please try again.',
    };
  }
};
