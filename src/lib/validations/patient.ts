import { z } from 'zod';
import { format } from 'date-fns';

export const patientFormSchema = z.object({
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  dniType: z.enum(['CC', 'TI', 'O']).refine((val) => val, 'DNI type is required'),
  dniNumber: z.string().min(8, {
    message: 'DNI number must be at least 8 characters.',
  }),
  email: z.string().email({
    message: 'Email must be a valid email.',
  }),

  basicInformation: z.object({
    gender: z.enum(['M', 'F', 'O']).refine((val) => val, 'Gender is required'),
    bloodType: z
      .enum([
        'O_POSITIVE',
        'O_NEGATIVE',
        'A_POSITIVE',
        'A_NEGATIVE',
        'B_POSITIVE',
        'B_NEGATIVE',
        'AB_POSITIVE',
        'AB_NEGATIVE',
      ])
      .refine((val) => val, 'Blood type is required'),
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
      .enum(['S', 'U', 'C', 'V', 'D', 'M'])
      .refine((val) => val, 'Civil status is required'),
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
      phone2: z.string().optional(),
      emergencyContactName: z.string().min(5, {
        message: 'Emergency contact name must be at least 5 characters.',
      }),
      emergencyContactPhone: z.string().min(10, {
        message: 'Emergency contact phone must be 10 characters.',
      }),
      emergencyContactPhone2: z.string().optional(),
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
      doctorType: z.enum(['G', 'E']).optional(),
      inTreatment: z.boolean(),
      treatmentName: z.string().optional(),
      boneScan: z.boolean(),
      boneScanType: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.EPSActive && !data.EPSName) {
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
        if (data.visitedDoctor && !data.doctorType) {
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
        if (data.inTreatment && !data.treatmentName) {
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
        if (data.boneScan && !data.boneScanType) {
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
