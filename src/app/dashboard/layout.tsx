import { Navbar } from '@/components';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full overflow-x-hidden overflow-y-auto">
      <Navbar />
      {children}
    </main>
  );
}
