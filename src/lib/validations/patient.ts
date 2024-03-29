import { z } from 'zod';
import { format } from 'date-fns';

export const patientFormSchema = z.object({
  name: z.string().min(4, {
    message: 'Nombre completo debe tener al menos 4 caracteres.',
  }),
  dniType: z.enum(['CC', 'TI', 'O']).refine((val) => val, 'DNI type is required'),
  dniNumber: z.string().min(8, {
    message: 'El número de documento debe tener al menos 8 caracteres.',
  }),
  email: z.string().email({
    message: 'Correo electrónico inválido.',
  }),
  reasonForConsultation: z.string().min(4, {
    message: 'Motivo de consulta  debe tener al menos 4 caracteres.',
  }),
  currentIllness: z.string().min(4, {
    message: 'Enfermedad actual debe tener al menos 4 caracteres.',
  }),

  BasicInformation: z.object({
    gender: z.enum(['M', 'F', 'O']).refine((val) => val, 'Género es requerido'),
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
      .refine((val) => val, 'Tipo de sangre es requerido'),
    birthDate: z
      .date({
        required_error: 'Fecha de nacimiento es requerida.',
      })
      .refine((val) => format(val, 'P') !== format(new Date(), 'P'), {
        message: 'Fecha de nacimiento no puede ser hoy.',
      }),
    birthPlace: z.string().min(4, {
      message: 'Lugar de nacimiento debe tener al menos 4 caracteres.',
    }),
    height: z.string().min(1, {
      message: 'Altura es requerida.',
    }),
    weight: z.string().min(1, {
      message: 'Peso es requerido.',
    }),
    maritalStatus: z
      .enum(['S', 'U', 'C', 'V', 'D', 'M'])
      .refine((val) => val, 'Civil status is required'),
    occupation: z.string().min(4, {
      message: 'Ocupación debe tener al menos 4 caracteres.',
    }),
  }),

  ContactInformation: z
    .object({
      address: z.string().min(4, {
        message: 'Dirección debe tener al menos 4 caracteres.',
      }),
      phone1: z.string().min(10, {
        message: 'Teléfono debe tener al menos 10 caracteres.',
      }),
      phone2: z.string().optional(),
      emergencyContactName: z.string().min(4, {
        message: 'Nombre de contacto de emergencia debe tener al menos 4 caracteres.',
      }),
      emergencyContactPhone: z.string().min(10, {
        message: 'Teléfono de contacto de emergencia debe tener al menos 10 caracteres.',
      }),
      emergencyContactPhone2: z.string().optional(),
    })
    .refine((data) => data.phone1 !== data.phone2, {
      message: 'Teléfono 2 no puede ser igual a teléfono.',
      path: ['phone2'],
    })
    .refine((data) => data.emergencyContactPhone !== data.emergencyContactPhone2, {
      message: 'Teléfono 2 no puede ser igual a teléfono de contacto de emergencia.',
      path: ['emergencyContactPhone2'],
    }),

  MedicalInformation: z
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
        message: 'Nombre de la EPS es requerido si tiene EPS activa.',
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
        message: 'Tipo de doctor es requerido si ha visitado un doctor.',
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
        message: 'Nombre del tratamiento es requerido si está en tratamiento.',
        path: ['treatmentName'],
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
        message: 'Tipo de radiografía es requerido si se ha realizado una radiografía.',
        path: ['boneScanType'],
      }
    ),

  termsAndConditions: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones.',
  }),
});
