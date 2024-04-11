'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { filteredTimeOptions, timeOptions, validateEndTime } from '@/helpers';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Icons } from '@/components';
import { confirmAppointment, updateAppointment } from '@/actions';

interface IConfirmationButtonsProps {
  appointmentID: string;
}

const FormSchema = z.object({
  suggestedDate: z.date({
    required_error: 'Fecha de cita es requerida.',
  }),
  suggestedStartTime: z.string().min(1, {
    message: 'Requerido.',
  }),
  suggestedEndTime: z.string().min(1, {
    message: 'Requerido.',
  }),
});

export const ConfirmationButtons = ({ appointmentID }: IConfirmationButtonsProps) => {
  const [reschedule, setReschedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      suggestedDate: new Date(),
      suggestedStartTime: '',
      suggestedEndTime: '',
    },
  });

  const handleConfirmAppointment = async () => {
    setLoading(true);

    const confirm = await confirmAppointment(
      appointmentID,
      'confirmada',
      '/confirmation/appointment/[appointmentID]'
    );

    if (!confirm.ok) {
      return toast.error(confirm.errorMessage);
    }

    setLoading(false);
    toast.success('Cita confirmada');
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setRescheduleLoading(true);
    data.suggestedDate.setHours(0, 0, 0, 0);

    const updatedAppointment = await updateAppointment(
      data,
      appointmentID,
      '/confirmation/appointment/[appointmentID]',
      'modificar'
    );

    console.log(data);

    setRescheduleLoading(false);

    if (!updatedAppointment?.ok) {
      return toast.error(updatedAppointment?.errorMessage);
    }

    toast.success('La sugerencia de cita ha sido enviada correctamente.');
  }

  return (
    <>
      <div
        className={cn(
          'flex flex-col-reverse min-[425px]:flex-row items-center justify-between gap-4 mt-6'
        )}
      >
        <Button
          variant="secondary"
          onClick={() => setReschedule(!reschedule)}
          className="max-[425px]:w-full"
          disabled={loading || rescheduleLoading}
        >
          Reprogramar
        </Button>

        <Button
          className="bg-[#5e6ad2] hover:bg-[#5e6ad2]/85 w-full"
          onClick={handleConfirmAppointment}
          disabled={loading || rescheduleLoading}
        >
          {loading && <Icons.Spinner className="h-4 w-4 animate-spin mr-2" />}
          Asistiré
        </Button>
      </div>

      {reschedule && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <h1 className="text-sm mt-6 mb-4">
              Seleccione una posible fecha y hora para reprogramar la cita:
            </h1>

            <div className="flex items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="suggestedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col col-span-2 sm:col-span-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={'outline'} disabled={rescheduleLoading}>
                              {field.value ? (
                                format(field.value, 'P')
                              ) : (
                                <span>Seleccione una fecha</span>
                              )}
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
                            disabled={(date) => date < new Date()}
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
                  name="suggestedStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (
                            validateEndTime(
                              form.watch('suggestedStartTime'),
                              form.watch('suggestedEndTime')
                            )
                          ) {
                            form.setValue('suggestedEndTime', '');
                          }
                        }}
                        defaultValue={field.value}
                        disabled={rescheduleLoading}
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
                  name="suggestedEndTime"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={form.watch('suggestedStartTime') === '' || rescheduleLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hasta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredTimeOptions(form.watch('suggestedStartTime')).map((time) => (
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

              <Button
                type="submit"
                size="icon"
                className="min-w-9"
                disabled={loading || rescheduleLoading}
              >
                {rescheduleLoading ? (
                  <Icons.Spinner className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckIcon className="h-4 w-4 " />
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
