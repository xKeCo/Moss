import { z } from 'zod';

export const workspaceFormSchema = z.object({
  workspaceName: z.string().min(5, {
    message: 'El nombre del workspace debe tener al menos 5 caracteres',
  }),
  workspaceKey: z
    .string()
    .min(5, {
      message: 'El nombre clave del workspace debe tener al menos 5 caracteres',
    })
    .refine(
      (value) => {
        return /^[a-zA-Z0-9-]+$/.test(value);
      },
      {
        message:
          'El nombre clave del workspace solo puede contener letras, números y guiones medios.',
      }
    ),
});
