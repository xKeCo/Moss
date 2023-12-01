import { Metadata } from 'next';
import { AuthForm } from '@/components';

export const metadata: Metadata = {
  title: 'Moss - Login',
  description: 'Moss software login page',
};

export default function Login() {
  return <AuthForm />;
}
