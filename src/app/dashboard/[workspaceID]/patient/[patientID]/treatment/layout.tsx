export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dark:bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto py-12 p-6">{children}</div>
    </div>
  );
}
