'use server';
import prisma from '@/lib/prisma';

export const getPatientById = async (patientId: string) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
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
        Appointments: {
          orderBy: [
            {
              date: 'asc',
            },
            {
              startTimeAMPM: 'asc',
            },
            {
              startTime: 'asc',
            },
          ],

          where: {
            date: {
              gte: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
          },

          include: {
            Patient: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!patient) {
      return {
        ok: false,
        errorMessage: 'No existe un paciente con ese ID.',
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
      errorMessage: 'Hubo un error obteniendo el paciente, por favor intenta de nuevo.',
    };
  }
};

export const getPatientAllPersonalInformation = async (patientId: string) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
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
        errorMessage: 'No existe un paciente con ese ID.',
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
      errorMessage: 'Hubo un error obteniendo el paciente, por favor intenta de nuevo.',
    };
  }
};
