import { NotFound } from '@/components';
import { getAppointment } from '@/actions';
import { formatEmailDate } from '@/helpers';
import { ConfirmationButtons } from './components/ConfirmationButtons';

interface IAppointmentConfirmationProps {
  params: {
    appointmentID: string;
  };
}

export default async function AppointmentConfirmation({
  params: { appointmentID },
}: Readonly<IAppointmentConfirmationProps>) {
  const { appointment, ok, errorMessage } = await getAppointment(appointmentID);

  const appointmentDetails = [
    {
      title: 'Fecha',
      value: formatEmailDate(appointment?.date),
    },
    {
      title: 'Hora',
      value: `${appointment?.startTime}${appointment?.startTimeAMPM} - ${appointment?.endTime}${appointment?.endTimeAMPM}`,
    },
  ];

  if (!ok) {
    return <NotFound errorMessage={errorMessage} redirectPath="/" redirectText="Ir al inicio" />;
  }

  return (
    <div className="flex justify-center items-center w-dvw h-dvh p-4">
      <div className="absolute inset-0 bg-gradient-radial from-[#5e6ad2] to-black z-0"></div>
      <div className="rounded-lg px-7 py-12 w-full max-w-[556px] bg-white shadow-md text-gray-800 font-medium text-lg z-10">
        {appointment?.statusChanged ? (
          <h1 className="text-xl text-center font-semibold">
            El estado de esta cita ya ha sido actualizado.
          </h1>
        ) : (
          <>
            <h1 className="text-xl font-bold text-center mb-6">Información de cita</h1>

            <h2 className="text-lg font-bold mb-4">Hola {appointment?.Patient.name},</h2>

            <p className="text-base">
              Tu cita ha sido confirmada. A continuación, encontrarás todos los detalles de la cita.
            </p>

            <div className="grid sm:grid-cols-2 items-start justify-start gap-4 mt-5">
              {appointmentDetails.map((detail) => (
                <div className="flex flex-col items-start justify-center" key={detail.title}>
                  <h3 className="text-sm font-bold">{detail.title}</h3>
                  <p className="capitalize text-base">{detail.value}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold mt-8">
              Por favor, confirma tu asistencia a la cita.
            </h3>

            <ConfirmationButtons appointmentID={appointmentID} />
          </>
        )}
      </div>
    </div>
  );
}
