'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createAppointment = async (
  appointmentData: any,
  patientId: string,
  workspaceId: string,
  pathname: string,
  activeAppointmentId?: string
) => {
  try {
    let appointment = null;

    if (activeAppointmentId) {
      appointment = await prisma.appointment.update({
        where: {
          id: activeAppointmentId,
        },
        data: {
          ...appointmentData,
          startTime: appointmentData.startTime.slice(0, 5),
          startTimeAMPM: appointmentData.startTime.slice(-2),
          endTime: appointmentData.endTime.slice(0, 5),
          endTimeAMPM: appointmentData.endTime.slice(-2),

          suggestedDate: null,
          suggestedStartTime: null,
          suggestedStartTimeAMPM: null,
          suggestedEndTime: null,
          suggestedEndTimeAMPM: null,
          status: 'pendiente',
          statusChanged: false,
          emailSent: false,
          SMSsent: false,
          WhatsAppSent: false,
        },
      });
    } else {
      appointment = await prisma.appointment.create({
        data: {
          ...appointmentData,
          startTime: appointmentData.startTime.slice(0, 5),
          startTimeAMPM: appointmentData.startTime.slice(-2),
          endTime: appointmentData.endTime.slice(0, 5),
          endTimeAMPM: appointmentData.endTime.slice(-2),
          patientId,
          workspaceId,
        },
      });
    }

    revalidatePath(pathname);

    return {
      ok: true,
      appointment,
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
