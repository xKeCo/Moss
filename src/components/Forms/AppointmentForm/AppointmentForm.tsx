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
} from '@/components/ui';
import { timeOptions } from '@/helpers';
import { Icons } from '@/components';
import { createAppointment } from '@/actions';

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
  description: z.string().optional(),
  status: z.string(),
  emailSent: z.boolean(),
  SMSsent: z.boolean(),
  WhatsAppSent: z.boolean(),
});

interface IAppointmentFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addOptimisticAppointments: (newAppointments: any) => void;
}

export const AppointmentForm = ({ setOpen, addOptimisticAppointments }: IAppointmentFormProps) => {
  const pathname = usePathname();
  const { patientID } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      doctor: 'Dra. Sandra Peña',
      office: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      treatment: '',
      status: 'pendiente',
      emailSent: false,
      SMSsent: false,
      WhatsAppSent: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const validateEndTime = () => {
    const startTime = form.watch('startTime');
    const endTime = form.watch('endTime');

    const startTimePeriod = startTime?.slice(-2);
    const endTimePeriod = endTime?.slice(-2);

    const startTimeHour = parseInt(startTime?.slice(0, 2));
    const endTimeHour = parseInt(endTime?.slice(0, 2));

    const startTimeMinute = parseInt(startTime?.slice(3, 5));
    const endTimeMinute = parseInt(endTime?.slice(3, 5));

    if (startTimePeriod === 'AM' && endTimePeriod === 'PM') {
      return true;
    }

    if (startTimePeriod === 'PM' && endTimePeriod === 'AM') {
      return false;
    }

    if (startTimePeriod === 'AM' && endTimePeriod === 'AM') {
      return (
        endTimeHour < startTimeHour ||
        (endTimeHour === startTimeHour && endTimeMinute <= startTimeMinute)
      );
    }

    if (startTimePeriod === 'PM' && endTimePeriod === 'PM') {
      return (
        endTimeHour < startTimeHour ||
        (endTimeHour === startTimeHour && endTimeMinute <= startTimeMinute)
      );
    }

    return false;
  };

  const filteredTimeOptions = () => {
    const startTime = form.watch('startTime');
    const startTimePeriod = startTime?.slice(-2);
    const startTimeHour = parseInt(startTime?.slice(0, 2));
    const startTimeMinute = parseInt(startTime?.slice(3, 5));

    return timeOptions().filter((time) =>
      filterTimeOptionsHelper(time, startTimePeriod, startTimeHour, startTimeMinute)
    );
  };

  function filterTimeOptionsHelper(
    time: string,
    startTimePeriod: string,
    startTimeHour: number,
    startTimeMinute: number
  ) {
    const timePeriod = time.slice(-2);
    const timeHour = parseInt(time.slice(0, 2));
    const timeMinute = parseInt(time.slice(3, 5));

    if (startTimePeriod === 'AM' && timePeriod === 'AM') {
      return (
        timeHour > startTimeHour || (timeHour === startTimeHour && timeMinute > startTimeMinute)
      );
    }

    if (startTimePeriod === 'PM' && timePeriod === 'PM') {
      return handlePMTimeOptions(timeHour, timeMinute, startTimeHour, startTimeMinute, timePeriod);
    }

    if (startTimePeriod === 'AM' && timePeriod === 'PM') {
      return true;
    }

    return false;
  }

  function handlePMTimeOptions(
    timeHour: number,
    timeMinute: number,
    startTimeHour: number,
    startTimeMinute: number,
    timePeriod: string
  ) {
    if (startTimeHour === 12) {
      if (timePeriod === 'PM') {
        const twelvesOption =
          timeHour > startTimeHour || (timeHour === startTimeHour && timeMinute > startTimeMinute);

        const restOptions = timeHour >= 1 && timeHour !== 12;

        return [twelvesOption, restOptions].some(Boolean);
      }
    } else {
      return (
        (timeHour !== 12 && timeHour > startTimeHour) ||
        (timeHour === startTimeHour && timeMinute > startTimeMinute)
      );
    }
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    data.date.setHours(0, 0, 0, 0);

    const appointment = await createAppointment(data, patientID as string, pathname);

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
                    if (validateEndTime()) {
                      form.setValue('endTime', '');
                    }
                  }}
                  defaultValue={field.value}
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
                    {filteredTimeOptions().map((time) => (
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
                <Textarea placeholder="Ingrese una descripción" {...field} />
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
