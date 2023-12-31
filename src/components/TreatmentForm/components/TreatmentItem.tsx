import { v4 as uuidv4 } from 'uuid';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Alert, Button } from '@/components/ui';
import { formatCurrency } from '@/helpers';
import { IRealTxPlan } from '@/interfaces';

interface ITretmentItemProps {
  item: IRealTxPlan;
  index: number;
  treatments: IRealTxPlan[];
  setTreatment: React.Dispatch<React.SetStateAction<IRealTxPlan>>;
  setTreatments: React.Dispatch<React.SetStateAction<IRealTxPlan[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TreatmentItem = ({
  item,
  index,
  treatments,
  setTreatment,
  setTreatments,
  setOpen,
}: ITretmentItemProps) => {
  const initialTreatment: IRealTxPlan = {
    txId: uuidv4(),
    txPhase: `Fase 1`,
    txActivity: '',
    txETT: '',
    txETTUnit: 'Months',
    txStartDate: new Date(),
    txPrice: '',
  };

  const editTreatment = () => {
    setTreatment(item);
    setOpen(true);
  };

  const deleteTreatment = () => {
    setTreatments(treatments.filter((t) => t.txId !== item.txId));
    setTreatment(initialTreatment);
  };

  return (
    <Alert className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-sm font-semibold mb-1">{`Treatment #${index + 1}`}</h1>
        <p className="text-sm font-medium text-muted-foreground">
          {item.txStartDate.toString().split(' ').slice(1, 4).join(' ')} - {item.txETT}{' '}
          {item.txETTUnit}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-xl font-semibold">{item.txActivity}</h1>
          <p className="text-xl">{formatCurrency(Number(item.txPrice))}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <Button type="button" size="icon" onClick={editTreatment}>
            <Pencil2Icon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={deleteTreatment}
          >
            <TrashIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Alert>
  );
};
