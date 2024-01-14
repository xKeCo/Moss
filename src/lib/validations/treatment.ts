import { z } from 'zod';

export const treatmentFormSchema = z.object({
  diagnosis: z
    .string()
    .min(5, {
      message: 'Diagnosis must be at least 5 characters.',
    })
    .max(100, {
      message: 'Diagnosis must be at most 100 characters.',
    }),
  prognosis: z
    .string()
    .min(5, {
      message: 'Prognosis must be at least 5 characters.',
    })
    .max(100, {
      message: 'Prognosis must be at most 100 characters.',
    }),
});
