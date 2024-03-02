import { z } from 'zod';

export const treatmentFormSchema = z.object({
  diagnosis: z
    .string()
    .min(4, {
      message: 'Diagnóstico debe tener al menos 4 caracteres.',
    })
    .max(100, {
      message: 'Diagnóstico debe tener como máximo 100 caracteres.',
    }),
  prognosis: z
    .string()
    .min(4, {
      message: 'Pronóstico debe tener al menos 4 caracteres.',
    })
    .max(100, {
      message: 'Pronóstico debe tener como máximo 100 caracteres.',
    }),
});
