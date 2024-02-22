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
          { field: 'txEvolDesc', errorMessage: 'La descripción de la evolución del tratamiento' },
          { field: 'txEvolDoc', errorMessage: 'El doctor de la evolución del tratamiento' },
          { field: 'txEvolDate', errorMessage: 'La fecha de la evolución del tratamiento' },
          {
            field: 'txEvolPayment',
            errorMessage: 'El valor pagado por la evolución del tratamiento',
          },
        ]
      : [
          { field: 'txActivity', errorMessage: 'La actividad del tratamiento (descripción)' },
          { field: 'txETT', errorMessage: 'El tiempo estimado de tratamiento' },
          { field: 'txStartDate', errorMessage: 'La fecha de inicio del tratamiento' },
          { field: 'txPrice', errorMessage: 'El precio del tratamiento' },
        ];

    for (const field of requiredFields) {
      if (!treatment[field.field]) {
        toast.error(`${field.errorMessage} es requerido.`);
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
          {isEvol ? 'Añadir evolución del tratamiento' : 'Añadir plan de tratamiento'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEvol ? 'Añadir evolución del tratamiento' : 'Añadir plan de tratamiento'}
          </DialogTitle>
          <DialogDescription>
            {isEvol
              ? 'Añade una nueva evolución del tratamiento a tu paciente.'
              : 'Añade un nuevo plan de tratamiento a tu paciente.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <Label htmlFor={isEvol ? 'txEvolDesc' : 'txActivity'}>
              {isEvol
                ? 'Evolución del tratamiento (descripción)'
                : 'Actividad del tratamiento (descripción)'}
            </Label>

            <Textarea
              id={isEvol ? 'txEvolDesc' : 'txActivity'}
              name={isEvol ? 'txEvolDesc' : 'txActivity'}
              placeholder="ej. Limpieza dental, extracción de muela, etc."
              value={isEvol ? treatment.txEvolDesc : treatment.txActivity}
              onChange={handleTreatmentEvolChange}
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor={isEvol ? 'txEvolDoc' : 'txETT'}>
              {isEvol
                ? 'Doctor de la evolución del tratamiento'
                : 'Tiempo estimado de tratamiento (ETT)'}
            </Label>

            <div className="flex items-center gap-2 mt-2">
              {!isEvol && (
                <Input
                  id="txETT"
                  min={0}
                  maxLength={3}
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
                  <SelectValue
                    placeholder={isEvol ? 'Seleccione un doctor' : 'Seleccione una unidad'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{isEvol ? 'Doctores' : 'Tiempo (Unidad)'}</SelectLabel>

                    {isEvol ? (
                      <SelectItem value="Dra. Sandra Peña">Dra. Sandra Peña</SelectItem>
                    ) : (
                      <>
                        <SelectItem value="Years">Años</SelectItem>
                        <SelectItem value="Months">Meses</SelectItem>
                        <SelectItem value="Days">Dias</SelectItem>
                        <SelectItem value="Hours">Horas</SelectItem>
                        <SelectItem value="Minutes">Minutos</SelectItem>
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
            {isEvol ? 'Fecha de realización de la evolución' : 'Fecha de inicio del tratamiento'}
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
                {selectedDate ? format(selectedDate, 'P') : <span>Selecciona una fecha</span>}
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
            {isEvol ? 'Valor pagado por la evolución' : 'Precio del tratamiento'} (COP)
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
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
