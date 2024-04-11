'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// pendiente, nueva, confirmada

export const confirmAppointment = async (
  appointmentId: string,
  confirmedStatus: 'pendiente' | 'confirmada' | 'modificar',
  validatePath: string
) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: confirmedStatus,
        statusChanged: true,
      },
    });

    revalidatePath(validatePath);

    if (!appointment)
      return {
        ok: false,
        errorMessage: 'No existe una cita con ese ID.',
        error: 'notFound',
      };

    return {
      ok: true,
      appointment,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'No se pudo confirmar la cita. Por favor, inténtelo de nuevo mas tarde.',
      error: 'unknownError',
    };
  }
};

export const updateAppointment = async (
  suggestedAppointmentData: any,
  appointmentId: string,
  validatePath: string,
  confirmedStatus: 'pendiente' | 'confirmada' | 'modificar' = 'modificar'
) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        suggestedDate: suggestedAppointmentData.suggestedDate,
        suggestedStartTime: suggestedAppointmentData.suggestedStartTime.slice(0, 5),
        suggestedStartTimeAMPM: suggestedAppointmentData.suggestedStartTime.slice(-2),
        suggestedEndTime: suggestedAppointmentData.suggestedEndTime.slice(0, 5),
        suggestedEndTimeAMPM: suggestedAppointmentData.suggestedEndTime.slice(-2),

        status: confirmedStatus,
        statusChanged: true,
      },
    });

    revalidatePath(validatePath);

    return {
      ok: true,
      appointment,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'No se pudo actualizar la cita. Por favor, inténtelo de nuevo mas tarde.',
      error: 'unknownError',
    };
  }
};
