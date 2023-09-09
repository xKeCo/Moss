import { Navbar } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-screen overflow-x-hidden overflow-y-auto">
      <Navbar />
      {children}
    </main>
  );
}
