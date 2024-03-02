import { z } from 'zod';

export const workspaceFormSchema = z.object({
  workspaceName: z.string().min(5, {
    message: 'El nombre del workspace debe tener al menos 5 caracteres',
  }),
});
