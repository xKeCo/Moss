'use client';
import { v4 as uuidv4 } from 'uuid';
import { CalendarIcon, PlusIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { ITxEvolution } from '@/interfaces';

interface IAddTreatmentEvolutionProps {
  openEvol: boolean;
  setOpenEvol: React.Dispatch<React.SetStateAction<boolean>>;
  treatmentEvol: ITxEvolution;
  treatmentsEvols: ITxEvolution[];
  setTreatmentEvol: React.Dispatch<React.SetStateAction<ITxEvolution>>;
  setTreatmentsEvols: React.Dispatch<React.SetStateAction<ITxEvolution[]>>;
}

export const AddTreatmentEvolution = ({
  openEvol,
  setOpenEvol,
  treatmentEvol,
  treatmentsEvols,
  setTreatmentEvol,
  setTreatmentsEvols,
}: IAddTreatmentEvolutionProps) => {
  const initialTreatmentEvolution: ITxEvolution = {
    txEvolId: uuidv4(),
    txEvolDate: new Date(),
    txEvolDesc: '',
    txEvolDoc: '',
    txEvolPayment: '',
  };

  const handleTreatmentEvolChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTreatmentEvol({
      ...treatmentEvol,
      [name]: value,
    });
  };

  const addNewTreatment = () => {
    if (!treatmentEvol.txEvolDesc) {
      toast.error('Please enter a treatment evolution description.');
      return;
    }

    if (!treatmentEvol.txEvolDoc) {
      toast.error('Please enter a treatment evolution doctor.');
      return;
    }

    if (!treatmentEvol.txEvolDate) {
      toast.error('Please enter a treatment evolution date.');
      return;
    }

    if (!treatmentEvol.txEvolPayment) {
      toast.error('Please enter a treatment evolution amount paid.');
      return;
    }

    const findTreatmentEvol = treatmentsEvols.find(
      (t: ITxEvolution) => t.txEvolId === treatmentEvol.txEvolId
    );

    if (findTreatmentEvol) {
      const index = treatmentsEvols.findIndex(
        (t: ITxEvolution) => t.txEvolId === treatmentEvol.txEvolId
      );

      treatmentsEvols[index] = treatmentEvol;

      setTreatmentsEvols([...treatmentsEvols]);
      setTreatmentEvol(initialTreatmentEvolution);
      setOpenEvol(false);

      return;
    }

    setTreatmentsEvols([...treatmentsEvols, treatmentEvol]);
    setTreatmentEvol(initialTreatmentEvolution);
    setOpenEvol(false);
  };

  return (
    <Dialog
      open={openEvol}
      onOpenChange={(openEvol) => {
        setOpenEvol(openEvol);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add treatment evolution
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new treatment evolution</DialogTitle>
          <DialogDescription>
            Add a new treatment evolution to your patient.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <Label htmlFor="txEvolDesc">Treatment evolution description</Label>

            <Textarea
              id="txEvolDesc"
              name="txEvolDesc"
              placeholder="tooth extraction, dental cleaning, etc."
              value={treatmentEvol.txEvolDesc}
              onChange={handleTreatmentEvolChange}
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="txEvolDoc">Treatment evolution doctor</Label>

            <Input
              id="txEvolDoc"
              name="txEvolDoc"
              placeholder="ej. Dr. John Doe"
              className="mt-2"
              value={treatmentEvol.txEvolDoc}
              onChange={handleTreatmentEvolChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="txEvolDate">Treatment evolution date</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="txEvolDate"
                type="button"
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal mt-2',
                  !treatmentEvol.txEvolDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {treatmentEvol.txEvolDate ? (
                  format(treatmentEvol.txEvolDate, 'P')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={treatmentEvol.txEvolDate as Date}
                onSelect={(date) => {
                  setTreatmentEvol({
                    ...treatmentEvol,
                    txEvolDate: date as Date,
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="txEvolPayment">Treatment evolution amount paid (COP)</Label>

          <Input
            id="txEvolPayment"
            type="number"
            min={0}
            name="txEvolPayment"
            placeholder="ej. 1000000"
            value={treatmentEvol.txEvolPayment}
            onChange={handleTreatmentEvolChange}
            className="mt-2"
            startDecorator="COP"
          />
        </div>

        <DialogFooter>
          <Button type="button" onClick={addNewTreatment}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
