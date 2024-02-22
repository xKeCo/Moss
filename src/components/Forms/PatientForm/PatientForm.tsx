'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { format } from 'date-fns';
import { createPatient, navigate } from '@/actions';
import { patientFormSchema } from '@/lib/validations';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Checkbox,
  Textarea,
} from '@/components/ui';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { Icons } from '@/components/Icons/Icons';

type PatientFormData = z.infer<typeof patientFormSchema>;

export const PatientForm = ({ isLoadingPage = false }: { isLoadingPage?: boolean }) => {
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      dniNumber: '',
      email: '',
      reasonForConsultation: '',
      currentIllness: '',

      BasicInformation: {
        birthDate: new Date(),
        birthPlace: '',
        height: '',
        weight: '',
        occupation: '',
      },

      ContactInformation: {
        address: '',
        phone1: '',
        phone2: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactPhone2: '',
      },

      MedicalInformation: {
        EPSActive: true,
        EPSName: '',
        visitedDoctor: true,
        inTreatment: true,
        treatmentName: '',
        boneScan: true,
        boneScanType: '',
      },

      termsAndConditions: false,
    },
  });

  async function onSubmit(values: PatientFormData) {
    setIsLoading(true);

    const patient = await createPatient({ ...values, Treatment: null });

    setIsLoading(false);

    if (!patient?.ok) {
      if (patient?.error === 'patientExists') {
        form.setError('dniNumber', {
          type: 'manual',
          message: 'El paciente ya existe. Por favor, intente con otro.',
        });
      }

      return toast.error(patient?.errorMessage);
    }

    await navigate(`/dashboard`);
    toast.success('Paciente creado correctamente.');
    form.reset();
  }

  const cancelSubmit = () => {
    form.reset();
    router.push(`/dashboard`);
  };

  const clearEPSNameValue = (EPSActive: boolean) => {
    if (!EPSActive) {
      form.setValue('MedicalInformation.EPSName', 'NO TIENE EPS');
    }
  };

  const clearDoctorTypeValue = (visitedDoctor: boolean) => {
    if (!visitedDoctor) {
      form.setValue('MedicalInformation.doctorType', undefined);
    }
  };

  const clearTreatmentValue = (inTreatment: boolean) => {
    if (!inTreatment) {
      form.setValue('MedicalInformation.treatmentName', '');
    }
  };

  const clearBoneScanTypeValue = (boneScan: boolean) => {
    if (!boneScan) {
      form.setValue('MedicalInformation.boneScanType', '');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-4 gap-4 mt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="Nombre completo"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BasicInformation.gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar genero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BasicInformation.bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de sangre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de sangre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="O_POSITIVE">O+</SelectItem>
                    <SelectItem value="O_NEGATIVE">O-</SelectItem>
                    <SelectItem value="A_POSITIVE">A+</SelectItem>
                    <SelectItem value="A_NEGATIVE">A-</SelectItem>
                    <SelectItem value="B_POSITIVE">B+</SelectItem>
                    <SelectItem value="B_NEGATIVE">B-</SelectItem>
                    <SelectItem value="AB_POSITIVE">AB+</SelectItem>
                    <SelectItem value="AB_NEGATIVE">AB-</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="gap-4 grid sm:grid-cols-4 lg:grid-cols-8">
          <FormField
            control={form.control}
            name="BasicInformation.birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="h-[17px] mt-[6px]">Fecha de nacimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'} disabled={isLoadingPage}>
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
                      onSelect={(date) => {
                        field.onChange(date);
                        setAge(new Date().getFullYear() - date!.getFullYear());
                      }}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input disabled placeholder="Edad" value={age} endDecorator="años" />

          <FormField
            control={form.control}
            name="BasicInformation.birthPlace"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Lugar de nacimiento</FormLabel>
                <FormControl>
                  <Input disabled={isLoadingPage} placeholder="Lugar de nacimiento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dniType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de documento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CC">CC</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="O">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dniNumber"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Número de documento</FormLabel>
                <FormControl>
                  <Input disabled={isLoadingPage} placeholder="Número de documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BasicInformation.maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado civil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="S">Soltero</SelectItem>
                    <SelectItem value="C">Casado</SelectItem>
                    <SelectItem value="U">Union Libre</SelectItem>
                    <SelectItem value="D">Divorsid@</SelectItem>
                    <SelectItem value="V">Viud@</SelectItem>
                    <SelectItem value="M">Menor de edad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="gap-4 grid sm:grid-cols-4 lg:grid-cols-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ContactInformation.address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input disabled={isLoadingPage} placeholder="Dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ContactInformation.phone1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="Teléfono"
                    {...field}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ContactInformation.phone2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono 2</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="(optional)"
                    {...field}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BasicInformation.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="Altura"
                    {...field}
                    endDecorator="cm"
                    maxLength={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="BasicInformation.weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingPage}
                    placeholder="Peso"
                    endDecorator="kg"
                    maxLength={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="BasicInformation.occupation"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Ocupación</FormLabel>
              <FormControl>
                <Input disabled={isLoadingPage} placeholder="Ocupación" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="gap-4 grid sm:grid-cols-6 lg:grid-cols-6">
          <FormField
            control={form.control}
            name="MedicalInformation.EPSActive"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="MedicalInformation.EPSActive">
                  ¿Tiene EPS activa?
                </FormLabel>
                <Switch
                  id="MedicalInformation.EPSActive"
                  checked={field.value}
                  onCheckedChange={(value: boolean) => {
                    field.onChange(value);
                    clearEPSNameValue(value);
                  }}
                  className="mt-2 flex items-end"
                  disabled={isLoadingPage}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('MedicalInformation.EPSActive') && (
            <FormField
              control={form.control}
              name="MedicalInformation.EPSName"
              render={({ field }) => (
                <FormItem className="sm:col-span-5 lg:col-span-2">
                  <FormLabel>Nombre de la EPS</FormLabel>
                  <FormControl>
                    <Input disabled={isLoadingPage} placeholder="Nombre de la EPS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="MedicalInformation.visitedDoctor"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="MedicalInformation.visitedDoctor">
                  ¿Ha visitado al médico recientemente?
                </FormLabel>
                <Switch
                  id="MedicalInformation.visitedDoctor"
                  checked={field.value}
                  onCheckedChange={(doctorType: boolean) => {
                    field.onChange(doctorType);
                    clearDoctorTypeValue(doctorType);
                  }}
                  className="mt-2 flex items-end"
                  disabled={isLoadingPage}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('MedicalInformation.visitedDoctor') && (
            <FormField
              control={form.control}
              name="MedicalInformation.doctorType"
              render={({ field }) => (
                <FormItem className="sm:col-span-5 lg:col-span-2">
                  <FormLabel>Tipo de médico</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingPage}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de médico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="G">General</SelectItem>
                      <SelectItem value="E">Especialista</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="gap-4 grid sm:grid-cols-6 lg:grid-cols-6">
          <FormField
            control={form.control}
            name="MedicalInformation.inTreatment"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="MedicalInformation.inTreatment">
                  ¿Se encuentra en tratamiento?
                </FormLabel>
                <Switch
                  id="MedicalInformation.inTreatment"
                  checked={field.value}
                  onCheckedChange={(inTreatment: boolean) => {
                    field.onChange(inTreatment);
                    clearTreatmentValue(inTreatment);
                  }}
                  className="mt-2 flex items-end"
                  disabled={isLoadingPage}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('MedicalInformation.inTreatment') && (
            <FormField
              control={form.control}
              name="MedicalInformation.treatmentName"
              render={({ field }) => (
                <FormItem className="sm:col-span-5 lg:col-span-2">
                  <FormLabel>Tratamiento</FormLabel>
                  <FormControl>
                    <Input disabled={isLoadingPage} placeholder="Tratamiento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="MedicalInformation.boneScan"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="MedicalInformation.boneScan">
                  ¿Se ha realizado una radiografía?
                </FormLabel>
                <Switch
                  id="MedicalInformation.boneScan"
                  checked={field.value}
                  onCheckedChange={(boneScan: boolean) => {
                    field.onChange(boneScan);
                    clearBoneScanTypeValue(boneScan);
                  }}
                  className="mt-2 flex items-end"
                  disabled={isLoadingPage}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('MedicalInformation.boneScan') && (
            <FormField
              control={form.control}
              name="MedicalInformation.boneScanType"
              render={({ field }) => (
                <FormItem className="sm:col-span-5 lg:col-span-2">
                  <FormLabel>Tipo de radiografía</FormLabel>
                  <FormControl>
                    <Input disabled={isLoadingPage} placeholder="Tipo de radiografía" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Contacto de emergencia</h1>
          <div className="h-[2px] bg-secondary"></div>

          <div className="gap-4 grid sm:grid-cols-4">
            <FormField
              control={form.control}
              name="ContactInformation.emergencyContactName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input disabled={isLoadingPage} placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ContactInformation.emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingPage}
                      placeholder="Teléfono"
                      {...field}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ContactInformation.emergencyContactPhone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingPage}
                      placeholder="(optional)"
                      {...field}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Anamnesis</h1>
          <div className="h-[2px] bg-secondary"></div>

          <div className="gap-4 grid sm:grid-cols-2">
            <FormField
              control={form.control}
              name="reasonForConsultation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo de consulta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese el motivo de consulta"
                      className="resize-none"
                      {...field}
                      disabled={isLoadingPage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentIllness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enfermedad actual</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la enfermedad actual"
                      className="resize-none"
                      {...field}
                      disabled={isLoadingPage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="termsAndConditions"
                  disabled={isLoadingPage}
                />
              </FormControl>
              <TermsAndConditionsModal
                fullName={form.getValues('name')}
                dniType={form.getValues('dniType')}
                dniNumber={form.getValues('dniNumber')}
              />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="secondary"
          className="mr-4"
          onClick={cancelSubmit}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          Guardar información
          {isLoading && <Icons.Spinner className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
