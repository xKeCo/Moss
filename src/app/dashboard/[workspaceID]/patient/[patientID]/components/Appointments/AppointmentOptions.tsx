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
import {
  BellIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  ReloadIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

interface IAppointmentOptionsProps {
  emailSent: boolean;
  SMSsent: boolean;
  WhatsAppSent: boolean;
}

export const AppointmentOptions = ({
  emailSent,
  SMSsent,
  WhatsAppSent,
}: IAppointmentOptionsProps) => {
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

        <DropdownMenuItem>
          <TrashIcon className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
