'use client';
import { startTransition, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CalendarIcon } from '@radix-ui/react-icons';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { filteredTimeOptions, formatEmailDate, timeOptions, validateEndTime } from '@/helpers';
import { Icons } from '@/components';
import { createAppointment } from '@/actions';
import type { IAppointment } from '@/interfaces';

const FormSchema = z.object({
  doctor: z.string().min(1, {
    message: 'Doctor es requerido.',
  }),
  office: z.string().min(1, {
    message: 'Consultorio es requerido.',
  }),
  date: z.date({
    required_error: 'Fecha de cita es requerida.',
  }),
  startTime: z.string().min(1, {
    message: 'Hora de inicio es requerida.',
  }),
  endTime: z.string().min(1, {
    message: 'Hora de fin es requerida.',
  }),
  treatment: z.string().min(4, {
    message: 'Tratamiento debe tener al menos 4 caracteres.',
  }),
  description: z.string().nullish(),
  status: z.string(),
  emailSent: z.boolean(),
  SMSsent: z.boolean(),
  WhatsAppSent: z.boolean(),
});

interface IAppointmentFormProps {
  setOpen: (open: boolean) => void;
  addOptimisticAppointments: (newAppointments: any) => void;
  activeAppointment: IAppointment | null;
}

export const AppointmentForm = ({
  setOpen,
  addOptimisticAppointments,
  activeAppointment = null,
}: IAppointmentFormProps) => {
  const pathname = usePathname();
  const { patientID, workspaceID } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doctor: 'Dra. Sandra Peña',
      office: activeAppointment ? activeAppointment.office : '',
      date: activeAppointment ? new Date(activeAppointment.date) : new Date(),
      startTime: activeAppointment
        ? `${activeAppointment.startTime}${activeAppointment.startTimeAMPM}`
        : '',
      endTime: activeAppointment
        ? `${activeAppointment.endTime}${activeAppointment.endTimeAMPM}`
        : '',
      treatment: activeAppointment ? activeAppointment.treatment : '',
      description: activeAppointment ? activeAppointment.description : undefined,
      status: activeAppointment ? activeAppointment.status : 'pendiente',
      emailSent: activeAppointment ? activeAppointment.emailSent : false,
      SMSsent: activeAppointment ? activeAppointment.SMSsent : false,
      WhatsAppSent: activeAppointment ? activeAppointment.WhatsAppSent : false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    data.date.setHours(0, 0, 0, 0);

    const appointment = await createAppointment(
      data,
      patientID as string,
      workspaceID as string,
      pathname,
      activeAppointment?.id
    );

    setLoading(false);

    if (!appointment?.ok) {
      return toast.error(appointment?.errorMessage);
    }

    startTransition(() => {
      addOptimisticAppointments(appointment.appointment);
    });

    setOpen(false);
    toast.success('Cita creada exitosamente.');
  }

  const acceptSuggestedDate = () => {
    if (!activeAppointment) return;

    form.setValue('date', new Date(activeAppointment.suggestedDate!));
    form.setValue(
      'startTime',
      `${activeAppointment.suggestedStartTime}${activeAppointment.suggestedStartTimeAMPM}`
    );
    form.setValue(
      'endTime',
      `${activeAppointment.suggestedEndTime}${activeAppointment.suggestedEndTimeAMPM}`
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="doctor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doctor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un doctor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dra. Sandra Peña">Dra. Sandra Peña</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="office"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consultorio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un consultorio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Consultorio 1">Consultorio 1</SelectItem>
                    <SelectItem value="Consultorio 2">Consultorio 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {activeAppointment?.suggestedDate && (
            <TooltipProvider>
              <Tooltip delayDuration={350}>
                <TooltipTrigger asChild onClick={acceptSuggestedDate}>
                  <div className="flex flex-col items-start justify-center gap-2 sm:col-span-3 bg-zinc-100 hover:bg-muted-foreground/20 transition-colors p-2 rounded-lg cursor-pointer">
                    <p className="text-sm text-muted-foreground font-medium">
                      Fecha y hora sugerida por el paciente:
                    </p>
                    <p className="text-sm text-muted-foreground capitalize font-semibold">
                      {formatEmailDate(activeAppointment.suggestedDate)}.{' '}
                      {activeAppointment.suggestedStartTime}
                      {activeAppointment.suggestedStartTimeAMPM} -{' '}
                      {activeAppointment.suggestedEndTime}
                      {activeAppointment.suggestedEndTimeAMPM}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>De click para aceptar la fecha y hora sugerida por el paciente.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="h-[17px] mt-[6px]">Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? format(field.value, 'P') : <span>Seleccione una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      required
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear() + 5}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inicio</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (validateEndTime(form.watch('startTime'), form.watch('endTime'))) {
                      form.setValue('endTime', '');
                    }
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Desde" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={form.watch('startTime') === ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Hasta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredTimeOptions(form.watch('startTime')).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tratamiento</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el tratamiento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Descripción del tratamiento{' '}
                <span className="text-xs text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese una descripción"
                  {...field}
                  value={field.value ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex flex-row justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Icons.Spinner className="mr-2 h-5 w-5 animate-spin" />}
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};
