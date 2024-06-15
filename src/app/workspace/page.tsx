'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createWorkspace } from '@/actions';
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

type WorkspaceFormData = z.infer<typeof workspaceFormSchema>;

export default function WorkspacePage() {
  const { data: session, update, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const alreadyHasWorkspace = session?.user?.workspaces?.length! > 0;
  const router = useRouter();

  const form = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      workspaceName: '',
      workspaceKey: '',
    },
  });

  const onLogOut = async () => {
    if (alreadyHasWorkspace) {
      return null;
    }

    signOut({ callbackUrl: `/login` });
  };

  async function onSubmit(data: WorkspaceFormData) {
    setIsLoading(true);
    const { workspaceName, workspaceKey } = data;

    const newWorkspace = await createWorkspace(workspaceName, workspaceKey, session?.user?.id);

    setIsLoading(false);

    if (!newWorkspace?.ok) {
      if (newWorkspace?.error === 'workspaceKeyExists') {
        form.setError('workspaceKey', {
          type: 'manual',
          message: 'Una sucursal con esta URL ya existe. Por favor selecciona otra clave.',
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
            key: newWorkspace.workspace?.key,
          },
        ],
      },
    });

    toast.success('Workspace created successfully!');
    router.push(`/dashboard/${newWorkspace.workspace?.key}`);
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
          <CardDescription className="max-w-xl">
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
                  <FormItem className="mb-5">
                    <FormLabel htmlFor="workspaceName">Nombre de la sucursal</FormLabel>
                    <FormControl>
                      <Input
                        id="workspaceName"
                        autoFocus
                        autoComplete="off"
                        maxLength={50}
                        onChange={(e) => {
                          field.onChange(e);
                          form.setValue(
                            'workspaceKey',
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-zA-Z0-9]/g, '-')
                              .replace(/-+/g, '-')
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workspaceKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workspaceKey">URL de la sucursal</FormLabel>
                    <FormControl>
                      <Input
                        id="workspaceKey"
                        autoComplete="off"
                        startDecorator="moss.com/"
                        maxLength={20}
                        {...field}
                      />
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
