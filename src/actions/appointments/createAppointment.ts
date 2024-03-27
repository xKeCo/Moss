'use server';
import prisma from '@/lib/prisma';

export const createAppointment = async (appointmentData: any, patientId: string) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        ...appointmentData,
        patientId,
      },
      select: {
        id: true,
      },
    });

    return {
      ok: true,
      appointment: newAppointment,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'Could not create appointment. Please try again.',
      error: 'unknownError',
    };
  }
};
