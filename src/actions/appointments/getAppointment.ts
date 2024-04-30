'use server';
import prisma from '@/lib/prisma';

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        Patient: {
          select: {
            name: true,
          },
        },
      },
    });

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
      errorMessage: 'No se pudo obtener la cita. Por favor, inténtelo de nuevo mas tarde.',
      error: 'unknownError',
    };
  }
};

export const getCalendarAppointments = async (workspaceId: string, date: any) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        workspaceId,
        date: {
          gte: new Date(date),
          lte: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
        },
      },
      include: {
        Patient: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      ok: true,
      appointments,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'No se pudo obtener las citas. Por favor, inténtelo de nuevo mas tarde.',
      error: 'unknownError',
    };
  }
};
