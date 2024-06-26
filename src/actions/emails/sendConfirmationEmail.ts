'use server';
import prisma from '@/lib/prisma';
import type { IAppointment } from '@/interfaces';
import { revalidatePath } from 'next/cache';

export const sendConfirmationEmail = async (appointment: IAppointment, pathname: string) => {
  try {
    const body = JSON.stringify({
      email: appointment?.Patient.email,
      patientName: appointment?.Patient.name,
      appointmentID: appointment.id,
      appointmentDate: appointment.date,
      appointmentStartTime: appointment.startTime,
      appointmentStartTimeAMPM: appointment.startTimeAMPM,
      appointmentEndTime: appointment.endTime,
      appointmentEndTimeAMPM: appointment.endTimeAMPM,
    });

    await fetch(`${process.env.ENVIRONMENT_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        emailSent: true,
      },
    });

    revalidatePath(pathname);

    return {
      ok: true,
      message: 'Email enviado correctamente',
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      errorMessage: 'Error al enviar el correo',
    };
  }
};
