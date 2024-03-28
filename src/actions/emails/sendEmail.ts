'use server';
import prisma from '@/lib/prisma';

export const sendEmail = async (appointment: any) => {
  try {
    // get patient email from appointment patientId
    const patient = await prisma.patient.findUnique({
      where: {
        id: appointment.patientId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    await fetch(`${process.env.ENVIRONMENT_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: patient?.email,
        patientName: patient?.name,
        appointmentDate: appointment.date,
        appointmentStartTime: appointment.startTime,
        appointmentStartTimeAMPM: appointment.startTimeAMPM,
        appointmentEndTime: appointment.endTime,
        appointmentEndTimeAMPM: appointment.endTimeAMPM,
      }),
    });

    const emailSent = await prisma.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        emailSent: true,
      },
    });

    return {
      ok: true,
      emailSent,
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
