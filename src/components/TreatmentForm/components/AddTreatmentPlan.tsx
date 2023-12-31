'use client';
import { v4 as uuidv4 } from 'uuid';
import { CalendarIcon, PlusIcon } from '@radix-ui/react-icons';
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
import { IRealTxPlan } from '@/interfaces';

interface IAddTreatmentPlanProps {
  openPlan: boolean;
  setOpenPlan: React.Dispatch<React.SetStateAction<boolean>>;
  treatmentPlan: IRealTxPlan;
  treatmentsPlan: IRealTxPlan[];
  setTreatmentPlan: React.Dispatch<React.SetStateAction<IRealTxPlan>>;
  setTreatmentsPlan: React.Dispatch<React.SetStateAction<IRealTxPlan[]>>;
}

export const AddTreatmentPlan = ({
  openPlan,
  setOpenPlan,
  treatmentPlan,
  treatmentsPlan,
  setTreatmentPlan,
  setTreatmentsPlan,
}: IAddTreatmentPlanProps) => {
  const initialTreatment: IRealTxPlan = {
    txId: uuidv4(),
    txPhase: `Fase 1`,
    txActivity: '',
    txETT: '',
    txETTUnit: 'Months',
    txStartDate: new Date(),
    txPrice: '',
  };

  const handleTreatmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTreatmentPlan({
      ...treatmentPlan,
      [name]: value,
    });
  };

  const addNewTreatment = () => {
    const findTreatment = treatmentsPlan.find(
      (t: IRealTxPlan) => t.txId === treatmentPlan.txId
    );

    if (findTreatment) {
      const index = treatmentsPlan.findIndex(
        (t: IRealTxPlan) => t.txId === treatmentPlan.txId
      );

      treatmentsPlan[index] = treatmentPlan;

      setTreatmentsPlan([...treatmentsPlan]);
      setTreatmentPlan(initialTreatment);
      setOpenPlan(false);

      return;
    }

    setTreatmentsPlan([...treatmentsPlan, treatmentPlan]);
    setTreatmentPlan(initialTreatment);
    setOpenPlan(false);
  };

  return (
    <Dialog
      open={openPlan}
      onOpenChange={(openPlan) => {
        setOpenPlan(openPlan);
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add treatment plan
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new treatment plan</DialogTitle>
          <DialogDescription>Add a new treatment plan to your patient.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <Label htmlFor="txActivity">
              Treatment activity <span className="text-sm">(Description)</span>
            </Label>

            <Textarea
              id="txActivity"
              name="txActivity"
              placeholder="Root canal treatment"
              value={treatmentPlan.txActivity}
              onChange={handleTreatmentChange}
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="txETT">Estimated time of treatment</Label>

            <div className="flex items-center gap-2 mt-2">
              <Input
                id="txETT"
                type="number"
                min={0}
                name="txETT"
                placeholder="ej. 12"
                value={treatmentPlan.txETT}
                onChange={handleTreatmentChange}
              />

              <Select
                name="txETTUnit"
                value={treatmentPlan.txETTUnit}
                onValueChange={(value) => {
                  setTreatmentPlan({
                    ...treatmentPlan,
                    txETTUnit: value,
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Time <span className="text-sm">(Unit)</span>
                    </SelectLabel>
                    <SelectItem value="Years">Years</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Minutes">Minutes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="txStartDate">Treatment start date</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="txStartDate"
                type="button"
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal mt-2',
                  !treatmentPlan.txStartDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {treatmentPlan.txStartDate ? (
                  format(treatmentPlan.txStartDate, 'P')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={treatmentPlan.txStartDate as Date}
                onSelect={(date) => {
                  setTreatmentPlan({
                    ...treatmentPlan,
                    txStartDate: date as Date,
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="txPrice">
            Treatment price <span className="text-sm">(COP)</span>
          </Label>

          <Input
            id="txPrice"
            name="txPrice"
            type="number"
            min={0}
            placeholder="ej. 1000000"
            value={treatmentPlan.txPrice}
            onChange={handleTreatmentChange}
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
