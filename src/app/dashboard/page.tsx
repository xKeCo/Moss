import { Patients } from '@/components';
import { DashboardTitle } from './components/DashboardTitle';

function Dashboard() {
  return (
    <main className="py-5 px-8">
      <DashboardTitle />

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Patients</h2>

        <Patients />
      </div>
    </main>
  );
}

export default Dashboard;
