import { Button } from '@/components/ui';
import { ArrowRightIcon } from '@radix-ui/react-icons';

export const PatientTreatment = () => {
  const treatmentInformation = [
    {
      label: 'Start date',
      value: '12/12/2023',
    },
    {
      label: 'Last update',
      value: '12/12/2023',
    },
    {
      label: 'Current balance',
      value: '$240.000 COP',
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start col-span-4 md:col-span-3 lg:col-span-2 border rounded-2xl gap-4 w-full p-6">
      <h1 className="text-2xl font-semibold">Treatment</h1>

      <div className="grid grid-cols-2 w-full">
        <div className="flex flex-col gap-4 items-start justify-start">
          {treatmentInformation.map((value) => (
            <div
              className="flex flex-col gap-1 items-start justify-start"
              key={value.label}
            >
              <h2 className="text-sm font-semibold">{value.label}</h2>
              <p className="text-base text-muted-foreground">{value.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h1>Image</h1>
        </div>
      </div>

      <div className="flex items-center justify-end w-full">
        <Button className="gap-2 w-full">
          See treatment history
          <ArrowRightIcon className="h-5 w-5 stroke-2" />
        </Button>
      </div>
    </div>
  );
};
