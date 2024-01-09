'use client';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Icons, UserNav } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui';
import { createWorkspace, navigate } from '@/actions';

const FormSchema = z.object({
  workspaceName: z.string().min(5, {
    message: 'Workspace name must be at least 5 characters long.',
  }),
});

export default function WorkspacePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspaceName: '',
    },
  });

  const onLogOut = () => {
    signOut({ callbackUrl: `/login` });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const { workspaceName } = data;

    const newWorkspace = await createWorkspace(workspaceName, session?.user?.id);

    setIsLoading(false);

    if (!newWorkspace?.ok) {
      if (newWorkspace?.error === 'workspaceExists') {
        form.setError('workspaceName', {
          type: 'manual',
          message: 'Workspace name already exists. Please try another one.',
        });
      }

      return toast.error(newWorkspace?.errorMessage);
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        workspaces: [newWorkspace.workspace],
      },
    });

    navigate(`/dashboard`);
    toast.success('Workspace created successfully!');
    form.reset();
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Button variant="link" className="fixed top-6 left-4 md:left-12" onClick={onLogOut}>
        Log out
      </Button>
      <div className="fixed top-6 right-4 md:right-12 px-4 py-2">
        <p className="text-xs text-muted-foreground mb-2">Logged in as:</p>
        <UserNav isDropdown={false} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create a new workspace</CardTitle>
          <CardDescription>
            Workspaces are where your team communicates and collaborates.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="workspaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workspaceName">Workspace name</FormLabel>
                    <FormControl>
                      <Input id="workspaceName" autoFocus autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="submit">
                {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create workspace
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
