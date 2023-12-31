'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  DialogFooter,
  Checkbox,
  DialogClose,
} from '../ui';
import { usePatientsStore } from '@/hooks';
import { useState } from 'react';

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Phone 2 cannot be equal to phone
    // if (values.phone === values.phone2) {
    //   form.setError('phone2', {
    //     type: 'manual',
    //     message: 'Phone 2 cannot be equal to phone 1.',
    //   });
    //   return;
    // }

    console.log(values);

    startSavingPatient(values);
  }

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
                  <Input placeholder="Full name" {...field} />
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
                  <Input placeholder="Email" {...field} />
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
                <FormLabel className="h-[17px]">EPS Active</FormLabel>
                <Switch
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
                <FormLabel className="h-[17px]">Visited a doctor</FormLabel>
                <Switch
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
                <FormLabel className="h-[17px]">In treatment</FormLabel>
                <Switch
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
                <FormLabel className="h-[17px]">Bone scan</FormLabel>
                <Switch
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
              <Dialog>
                <div className="grid gap-1.5 leading-none">
                  <Label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    htmlFor="termsAndConditions"
                  >
                    Accept terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our{' '}
                    <DialogTrigger asChild>
                      <span className="font-semibold cursor-pointer hover:text-muted-foreground/80">
                        Terms of Service and Privacy Policy.
                      </span>
                    </DialogTrigger>
                  </p>
                  <FormMessage />
                </div>
                <DialogContent className="mb-4">
                  <DialogHeader>
                    <DialogTitle>
                      CONSENTIMIENTO INFORMADO PARA LA PRACTICA DE INTERVENCIONES Y
                      PROCEDIMIENTOS CLINICOS ODONTOLOGICOS
                    </DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[420px] overflow-y-auto no-scrollbar space-y-2">
                    <p>
                      Por medio de la presente declaración, en mi calidad de paciente,
                      reconozco lo siguiente:
                    </p>
                    <ul className="list-disc list-inside ">
                      <li>
                        He recibido información clara y detallada sobre mi condición
                        odontológica que afecta mi salud bucal.
                      </li>
                      <li>
                        Se me ha comunicado de manera clara y detallada que la condición
                        odontológica respectiva requiere el procedimiento odontológico o
                        intervención quirúrgica correspondiente.
                      </li>
                      <li>
                        Estoy plenamente informado/a acerca de los riesgos asociados con
                        el procedimiento odontológico o intervención quirúrgica que se
                        llevará a cabo. Estos riesgos incluyen, entre otros,
                        complicaciones inherentes a cualquier procedimiento clínico, como
                        el uso de instrumental, medicamentos, inflamación, sensibilidad,
                        sangrado, dolor, adormecimiento de labios, lengua, mentón, encía y
                        dientes, reacciones a inyecciones, cambios en la oclusión
                        (mordida), espasmos en la mandíbula y músculos, dificultades en la
                        articulación temporomandibular, movilidad dental, corona o puentes
                        existentes, dolor referido al oído, cuello y cabeza, náuseas,
                        vómitos, reacciones alérgicas, cicatrización tardía, perforación
                        de senos maxilares, fractura de dientes, corona o raíz de compleja
                        resolución.
                      </li>
                      <li>
                        Autorizo que el procedimiento odontológico o intervención
                        quirúrgica, así como cualquier procedimiento necesario para
                        abordar situaciones imprevisibles, riesgos o complicaciones
                        derivadas directa o indirectamente del procedimiento inicial, sean
                        realizados por el/la doctor(a) y el personal profesional que
                        consideren necesario.
                      </li>
                      <li>
                        Autorizo que el procedimiento odontológico o intervención
                        quirúrgica, así como cualquier procedimiento necesario para
                        abordar situaciones imprevisibles, riesgos o complicaciones
                        derivadas directa o indirectamente del procedimiento inicial, sean
                        realizados por el/la doctor(a) y el personal profesional que
                        consideren necesario.
                      </li>
                      <li>
                        Concedo mi consentimiento para que la anestesia sea administrada
                        por el odontólogo y los autorizo a utilizar el tipo de anestesia
                        que consideren más apropiado según mi condición clínica y el tipo
                        de intervención necesaria. He sido debidamente informado/a por
                        el/la doctor(a) de odontología sobre los riesgos asociados con la
                        aplicación de anestesia, según consta en mi historia clínica.
                      </li>
                      <li>
                        Me comprometo a seguir las indicaciones del profesional y del
                        personal de odontología en cuanto a los cuidados pre y post
                        procedimiento, con el fin de restablecer mi salud bucal. Asimismo,
                        cumpliré con las citas odontológicas, prescripciones, dietas,
                        instrucciones y controles periódicos.
                      </li>
                      <li>
                        Asumo la responsabilidad de cubrir el costo total de los servicios
                        de salud oral. En testimonio de lo anterior, suscribo el presente
                        documento a los {new Date().getDay()} días del mes de{' '}
                        <span className="capitalize">
                          {new Date().toLocaleString('default', { month: 'long' })}
                        </span>{' '}
                        del año {new Date().getFullYear()}.
                      </li>
                    </ul>
                  </div>
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </FormItem>
          )}
        />

        <Button type="submit">Save patient</Button>
      </form>
    </Form>
  );
};
