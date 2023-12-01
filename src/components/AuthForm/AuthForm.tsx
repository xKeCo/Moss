'use client';
import { HTMLAttributes, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';
import { Icons } from '..';
import { useAuthStore } from '@/hooks';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean;
}

export function AuthForm({
  className,
  isRegister,
  ...props
}: Readonly<UserAuthFormProps>) {
  const { startLogin, startRegister } = useAuthStore();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: isRegister ? '' : undefined,
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const { email, password } = data;

    if (isRegister) {
      setIsLoading(false);
      startRegister(data);
    } else {
      setIsLoading(false);
      startLogin({ email, password });
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="px-8">
      <div className="mx-auto flex w-full h-screen flex-col justify-center space-y-6 sm:w-[370px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center items-center w-full mb-4">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isRegister ? 'Create your Moss account' : 'Log In to Moss'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRegister
              ? 'Enter your email below to create your account'
              : 'Enter your credentials below to continue'}
          </p>
        </div>

        <div className={cn('grid gap-6', className)} {...props}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {isRegister ? 'Create account' : 'Login'}
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
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{' '}
            Google
          </Button> */}
        </div>

        <p className="text-sm text-muted-foreground">
          {isRegister ? 'Already have an account? ' : 'Don’t have an account? '}
          <Link
            href={isRegister ? '/login' : '/register'}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </p>

        <p className="text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
