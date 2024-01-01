export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="max-w-7xl mx-auto my-2 p-6">{children}</div>;
}
