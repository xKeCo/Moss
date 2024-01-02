'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { usePatientsStore } from '@/hooks';
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

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  dniType: z
    .enum(['', 'CC', 'TI', 'O'])
    .refine((val) => val !== '', 'DNI type is required'),
  dniNumber: z.string().min(8, {
    message: 'DNI number must be at least 8 characters.',
  }),
  email: z.string().email({
    message: 'Email must be a valid email.',
  }),

  basicInformation: z.object({
    gender: z.enum(['', 'M', 'F', 'O']).refine((val) => val !== '', 'Gender is required'),
    bloodType: z
      .enum(['', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'])
      .refine((val) => val !== '', 'Blood type is required'),
    birthDate: z
      .date({
        required_error: 'Birth date is required.',
      })
      .refine((val) => format(val, 'P') !== format(new Date(), 'P'), {
        message: 'Birth date cannot be today.',
      }),
    birthPlace: z.string().min(5, {
      message: 'Birth place must be at least 5 characters.',
    }),
    height: z.string().min(1, {
      message: 'Height is required.',
    }),
    weight: z.string().min(1, {
      message: 'Weight is required.',
    }),
    maritalStatus: z
      .enum(['S', 'C', 'V', 'D', 'M', ''])
      .refine((val) => val !== '', 'Civil status is required'),
    occupation: z.string().min(5, {
      message: 'Occupation must be at least 5 characters.',
    }),
  }),

  contactInformation: z
    .object({
      address: z.string().min(5, {
        message: 'Address must be at least 5 characters.',
      }),
      phone1: z.string().min(10, {
        message: 'Phone must be 10 characters.',
      }),
      phone2: z.union([
        z.string().min(10, {
          message: 'Phone 2 must be 10 characters.',
        }),
        z.literal(''),
      ]),
      emergencyContactName: z.string().min(5, {
        message: 'Emergency contact name must be at least 5 characters.',
      }),
      emergencyContactPhone: z.string().min(10, {
        message: 'Emergency contact phone must be 10 characters.',
      }),
      emergencyContactPhone2: z.union([
        z.string().min(10, {
          message: 'Emergency contact phone 2 must be 10 characters.',
        }),
        z.literal(''),
      ]),
    })
    .refine((data) => data.phone1 !== data.phone2, {
      message: 'Phone 2 cannot be equal to phone 1.',
      path: ['phone2'],
    })
    .refine((data) => data.emergencyContactPhone !== data.emergencyContactPhone2, {
      message: 'Emergency contact phone 2 cannot be equal to emergency contact phone 1.',
      path: ['emergencyContactPhone2'],
    }),

  medicalInformation: z
    .object({
      EPSActive: z.boolean(),
      EPSName: z.string().optional(),
      visitedDoctor: z.boolean(),
      doctorType: z.enum(['', 'G', 'E']).optional(),
      inTreatment: z.boolean(),
      treatment: z.string().optional(),
      boneScan: z.boolean(),
      boneScanType: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.EPSActive && data.EPSName === '') {
          return false;
        }
        return true;
      },
      {
        message: 'EPS name is required if EPS is active.',
        path: ['EPSName'],
      }
    )
    .refine(
      (data) => {
        if (data.visitedDoctor && data.doctorType === '') {
          return false;
        }
        return true;
      },
      {
        message: 'Doctor type is required if visited doctor is true.',
        path: ['doctorType'],
      }
    )
    .refine(
      (data) => {
        if (data.inTreatment && data.treatment === '') {
          return false;
        }
        return true;
      },
      {
        message: 'Treatment is required if in treatment is true.',
        path: ['treatment'],
      }
    )
    .refine(
      (data) => {
        if (data.boneScan && data.boneScanType === '') {
          return false;
        }
        return true;
      },
      {
        message: 'Bone scan type is required if bone scan is true.',
        path: ['boneScanType'],
      }
    ),

  termsAndConditions: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

export const PatientForm = () => {
  const { startSavingPatient } = usePatientsStore();
  const [age, setAge] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dniType: '',
      dniNumber: '',
      email: '',

      basicInformation: {
        gender: '',
        bloodType: '',
        birthDate: new Date(),
        birthPlace: '',
        maritalStatus: '',
        height: '',
        weight: '',
        occupation: '',
      },

      contactInformation: {
        address: '',
        phone1: '',
        phone2: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactPhone2: '',
      },

      medicalInformation: {
        EPSActive: true,
        EPSName: '',
        visitedDoctor: true,
        doctorType: '',
        inTreatment: true,
        treatment: '',
        boneScan: true,
        boneScanType: '',
      },

      termsAndConditions: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startSavingPatient(values);
  }

  const cancelSubmit = () => {
    form.reset();
    router.back();
  };

  const clearEPSNameValue = (EPSActive: boolean) => {
    if (!EPSActive) {
      form.setValue('medicalInformation.EPSName', '');
    }
  };

  const clearDoctorTypeValue = (visitedDoctor: boolean) => {
    if (!visitedDoctor) {
      form.setValue('medicalInformation.doctorType', '');
    }
  };

  const clearTreatmentValue = (inTreatment: boolean) => {
    if (!inTreatment) {
      form.setValue('medicalInformation.treatment', '');
    }
  };

  const clearBoneScanTypeValue = (boneScan: boolean) => {
    if (!boneScan) {
      form.setValue('medicalInformation.boneScanType', '');
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
            name="basicInformation.gender"
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
            name="basicInformation.bloodType"
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
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
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
            name="basicInformation.birthDate"
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
            name="basicInformation.birthPlace"
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
            name="basicInformation.maritalStatus"
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
            name="contactInformation.address"
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
            name="contactInformation.phone1"
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
            name="contactInformation.phone2"
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
            name="basicInformation.height"
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
            name="basicInformation.weight"
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
          name="basicInformation.occupation"
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
            name="medicalInformation.EPSActive"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="medicalInformation.EPSActive">
                  EPS Active
                </FormLabel>
                <Switch
                  id="medicalInformation.EPSActive"
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

          {form.watch('medicalInformation.EPSActive') && (
            <FormField
              control={form.control}
              name="medicalInformation.EPSName"
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
            name="medicalInformation.visitedDoctor"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel
                  className="h-[17px]"
                  htmlFor="medicalInformation.visitedDoctor"
                >
                  Visited a doctor
                </FormLabel>
                <Switch
                  id="medicalInformation.visitedDoctor"
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

          {form.watch('medicalInformation.visitedDoctor') && (
            <FormField
              control={form.control}
              name="medicalInformation.doctorType"
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
            name="medicalInformation.inTreatment"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="medicalInformation.inTreatment">
                  In treatment
                </FormLabel>
                <Switch
                  id="medicalInformation.inTreatment"
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

          {form.watch('medicalInformation.inTreatment') && (
            <FormField
              control={form.control}
              name="medicalInformation.treatment"
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
            name="medicalInformation.boneScan"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-around">
                <FormLabel className="h-[17px]" htmlFor="medicalInformation.boneScan">
                  Bone scan
                </FormLabel>
                <Switch
                  id="medicalInformation.boneScan"
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

          {form.watch('medicalInformation.boneScan') && (
            <FormField
              control={form.control}
              name="medicalInformation.boneScanType"
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
              name="contactInformation.emergencyContactName"
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
              name="contactInformation.emergencyContactPhone"
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
              name="contactInformation.emergencyContactPhone2"
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

        <Button type="button" variant="secondary" className="mr-4" onClick={cancelSubmit}>
          Cancel
        </Button>
        <Button type="submit">Save patient</Button>
      </form>
    </Form>
  );
};
