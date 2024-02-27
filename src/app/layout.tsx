import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers, ThemeProvider } from '@/components';
import { cn } from '@/lib/utils';
import '../styles/globals.css';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moss - Dental Clinic Management System',
  description: 'Dental Clinic Management System',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
        <Toaster
          richColors
          // toastOptions={{
          //   style: { background: '#18222d', color: '#fff', borderColor: '#18222d' },
          // }}
        />
      </body>
    </html>
  );
}
