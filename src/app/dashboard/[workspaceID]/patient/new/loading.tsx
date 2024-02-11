import { PatientForm } from '@/components';

export default function NewPatientLoadingPage() {
  return (
    <div className="max-w-7xl mx-auto my-6 p-6">
      <h1 className="text-2xl xl:text-3xl font-semibold mb-3">New patient</h1>
      <div className="h-[2px] bg-secondary"></div>

      <PatientForm isLoadingPage />
    </div>
  );
}
