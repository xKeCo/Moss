import { AppointmentsHomeListSkeleton, PatientsList } from '@/components';

export default function DashboardLoadingPage() {
  return (
    <main className="py-5 px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-8 gap-4 h-[calc(100vh-109px)]">
        <AppointmentsHomeListSkeleton />

        <div className="flex flex-col gap-4 flex-wrap rounded-2xl p-5 border col-span-3 items-start dark:border-[#29292f] dark:bg-zinc-900">
          <PatientsList.Skeleton />
        </div>
      </div>
    </main>
  );
}
