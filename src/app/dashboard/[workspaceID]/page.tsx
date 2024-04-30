import { getCalendarAppointments } from '@/actions';
import { AppointmentsHomeList, PatientsList } from '@/components';

interface IDashboardProps {
  params: {
    workspaceID: string;
  };
}

export default async function Dashboard({ params }: Readonly<IDashboardProps>) {
  // const appointmentsInfo = await getCalendarAppointments(params.workspaceID);

  return (
    <main className="py-5 px-4 sm:px-8">
      <div className="grid md:grid-cols-6 xl:grid-cols-8 gap-4 h-[calc(100vh-109px)]">
        <AppointmentsHomeList
        // appointments={appointmentsInfo?.appointments!}
        />

        <div className="flex flex-col gap-4 flex-wrap rounded-2xl p-5 border col-span-3 items-start dark:border-[#29292f] dark:bg-zinc-900">
          <PatientsList workspaceID={params.workspaceID} />
        </div>
      </div>
    </main>
  );
}
