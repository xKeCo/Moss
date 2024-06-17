'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@/components/ui';
import { workspaceFormSchema } from '@/lib/validations';
import { Icons } from '@/components/Icons/Icons';
import { updateWorkspace } from '@/actions';

type WorkspaceFormData = z.infer<typeof workspaceFormSchema>;

export const GeneralInfoForm = ({
  workspaceData,
}: {
  workspaceData: {
    id: string;
    name: string;
    key: string;
    logoURL: string | null;
  };
}) => {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      workspaceName: workspaceData?.name.trim(),
      workspaceKey: workspaceData?.key,
    },
  });

  async function onSubmit(data: WorkspaceFormData) {
    if (data.workspaceName === workspaceData.name && data.workspaceKey === workspaceData.key) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const { ok, workspace, errorMessage, error } = await updateWorkspace(
      workspaceData.id,
      data.workspaceName.trim(),
      data.workspaceKey
    );

    if (!ok) {
      if (error === 'workspaceKeyExists') {
        form.setError('workspaceKey', {
          type: 'manual',
          message: 'Una sucursal con esta URL ya existe. Por favor selecciona otra clave.',
        });
      }

      setIsLoading(false);
      return toast.error(errorMessage);
    }

    await update({
      ...session,
      user: {
        ...session?.user,
        workspaces: session?.user?.workspaces.map((w) =>
          w.id === workspaceData.id ? workspace : w
        ),
      },
    });

    setIsLoading(false);

    toast.success('Workspace updated successfully!');
    router.replace(`/settings/${workspace?.key}/workspace`);
  }

  return (
    <>
      <h1 className="text-base font-medium mb-4">General</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem className="mb-6 max-w-96">
                <FormLabel htmlFor="workspaceName">Nombre de la sucursal</FormLabel>
                <FormControl>
                  <Input
                    id="workspaceName"
                    autoComplete="off"
                    maxLength={50}
                    disabled={isLoading}
                    {...field}
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
              <FormItem className="mb-6 max-w-96">
                <FormLabel htmlFor="workspaceKey">URL de la sucursal</FormLabel>
                <FormControl>
                  <Input
                    id="workspaceKey"
                    autoComplete="off"
                    startDecorator="moss.com/"
                    maxLength={20}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Actualizar
          </Button>
        </form>
      </Form>
    </>
  );
};

export const GeneralInfoFormSkeleton = () => {
  return (
    <>
      <h1 className="text-base font-medium mb-4">General</h1>

      <div className="flex flex-col w-full mb-6 max-w-96 justify-center gap-2.5 pt-0.5">
        <Label className="text-sm ">Nombre de la sucursal</Label>
        <Input disabled />
      </div>

      <div className="grid w-full mb-6 max-w-96 items-center gap-2.5 pt-0.5">
        <Label className="text-sm pt-0.5">URL de la sucursal</Label>
        <Input startDecorator="moss.com/" disabled />
      </div>

      <Button className="w-fit" disabled>
        Actualizar
      </Button>
    </>
  );
};
