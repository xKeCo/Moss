'use client';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createWorkspace, navigate } from '@/actions';
import { workspaceFormSchema } from '@/lib/validations';
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
import Link from 'next/link';

type PatientFormData = z.infer<typeof workspaceFormSchema>;

export default function WorkspacePage() {
  const { data: session, update, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const alreadyHasWorkspace = session?.user?.workspaces?.length! > 0;

  const form = useForm<PatientFormData>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      workspaceName: '',
    },
  });

  const onLogOut = async () => {
    if (alreadyHasWorkspace) {
      return null;
    }

    signOut({ callbackUrl: `/login` });
  };

  async function onSubmit(data: PatientFormData) {
    setIsLoading(true);
    const { workspaceName } = data;

    const newWorkspace = await createWorkspace(workspaceName, session?.user?.id);

    setIsLoading(false);

    if (!newWorkspace?.ok) {
      if (newWorkspace?.error === 'workspaceExists') {
        form.setError('workspaceName', {
          type: 'manual',
          message: 'Un workspace con ese nombre ya existe. Por favor selecciona otro nombre.',
        });
      }

      return toast.error(newWorkspace?.errorMessage);
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        workspaces: [
          ...(session?.user?.workspaces ?? []),
          {
            id: newWorkspace.workspace?.id,
            name: newWorkspace.workspace?.name,
          },
        ],
      },
    });

    toast.success('Workspace created successfully!');
    await navigate(`/dashboard/${newWorkspace.workspace?.id}`);
    form.reset();
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {status === 'loading' ? (
        <div className="flex items-center justify-start gap-2 py-2 px-4 text-sm fixed top-6 left-4 md:left-12">
          <Icons.Spinner className="h-5 w-5 animate-spin" />
          Cargando...
        </div>
      ) : (
        <Button
          variant="link"
          className="fixed top-6 left-4 md:left-12"
          asChild={alreadyHasWorkspace}
          onClick={onLogOut}
        >
          {alreadyHasWorkspace ? <Link href="/dashboard">Ir al dashboard</Link> : 'Log out'}
        </Button>
      )}

      <div className="fixed top-6 right-4 md:right-12 px-4 py-2">
        <p className="text-xs text-muted-foreground mb-2">Iniciaste sesión como:</p>
        <UserNav isDropdown={false} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crea un nueva sucursal</CardTitle>
          <CardDescription className="max-w-lg">
            Las sucursales son espacios de trabajo independientes para organizar todo lo relacionado
            con tu pacientes.
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
                    <FormLabel htmlFor="workspaceName">Nombre de la sucursal</FormLabel>
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
                Crear sucursal
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
