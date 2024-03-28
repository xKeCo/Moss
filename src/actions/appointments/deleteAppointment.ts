'use server';
import prisma from '@/lib/prisma';

export const deleteAppointment = async (appointmentId: string) => {
  try {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    return {
      ok: true,
      message: 'Cita eliminada correctamente',
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
