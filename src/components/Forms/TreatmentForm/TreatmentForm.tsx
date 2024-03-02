'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';
import { AddTreatmentItem, EmptyTreatmentItem, Icons, TreatmentItem } from '@/components';
import { treatmentFormSchema } from '@/lib/validations';
import { createTreatment, navigate } from '@/actions';
import type { IRealTxPlan, IToothState, ITxEvolution } from '@/interfaces';

interface ITreatmentFormProps {
  odontogramState: IToothState[];
  workspaceID: string;
  patientID: string;
}

type TreatmentFormData = z.infer<typeof treatmentFormSchema>;

export const TreatmentForm = ({ odontogramState, workspaceID, patientID }: ITreatmentFormProps) => {
  const initialTreatment: IRealTxPlan = {
    id: uuidv4(),
    txPhase: `Fase 1`,
    txActivity: '',
    txETT: '',
    txETTUnit: 'Months',
    txStartDate: new Date(),
    txPrice: '',
  };

  const initialEvolTreatment: ITxEvolution = {
    id: uuidv4(),
    txEvolDate: new Date(),
    txEvolDesc: '',
    txEvolDoc: 'Dra. Sandra Peña',
    txEvolPayment: '',
  };
  const router = useRouter();

  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [openTreatmentEvolModal, setOpenTreatmentEvolModal] = useState(false);

  const [treatmentPlan, setTreatmentPlan] = useState<IRealTxPlan>(initialTreatment);
  const [treatmentsPlan, setTreatmentsPlan] = useState<IRealTxPlan[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [treatmentEvolution, setTreatmentEvolution] = useState<ITxEvolution>(initialEvolTreatment);
  const [treatmentsEvolutions, setTreatmentsEvolutions] = useState<ITxEvolution[]>([]);

  const treatmentsAndEvolutionsItems = [
    {
      id: 1,
      title: 'Plan de tratamiento actual',
      array: treatmentsPlan,
      isEvol: false,
      modalInformation: {
        openModal: openTreatmentModal,
        setOpenModal: setOpenTreatmentModal,
        treatment: treatmentPlan,
        setTreatment: setTreatmentPlan,
        treatments: treatmentsPlan,
        setTreatments: setTreatmentsPlan,
        initialTreatment: initialTreatment,
      },
    },
    {
      id: 2,
      title: 'Evolución del tratamiento',
      array: treatmentsEvolutions,
      isEvol: true,
      modalInformation: {
        openModal: openTreatmentEvolModal,
        setOpenModal: setOpenTreatmentEvolModal,
        treatment: treatmentEvolution,
        setTreatment: setTreatmentEvolution,
        treatments: treatmentsEvolutions,
        setTreatments: setTreatmentsEvolutions,
        initialTreatment: initialEvolTreatment,
      },
    },
  ];

  const hasNonZeroCavities = (obj: any) => {
    for (const key in obj) {
      if (obj[key] !== 0) {
        return true;
      }
    }
    return false;
  };

  const filterNonZeroCavities = (odontogramState: any[]) => {
    return odontogramState.filter((n) => {
      const {
        cavities,
        extract,
        absent,
        crown,
        endodontics,
        filter,
        unerupted,
        implant,
        regeneration,
      } = n;
      return (
        hasNonZeroCavities(cavities) ||
        extract !== 0 ||
        absent !== 0 ||
        crown !== 0 ||
        endodontics !== 0 ||
        filter !== 0 ||
        unerupted !== 0 ||
        implant !== 0 ||
        regeneration !== 0
      );
    });
  };

  const form = useForm<TreatmentFormData>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues: {
      diagnosis: '',
      prognosis: '',
    },
  });

  async function onSubmit(data: TreatmentFormData) {
    if (treatmentsPlan.length === 0) {
      toast.error('Debe agregar al menos un plan de tratamiento.');
      return;
    }

    const filteredOdontogramState = filterNonZeroCavities(odontogramState);

    setIsLoading(true);

    const treatmentCreated = await createTreatment(
      {
        ...data,
        InitialOdontogram: filteredOdontogramState,
        RealTxPlan: treatmentsPlan,
        TxEvolutions: treatmentsEvolutions,
      },
      patientID
    );
    setIsLoading(false);
    if (!treatmentCreated.ok) {
      toast.error(treatmentCreated.errorMessage);
      return;
    }

    navigate(`/dashboard/${workspaceID}/patient/${patientID}`);

    toast.success('Tratamiento creado con éxito.');
  }

  async function cancelSubmit() {
    form.reset({
      diagnosis: '',
      prognosis: '',
    });

    setTreatmentsPlan([]);
    setTreatmentsEvolutions([]);
    router.push(`/dashboard/${workspaceID}/patient/${patientID}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-6">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Diagnóstico</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prognosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Pronóstico</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {treatmentsAndEvolutionsItems.map(({ id, title, array, isEvol, modalInformation }) => (
          <div key={id}>
            <div className="flex justify-between mb-3">
              <h1 className="text-xl xl:text-xl font-semibold">{title}</h1>

              <AddTreatmentItem
                openModal={modalInformation.openModal}
                setOpenModal={modalInformation.setOpenModal}
                treatment={modalInformation.treatment}
                treatments={modalInformation.treatments}
                setTreatment={modalInformation.setTreatment}
                setTreatments={modalInformation.setTreatments}
                initialTreatment={modalInformation.initialTreatment}
                isEvol={isEvol}
              />
            </div>

            {array.length === 0 ? (
              <EmptyTreatmentItem isEvol={isEvol} />
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {modalInformation.treatments.map((item, index) => (
                  <TreatmentItem
                    key={item.id}
                    item={item}
                    index={index}
                    treatments={modalInformation.treatments}
                    setTreatment={modalInformation.setTreatment}
                    setTreatments={modalInformation.setTreatments}
                    setOpenModal={modalInformation.setOpenModal}
                    initialTreatment={modalInformation.initialTreatment}
                    isEvol={isEvol}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        <Button type="button" variant="secondary" className="mr-4" onClick={cancelSubmit}>
          Cancelar
        </Button>
        <Button type="submit">
          {isLoading && <Icons.Spinner className="animate-spin mr-2 h-5 w-5 text-white" />}
          Guardar tratamiento
        </Button>
      </form>
    </Form>
  );
};
