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
import {
  AddTreatmentEvolution,
  AddTreatmentPlan,
  EmptyTreatmentItem,
  TreatmentEvolItem,
  TreatmentItem,
} from './components';
import type { IRealTxPlan, IToothState, ITxEvolution } from '@/interfaces';
import { treatmentFormSchema } from '@/lib/validations';
import { createTreatment, navigate } from '@/actions';
import { Icons } from '..';

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
    txEvolDoc: '',
    txEvolPayment: '',
  };
  const router = useRouter();

  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [openTreatmentEvolModal, setOpenTreatmentEvolModal] = useState(false);

  const [treatment, setTreatment] = useState<IRealTxPlan>(initialTreatment);
  const [treatments, setTreatments] = useState<IRealTxPlan[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [treatmentEvolution, setTreatmentEvolution] = useState<ITxEvolution>(initialEvolTreatment);
  const [treatmentsEvolutions, setTreatmentsEvolutions] = useState<ITxEvolution[]>([]);

  const treatmentsAndEvolutionsItems = [
    {
      id: 1,
      title: 'Actual treatment plan',
      array: treatments,
      isEvol: false,
    },
    {
      id: 2,
      title: 'Treatment evolution',
      array: treatmentsEvolutions,
      isEvol: true,
    },
  ];

  const form = useForm<TreatmentFormData>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues: {
      diagnosis: '',
      prognosis: '',
    },
  });

  async function onSubmit(data: TreatmentFormData) {
    if (treatments.length === 0) {
      toast.error('You must add at least one treatment plan.');
      return;
    }

    setIsLoading(true);

    const treatmentCreated = await createTreatment(
      {
        ...data,
        InitialOdontogram: odontogramState.filter((n) => n),
        RealTxPlan: treatments,
        TxEvolutions: treatmentsEvolutions,
      },
      patientID
    );

    setIsLoading(false);

    if (!treatmentCreated.ok) {
      toast.error(treatmentCreated.errorMessage);
      return;
    }

    toast.success('Treatment created successfully.');
    await navigate(`/dashboard/${workspaceID}/patient/${patientID}`);
  }

  async function cancelSubmit() {
    form.reset({
      diagnosis: '',
      prognosis: '',
    });

    setTreatments([]);
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
                <FormLabel className="text-base">Diagnosis</FormLabel>
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
                <FormLabel className="text-base">Prognosis</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {treatmentsAndEvolutionsItems.map(({ id, title, array, isEvol }) => (
          <div key={id}>
            <div className="flex justify-between mb-3">
              <h1 className="text-xl xl:text-xl font-semibold">{title}</h1>

              {id === 1 ? (
                <AddTreatmentPlan
                  openPlan={openTreatmentModal}
                  setOpenPlan={setOpenTreatmentModal}
                  treatmentPlan={treatment}
                  treatmentsPlan={treatments}
                  setTreatmentPlan={setTreatment}
                  setTreatmentsPlan={setTreatments}
                />
              ) : (
                <AddTreatmentEvolution
                  openEvol={openTreatmentEvolModal}
                  setOpenEvol={setOpenTreatmentEvolModal}
                  treatmentEvol={treatmentEvolution}
                  treatmentsEvols={treatmentsEvolutions}
                  setTreatmentEvol={setTreatmentEvolution}
                  setTreatmentsEvols={setTreatmentsEvolutions}
                />
              )}
            </div>

            {array.length === 0 ? (
              <EmptyTreatmentItem evolution={isEvol} />
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {id === 1
                  ? treatments.map((item, index) => (
                      <TreatmentItem
                        key={item.id}
                        item={item}
                        index={index}
                        treatments={treatments}
                        setTreatment={setTreatment}
                        setTreatments={setTreatments}
                        setOpen={setOpenTreatmentModal}
                      />
                    ))
                  : treatmentsEvolutions.map((item, index) => (
                      <TreatmentEvolItem
                        key={item.id}
                        item={item}
                        index={index}
                        treatmentsEvols={treatmentsEvolutions}
                        setTreatmentEvol={setTreatmentEvolution}
                        setTreatmentsEvols={setTreatmentsEvolutions}
                        setOpenEvol={setOpenTreatmentEvolModal}
                      />
                    ))}
              </div>
            )}
          </div>
        ))}
        <Button type="button" variant="secondary" className="mr-4" onClick={cancelSubmit}>
          Cancel
        </Button>
        <Button type="submit">
          {isLoading && <Icons.Spinner className="animate-spin mr-2 h-5 w-5 text-white" />}
          Save treatment
        </Button>
      </form>
    </Form>
  );
};
