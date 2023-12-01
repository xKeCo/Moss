import { AuthForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moss - Register',
  description: 'Moss software register page',
};

export default function Register() {
  return <AuthForm isRegister />;
}
