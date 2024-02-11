import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Alert, Button, Skeleton } from '@/components/ui';
import { formatCurrency, formatDate } from '@/helpers';
import { cn } from '@/lib/utils';

interface ITretmentItemProps {
  item: any;
  index: number;
  treatments: any[];
  setTreatment: React.Dispatch<React.SetStateAction<any>>;
  setTreatments: React.Dispatch<React.SetStateAction<any[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEvol: boolean;
  initialTreatment: any;
}

export const TreatmentItem = ({
  item,
  index,
  setOpenModal,
  treatments,
  setTreatment,
  setTreatments,
  isEvol,
  initialTreatment,
}: ITretmentItemProps) => {
  const isSaved = isEvol ? item.txEvolActive : item.txActive;

  const editTreatmentItem = () => {
    setTreatment(item);
    setOpenModal(true);
  };

  const deleteTreatmentItem = () => {
    setTreatments(treatments.filter((t) => t.id !== item.id));
    setTreatment(initialTreatment);
  };

  return (
    <Alert className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-sm font-semibold mb-1">
          {isEvol ? 'Evolution' : 'Treatment'} #{index + 1}
        </h1>

        <p className="text-sm font-medium text-muted-foreground">
          {isEvol ? (
            formatDate(item.txEvolDate.toString())
          ) : (
            <>
              {formatDate(item.txStartDate.toString())} - {item.txETT} {item.txETTUnit}
            </>
          )}
        </p>
      </div>

      <div className={cn('flex items-center justify-between', isEvol && 'gap-6')}>
        <div className={cn('flex flex-col items-start justify-center gap-2', isEvol && 'w-full')}>
          <h1 className="text-lg font-semibold">{isEvol ? item.txEvolDesc : item.txActivity}</h1>

          {isEvol ? (
            <div className="flex justify-between w-full">
              <p className="text-lg font-medium">{item.txEvolDoc}</p>
              <p className="text-xl font-medium">{formatCurrency(Number(item.txEvolPayment))}</p>
            </div>
          ) : (
            <p className="text-xl font-medium">{formatCurrency(Number(item.txPrice))}</p>
          )}
        </div>

        {!isSaved && (
          <div className="flex items-center justify-start gap-2">
            <Button type="button" size="icon" onClick={editTreatmentItem}>
              <Pencil2Icon className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" variant="destructive" onClick={deleteTreatmentItem}>
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </Alert>
  );
};

TreatmentItem.Skeleton = function TreatmentItemSkeleton() {
  return (
    <Alert className="flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-6 w-2/6" />

        <Skeleton className="h-6 w-2/6" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-3 w-full">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/6" />
        </div>
      </div>
    </Alert>
  );
};
