import { Sidebar } from '@/components';

interface ISettingsLayoutProps {
  params: {
    workspaceID: string;
  };
  children: React.ReactNode;
}

export default function SettingsLayout({ params, children }: Readonly<ISettingsLayoutProps>) {
  return (
    <main className="w-full overflow-x-hidden overflow-y-hidden">
      <main className="flex gap-2 w-full py-4 px-4 ">
        <Sidebar workspaceID={params.workspaceID} />

        <div className="border border-[#e4e4e7] bg-white rounded-xl p-6 h-[calc(100vh-32px)] w-full overflow-y-auto dark:border-[#29292f] dark:bg-zinc-900">
          {children}
        </div>
      </main>
    </main>
  );
}
