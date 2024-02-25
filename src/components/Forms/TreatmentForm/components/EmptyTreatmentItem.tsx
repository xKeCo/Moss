import { LightningBoltIcon, RocketIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

export const EmptyTreatmentItem = ({ isEvol = false }) => {
  return (
    <Alert className="dark:bg-zinc-900">
      {isEvol ? <LightningBoltIcon className="h-4 w-4" /> : <RocketIcon className="h-4 w-4" />}
      <AlertTitle>
        No tienes {isEvol ? 'ningúna evolución' : 'ningún plan'} de tratamiento aún.
      </AlertTitle>
      <AlertDescription>
        Agrega un {isEvol ? 'evolución' : 'plan'} de tratamiento para comenzar tu tratamiento.
      </AlertDescription>
    </Alert>
  );
};
