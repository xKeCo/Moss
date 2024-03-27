'use client';
import { HTMLAttributes, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { navigate, registerUser } from '@/actions';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Icons } from '@/components/Icons/Icons';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean;
}

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .optional(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function AuthForm({ className, isRegister, ...props }: Readonly<UserAuthFormProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: isRegister ? '' : undefined,
      password: '',
    },
  });

  const startLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      setIsLoading(false);

      if (!signInResult?.ok) {
        return toast.error('Invalid credentials');
      }

      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      toast.error('An error occurred during login');
    }
  };

  const startRegister = async (email: string, password: string, username: string) => {
    setIsLoading(true);

    try {
      const user = await registerUser(email, password, username);

      setIsLoading(false);

      if (!user.ok) {
        if (user.error === 'emailExists') {
          form.setError('email', {
            message: 'Email already exists.',
          });
        }

        if (user.error === 'usernameExists') {
          form.setError('username', {
            message: 'Username already exists.',
          });
        }

        return toast.error(user.errorMessage);
      }

      await startLogin(email, password);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      toast.error('An error occurred during registration');
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password, username } = data;

    if (isRegister) {
      startRegister(email, password, username!);
    } else {
      startLogin(email, password);
    }
  }

  return (
    <div className="px-8">
      <div className="mx-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[370px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="flex justify-center items-center w-full mb-4">
            <Image src="/logo1.svg" alt="logo1" width={100} height={100} />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isRegister ? 'Crea una cuenta en Moss' : 'Inicia sesión en Moss'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRegister
              ? 'Ingresa tus datos para crear una cuenta en Moss'
              : 'Ingresa tus datos para iniciar sesión en Moss'}
          </p>
        </div>

        <div className={cn('grid gap-6', className)} {...props}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo electrónico" {...field} autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isRegister && (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de usuario" {...field} autoComplete="username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contraseña"
                        {...field}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
                {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
              </Button>
            </form>
          </Form>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
          {/* <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() =>
              signIn(
                'google',

                { callbackUrl: '/dashboard' }
              )
            }
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.Google className="mr-2 h-4 w-4" />
            )}{' '}
            Google
          </Button> */}
        </div>

        <p className="text-sm text-muted-foreground">
          {isRegister ? 'Ya tienes una cuenta? ' : 'No tienes una cuenta? '}
          <Link
            href={isRegister ? '/login' : '/register'}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isRegister ? 'Iniciar sesión' : 'Crear una cuenta'}
          </Link>
        </p>

        <p className="text-center text-sm text-muted-foreground">
          Al hacer clic en continuar, aceptas nuestros{' '}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Términos de servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Política de privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
