'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { format } from 'date-fns';
import { createPatient } from '@/actions';
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
} from '../ui';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

import { Icons } from '..';
import { useRouter } from 'next/navigation';

type PatientFormData = z.infer<typeof patientFormSchema>;

export const PatientForm = () => {
  const { data: session } = useSession();
  const [age, setAge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      dniNumber: '',
      email: '',

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

    const patient = await createPatient(
      { ...values, Treatment: null },
      session?.user?.workspaces[0].id!
    );

    setIsLoading(false);

    if (!patient?.ok) {
      if (patient?.error === 'patientExists') {
        form.setError('dniNumber', {
          type: 'manual',
          message: 'Patient id already exists. Please try another one.',
        });
      }

      return toast.error(patient?.errorMessage);
    }

    router.replace(`/dashboard`);
    toast.success('Patient created successfully!');
    form.reset();
  }

  const cancelSubmit = () => {
    form.reset();
    router.replace(`/dashboard`);
  };

  const clearEPSNameValue = (EPSActive: boolean) => {
    if (!EPSActive) {
      form.setValue('MedicalInformation.EPSName', '');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-4 gap-4 mt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" autoComplete="name" {...field} />
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
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
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
                <FormLabel>Blood type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
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
                <FormLabel className="h-[17px] mt-[6px]">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? (
                          format(field.value, 'P')
                        ) : (
                          <span>Pick a date</span>
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
                      onSelect={(date) => {
                        field.onChange(date);
                        setAge(new Date().getFullYear() - date!.getFullYear());
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
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

          <Input placeholder="Age" value={age} disabled endDecorator="years" />

          <FormField
            control={form.control}
            name="BasicInformation.birthPlace"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Place of birth</FormLabel>
                <FormControl>
                  <Input placeholder="Place of birth" {...field} />
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
                <FormLabel>DNI Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select DNI" />
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
                <FormLabel>DNI Number</FormLabel>
                <FormControl>
                  <Input placeholder="DNI Number" {...field} />
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
                <FormLabel>Civil Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Civil Status" />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" autoComplete="email" {...field} />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone" {...field} maxLength={10} />
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
                <FormLabel>Phone 2</FormLabel>
                <FormControl>
                  <Input placeholder="(optional)" {...field} maxLength={10} />
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
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Height"
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
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Weight"
                    {...field}
                    endDecorator="kg"
                    maxLength={3}
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
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Occupation" {...field} />
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
                  EPS Active
                </FormLabel>
                <Switch
                  id="MedicalInformation.EPSActive"
                  checked={field.value}
                  onCheckedChange={(value: boolean) => {
                    field.onChange(value);
                    clearEPSNameValue(value);
                  }}
                  className="mt-2 flex items-end"
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
                  <FormLabel>EPS Name</FormLabel>
                  <FormControl>
                    <Input placeholder="EPS Name" {...field} />
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
                <FormLabel
                  className="h-[17px]"
                  htmlFor="MedicalInformation.visitedDoctor"
                >
                  Visited a doctor
                </FormLabel>
                <Switch
                  id="MedicalInformation.visitedDoctor"
                  checked={field.value}
                  onCheckedChange={(doctorType: boolean) => {
                    field.onChange(doctorType);
                    clearDoctorTypeValue(doctorType);
                  }}
                  className="mt-2 flex items-end"
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
                  <FormLabel>Doctor type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Doctor type" />
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
                  In treatment
                </FormLabel>
                <Switch
                  id="MedicalInformation.inTreatment"
                  checked={field.value}
                  onCheckedChange={(inTreatment: boolean) => {
                    field.onChange(inTreatment);
                    clearTreatmentValue(inTreatment);
                  }}
                  className="mt-2 flex items-end"
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
                  <FormLabel>Treatment</FormLabel>
                  <FormControl>
                    <Input placeholder="Treatment" {...field} />
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
                  Bone scan
                </FormLabel>
                <Switch
                  id="MedicalInformation.boneScan"
                  checked={field.value}
                  onCheckedChange={(boneScan: boolean) => {
                    field.onChange(boneScan);
                    clearBoneScanTypeValue(boneScan);
                  }}
                  className="mt-2 flex items-end"
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
                  <FormLabel>Bone scan type</FormLabel>
                  <FormControl>
                    <Input placeholder="Bone scan type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1>Emergency contact information</h1>

          <div className="gap-4 grid sm:grid-cols-4">
            <FormField
              control={form.control}
              name="ContactInformation.emergencyContactName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone" {...field} maxLength={10} />
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
                  <FormLabel>Phone 2</FormLabel>
                  <FormControl>
                    <Input placeholder="(optional)" {...field} maxLength={10} />
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
                />
              </FormControl>
              <TermsAndConditionsModal />
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
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Save patient
          {isLoading && <Icons.Spinner className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
