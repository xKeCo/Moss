'use client';
import { useState } from 'react';
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
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { timeOptions } from '@/helpers';
import { Icons } from '@/components';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createAppointment } from '@/actions';
import { useParams, useRouter } from 'next/navigation';

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

export const AppointmentForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const params = useParams();

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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const appointment = await createAppointment(data, params.patientID as string);

    setLoading(false);

    if (!appointment?.ok) {
      return toast.error(appointment?.errorMessage);
    }

    setOpen(false);
    toast.success('Cita creada exitosamente.');
    router.refresh();
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Hasta" />
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
