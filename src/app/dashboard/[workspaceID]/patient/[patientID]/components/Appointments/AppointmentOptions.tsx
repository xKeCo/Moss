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
import { deleteAppointment } from '@/actions';

interface IAppointmentOptionsProps {
  id: string;
  emailSent: boolean;
  SMSsent: boolean;
  WhatsAppSent: boolean;
}

export const AppointmentOptions = ({
  id: appointmentId,
  emailSent,
  SMSsent,
  WhatsAppSent,
}: IAppointmentOptionsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const deletedFile = await deleteAppointment(appointmentId);

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
              <DropdownMenuItem disabled={emailSent}>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                {emailSent ? 'Correo enviado' : 'Enviar correo'}
              </DropdownMenuItem>

              <DropdownMenuItem disabled={WhatsAppSent}>
                <ChatBubbleIcon className="mr-2 h-4 w-4" />
                {WhatsAppSent ? 'Whatsapp enviado' : 'Enviar Whatsapp'}
              </DropdownMenuItem>

              <DropdownMenuItem disabled={SMSsent}>
                <PaperPlaneIcon className="mr-2 h-4 w-4" />
                {SMSsent ? 'SMS enviado' : 'Enviar SMS'}
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
