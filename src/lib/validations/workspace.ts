import { z } from 'zod';

export const workspaceFormSchema = z.object({
  workspaceName: z.string().min(5, {
    message: 'Workspace name must be at least 5 characters long.',
  }),
});
