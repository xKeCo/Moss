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
} from '../ui';

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  gender: z.string().min(1, {
    message: 'Gender is required',
  }),
  bloodType: z.string().min(1, {
    message: 'Blood type is required.',
  }),
  age: z.string(),
  dniType: z.string().min(1, {
    message: 'DNI type is required.',
  }),
  dniNumber: z.string().min(8, {
    message: 'DNI number must be at least 8 characters.',
  }),
  birthDate: z.date({
    required_error: 'Birth date is required.',
  }),
  birthPlace: z.string().min(5, {
    message: 'Birth place must be at least 5 characters.',
  }),
  email: z.string().email({
    message: 'Email must be a valid email.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Phone must be 10 characters.',
    })
    .max(10, {
      message: 'Phone must be 10 characters.',
    }),
  phone2: z.union([
    z.string().min(10, {
      message: 'Phone must be 10 characters.',
    }),
    z.literal(''),
  ]),
  height: z.string().min(1, {
    message: 'Height is required.',
  }),
  weight: z.string().min(1, {
    message: 'Weight is required.',
  }),
  civilStatus: z.string().min(1, {
    message: 'Civil status is required.',
  }),
  occupation: z.string().min(5, {
    message: 'Occupation must be at least 5 characters.',
  }),
  EPSActive: z.boolean(),
  EPSName: z.string().optional(),
  visitedDoctor: z.boolean(),
  doctorType: z.string().optional(),
  inTreatment: z.boolean(),
  treatment: z.string().optional(),
  boneScan: z.boolean(),
  boneScanType: z.string().optional(),
});

export const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: '',
      bloodType: '',
      birthDate: '' as any,
      age: '',
      birthPlace: '',
      dniType: '',
      dniNumber: '',
      civilStatus: '',
      email: '',
      address: '',
      phone: '',
      phone2: '',
      height: '',
      weight: '',
      occupation: '',
      EPSActive: true,
      EPSName: '',
      visitedDoctor: true,
      doctorType: '',
      inTreatment: true,
      treatment: '',
      boneScan: true,
      boneScanType: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Phone 2 cannot be equal to phone
    if (values.phone === values.phone2) {
      form.setError('phone2', {
        type: 'manual',
        message: 'Phone 2 cannot be equal to phone 1.',
      });
      return;
    }

    // EPS name is required if EPS is active
    if (values.EPSActive && !values.EPSName) {
      form.setError('EPSName', {
        type: 'manual',
        message: 'EPS name is required.',
      });
      return;
    }

    // Doctor type is required if visited doctor is true
    if (values.visitedDoctor && !values.doctorType) {
      form.setError('doctorType', {
        type: 'manual',
        message: 'Doctor type is required.',
      });
      return;
    }

    // Treatment is required if in treatment is true
    if (values.inTreatment && !values.treatment) {
      form.setError('treatment', {
        type: 'manual',
        message: 'Treatment is required.',
      });
      return;
    }

    // Bone scan type is required if bone scan is true
    if (values.boneScan && !values.boneScanType) {
      form.setError('boneScanType', {
        type: 'manual',
        message: 'Bone scan type is required.',
      });
      return;
    }

    console.log(values);
  }

  const setAgeValue = (selectedDate: Date) => {
    const age = new Date().getFullYear() - selectedDate.getFullYear();
    form.setValue('age', age.toString());
  };

  return (
    <div>
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
              name="gender"
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
              name="bloodType"
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
              name="birthDate"
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
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setAgeValue(date!);
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
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Age" {...field} disabled endDecorator="years" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthPlace"
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
              name="civilStatus"
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
              name="address"
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
              name="phone"
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
              name="phone2"
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
              name="height"
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
              name="weight"
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
            name="occupation"
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
              name="EPSActive"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-around">
                  <FormLabel className="h-[17px]">EPS Active</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-2 flex items-end"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('EPSActive') && (
              <FormField
                control={form.control}
                name="EPSName"
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
              name="visitedDoctor"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-around">
                  <FormLabel className="h-[17px]">Visited a doctor</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-2 flex items-end"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('visitedDoctor') && (
              <FormField
                control={form.control}
                name="doctorType"
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
              name="inTreatment"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-around">
                  <FormLabel className="h-[17px]">In treatment</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-2 flex items-end"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('inTreatment') && (
              <FormField
                control={form.control}
                name="treatment"
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
              name="boneScan"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-around">
                  <FormLabel className="h-[17px]">Bone scan</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-2 flex items-end"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('boneScan') && (
              <FormField
                control={form.control}
                name="boneScanType"
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
