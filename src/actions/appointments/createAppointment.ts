'use server';
import prisma from '@/lib/prisma';

export const createAppointment = async (appointmentData: any, patientId: string) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        ...appointmentData,
        startTime: appointmentData.startTime.slice(0, 5),
        startTimeAMPM: appointmentData.startTime.slice(-2),
        endTime: appointmentData.endTime.slice(0, 5),
        endTimeAMPM: appointmentData.endTime.slice(-2),
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
