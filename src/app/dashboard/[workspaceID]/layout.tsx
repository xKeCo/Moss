import { Navbar } from '@/components';

interface IDashboardLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceID: string;
  };
}

export default function DashboardLayout({ children, params }: Readonly<IDashboardLayoutProps>) {
  return (
    <main className="w-full overflow-x-hidden overflow-y-auto">
      <Navbar activeWorkspaceID={params.workspaceID} />
      {children}
    </main>
  );
}
