'use client';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { IRealTxPlan, ITxEvolution } from '@/interfaces';

interface IAddTreatmentItemProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  treatment: any;
  treatments: any[];
  setTreatment: React.Dispatch<React.SetStateAction<any>>;
  setTreatments: React.Dispatch<React.SetStateAction<any[]>>;
  isEvol: boolean;
  initialTreatment: any;
}

export const AddTreatmentItem = ({
  openModal,
  setOpenModal,
  treatment,
  treatments,
  setTreatment,
  setTreatments,
  isEvol,
  initialTreatment,
}: IAddTreatmentItemProps) => {
  const selectedDate = isEvol ? treatment.txEvolDate : treatment.txStartDate;

  const handleTreatmentEvolChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTreatment({
      ...treatment,
      [name]: value,
    });
  };

  const checkRequiredFields = () => {
    const requiredFields = isEvol
      ? [
          { field: 'txEvolDesc', fieldName: 'evolution' },
          { field: 'txEvolDoc', fieldName: 'evolution doctor' },
          { field: 'txEvolDate', fieldName: 'evolution date' },
          { field: 'txEvolPayment', fieldName: 'amount paid' },
        ]
      : [
          { field: 'txActivity', fieldName: 'activity' },
          { field: 'txETT', fieldName: 'estimated time of treatment' },
          { field: 'txStartDate', fieldName: 'start date' },
          { field: 'txPrice', fieldName: 'price' },
        ];

    for (const field of requiredFields) {
      if (!treatment[field.field]) {
        toast.error(`Treatment ${field.fieldName} is required.`);
        return false;
      }
    }

    return true;
  };

  const addNew = () => {
    if (!checkRequiredFields()) {
      return;
    }

    const findTreatment = treatments.find((t: any) => t.id === treatment.id);

    const updatedTreatments = findTreatment
      ? treatments.map((t: any) => {
          if (t.id === treatment.id) {
            return {
              ...treatment,
              [isEvol ? 'txEvolDate' : 'txStartDate']:
                treatment[isEvol ? 'txEvolDate' : 'txStartDate'].toString(),
            };
          }
          return t;
        })
      : [
          ...treatments,
          {
            ...treatment,
            [isEvol ? 'txEvolDate' : 'txStartDate']:
              treatment[isEvol ? 'txEvolDate' : 'txStartDate'].toString(),
          },
        ];

    setTreatments(updatedTreatments);
    setTreatment(initialTreatment);
    setOpenModal(false);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(openModal) => {
        setOpenModal(openModal);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon className="mr-2 h-4 w-4" />
          {isEvol ? 'Add treatment evolution' : 'Add treatment plan'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEvol ? 'Add a new treatment evolution' : 'Add a new treatment plan'}
          </DialogTitle>
          <DialogDescription>
            {isEvol
              ? 'Add a new treatment evolution to your patient.'
              : 'Add a new treatment plan to your patient.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <Label htmlFor={isEvol ? 'txEvolDesc' : 'txActivity'}>
              {isEvol ? 'Treatment evolution description' : 'Treatment activity (Description)'}
            </Label>

            <Textarea
              id={isEvol ? 'txEvolDesc' : 'txActivity'}
              name={isEvol ? 'txEvolDesc' : 'txActivity'}
              placeholder="tooth extraction, dental cleaning, etc."
              value={isEvol ? treatment.txEvolDesc : treatment.txActivity}
              onChange={handleTreatmentEvolChange}
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor={isEvol ? '' : 'txETT'}>
              {isEvol ? 'Treatment evolution doctor' : 'Estimated time of treatment'}
            </Label>

            <div className="flex items-center gap-2 mt-2">
              {!isEvol && (
                <Input
                  id="txETT"
                  type="number"
                  min={0}
                  name="txETT"
                  placeholder="ej. 12"
                  value={treatment.txETT}
                  onChange={handleTreatmentEvolChange}
                />
              )}

              <Select
                name={isEvol ? 'txEvolDoc' : 'txETTUnit'}
                value={isEvol ? treatment.txEvolDoc : treatment.txETTUnit}
                onValueChange={(value) => {
                  setTreatment({
                    ...treatment,
                    [isEvol ? 'txEvolDoc' : 'txETTUnit']: value,
                  });
                }}
              >
                <SelectTrigger className={isEvol ? 'w-full' : 'w-[180px]'}>
                  <SelectValue placeholder={isEvol ? 'Select a doctor' : 'Select a unit'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{isEvol ? 'Doctors' : 'Time (Unit)'}</SelectLabel>

                    {isEvol ? (
                      <>
                        <SelectItem value="Dra. Sandra Peña">Dra. Sandra Peña</SelectItem>
                        <SelectItem value="Dra. Paola Urbina">Dra. Paola Urbina</SelectItem>
                        <SelectItem value="Dr. Kevin Collazos">Dr. Kevin Collazos</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Years">Years</SelectItem>
                        <SelectItem value="Months">Months</SelectItem>
                        <SelectItem value="Days">Days</SelectItem>
                        <SelectItem value="Hours">Hours</SelectItem>
                        <SelectItem value="Minutes">Minutes</SelectItem>
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor={isEvol ? 'txEvolDate' : 'txStartDate'}>
            {isEvol ? 'Treatment evolution date' : 'Treatment start date'}
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={isEvol ? 'txEvolDate' : 'txStartDate'}
                type="button"
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal mt-2',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'P') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate as Date}
                onSelect={(date) => {
                  setTreatment({
                    ...treatment,
                    [isEvol ? 'txEvolDate' : 'txStartDate']: date as Date,
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <Label htmlFor={isEvol ? 'txEvolPayment' : 'txPrice'}>
            {isEvol ? 'Treatment evolution amount paid' : 'Treatment price'} (COP)
          </Label>

          <Input
            id={isEvol ? 'txEvolPayment' : 'txPrice'}
            type="number"
            min={0}
            name={isEvol ? 'txEvolPayment' : 'txPrice'}
            placeholder="ej. 1000000"
            value={isEvol ? treatment.txEvolPayment : treatment.txPrice}
            onChange={handleTreatmentEvolChange}
            className="mt-2"
            startDecorator="COP"
          />
        </div>

        <DialogFooter>
          <Button type="button" onClick={addNew}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
