'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteAppointment = async (appointmentId: string, pathname: string) => {
  try {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    revalidatePath(pathname);

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
