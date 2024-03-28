'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { deleteAppointment, sendEmail } from '@/actions';

interface IAppointmentOptionsProps {
  appointment: any;
}

export const AppointmentOptions = ({ appointment }: IAppointmentOptionsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const deletedFile = await deleteAppointment(appointment.id);

    setLoading(false);

    if (!deletedFile.ok) {
      toast.error(deletedFile.errorMessage);
      return;
    }

    if (deletedFile.ok) {
      toast.success(deletedFile.message);
    }

    router.refresh();
  };

  const handleSendEmail = async (e: any) => {
    e.preventDefault();

    setLoadingEmail(true);

    const emailSent = await sendEmail(appointment);

    setLoadingEmail(false);

    if (!emailSent.ok) {
      toast.error(emailSent.errorMessage);
      return;
    }

    if (emailSent.ok) {
      toast.success(emailSent.message);
    }

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsVerticalIcon className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BellIcon className="mr-2 h-4 w-4" />
            <span>Notificar</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                disabled={
                  appointment.emailSent ||
                  new Date(appointment.date).getTime() - new Date().getTime() > 172800000
                }
                onClick={handleSendEmail}
              >
                {loadingEmail ? (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                )}
                {appointment.emailSent ? 'Correo enviado' : 'Enviar correo'}
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

        <DropdownMenuItem>
          <ReloadIcon className="mr-2 h-4 w-4" />
          Reagendar
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
