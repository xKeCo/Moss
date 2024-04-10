import { Navbar } from '@/components';

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<IDashboardLayoutProps>) {
  return (
    <main className="w-full overflow-x-hidden overflow-y-auto">
      <Navbar />
      {children}
    </main>
  );
}
