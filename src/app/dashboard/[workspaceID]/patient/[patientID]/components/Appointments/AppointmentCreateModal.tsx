'use client';
import { useState } from 'react';
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

export const AppointmentCreateModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Crear nueva cita</DialogTitle>
          <DialogDescription>
            Complete los campos para crear una nueva cita para el paciente seleccionado
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};