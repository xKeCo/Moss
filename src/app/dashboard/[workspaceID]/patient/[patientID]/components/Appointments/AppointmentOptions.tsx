'use client';
import { startTransition, useOptimistic, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import {
  BellIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  ReloadIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Icons } from '@/components';
import { deleteAppointment, sendConfirmationEmail } from '@/actions';
import type { IAppointment } from '@/interfaces';

interface IAppointmentOptionsProps {
  appointment: any;
  deleteOptimisticAppointment: (appointmentID: string) => void;
  setActiveAppointment: (appointment: IAppointment) => void;
  setOpen: (open: boolean) => void;
}

export const AppointmentOptions = ({
  appointment,
  deleteOptimisticAppointment,
  setActiveAppointment,
  setOpen,
}: IAppointmentOptionsProps) => {
  const FORTYEIGHTHOURS = new Date(appointment.date).getTime() - new Date().getTime() < 172800000;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false);
  const [sendEmail, setSendEmail] = useOptimistic<boolean, boolean>(
    appointment.emailSent,
    () => true
  );

  const pathname = usePathname();

  const handleDelete = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const deletedAppointment = await deleteAppointment(appointment.id, pathname);

    setLoading(false);

    if (!deletedAppointment.ok) {
      toast.error(deletedAppointment.errorMessage);
      return;
    }

    toast.success(deletedAppointment.message);

    startTransition(() => deleteOptimisticAppointment(appointment.id));
  };

  const handleSendEmail = async (e: any) => {
    e.preventDefault();

    setLoadingEmail(true);

    const emailSent = await sendConfirmationEmail(appointment, pathname);

    setLoadingEmail(false);

    if (!emailSent.ok) {
      toast.error(emailSent.errorMessage);
      return;
    }

    toast.success(emailSent.message);

    startTransition(() => setSendEmail(true));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsVerticalIcon className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {FORTYEIGHTHOURS && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <BellIcon className="mr-2 h-4 w-4" />
              <span>Notificar</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled={sendEmail} onClick={handleSendEmail}>
                  {loadingEmail ? (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                  )}
                  {sendEmail ? 'Correo enviado' : 'Enviar correo'}
                </DropdownMenuItem>

                <DropdownMenuItem disabled={appointment.WhatsAppSent}>
                  <ChatBubbleIcon className="mr-2 h-4 w-4" />
                  {appointment.WhatsAppSent ? 'Whatsapp enviado' : 'Enviar Whatsapp'}
                </DropdownMenuItem>

                <DropdownMenuItem disabled={appointment.SMSsent}>
                  <PaperPlaneIcon className="mr-2 h-4 w-4" />
                  {appointment.SMSsent ? 'SMS enviado' : 'Enviar SMS'}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}

        <DropdownMenuItem
          onClick={() => {
            setActiveAppointment(appointment);
            setOpen(true);
          }}
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          Modificar
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleDelete}>
          {loading ? (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon className="mr-2 h-4 w-4" />
          )}
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
