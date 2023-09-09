import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { fakePatients } from '@/data/patients';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="py-5 px-8">
      <h1 className="text-4xl font-semibold">Dashboard</h1>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Patients</h2>

        <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-4">
          {fakePatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/dashboard/patient/${patient.id}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={`https://source.boringavatars.com/beam/120/${patient.username}?colors=0A0310,49007E`}
                    alt={patient.name}
                  />
                  <AvatarFallback>
                    {patient.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.email}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
