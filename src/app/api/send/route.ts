import { ConfirmationEmailTemplate } from '@/components';
import { formatDate } from '@/helpers';
import { resend } from '@/lib/resend';

export async function POST(req: Request, res: Response) {
  try {
    const {
      email,
      patientName,
      appointmentDate,
      appointmentID,
      appointmentStartTime,
      appointmentStartTimeAMPM,
      appointmentEndTime,
      appointmentEndTimeAMPM,
    } = await req.json();

    const data = await resend.emails.send({
      from: 'MOSS <no-reply@borealclinicadental.com>',
      to: [email],
      subject: 'Recordatorio de cita odontológica',
      text: `Hola, te recordamos que tienes una cita programada para el día ${formatDate(
        appointmentDate
      )}.`,
      react: ConfirmationEmailTemplate({
        patientName,
        appointmentDate,
        appointmentID,
        appointmentStartTime,
        appointmentStartTimeAMPM,
        appointmentEndTime,
        appointmentEndTimeAMPM,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
