'use server';
import prisma from '@/lib/prisma';
import type { IAppointment } from '@/interfaces';

export const sendConfirmationEmail = async (appointment: IAppointment) => {
  try {
    const body = JSON.stringify({
      email: appointment?.Patient.email,
      patientName: appointment?.Patient.name,
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
        'Content-Length': Buffer.byteLength(body, 'utf8').toString(),
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
