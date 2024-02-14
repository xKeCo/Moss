import { RocketIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

export const EmptyTreatmentItem = ({ evolution = false }) => {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>
        You don&apos;t have any treatment {evolution ? 'evolution' : 'plan'} yet.
      </AlertTitle>
      <AlertDescription>
        Add a treatment {evolution ? 'evolution' : 'plan'} now to start your treatment.
      </AlertDescription>
    </Alert>
  );
};
