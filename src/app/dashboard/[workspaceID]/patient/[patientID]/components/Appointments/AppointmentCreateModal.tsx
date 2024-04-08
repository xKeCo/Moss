'use client';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { AppointmentForm } from '@/components';
import type { IAppointment } from '@/interfaces';

interface IAppointmentCreateModalProps {
  activeAppointment: IAppointment | null;
  setActiveAppointment: (appointment: IAppointment | null) => void;
  addOptimisticAppointments: (newAppointments: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AppointmentCreateModal = ({
  activeAppointment = null,
  setActiveAppointment,
  addOptimisticAppointments,
  open,
  setOpen,
}: IAppointmentCreateModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setActiveAppointment(null);
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Crear nueva cita</DialogTitle>
          <DialogDescription>
            Complete los campos para crear una nueva cita para el paciente seleccionado
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          setOpen={setOpen}
          addOptimisticAppointments={addOptimisticAppointments}
          activeAppointment={activeAppointment}
        />
      </DialogContent>
    </Dialog>
  );
};
