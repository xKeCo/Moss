'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { useTreatmentsStore } from '@/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from 'sonner';

const FormSchema = z.object({
  diagnosis: z
    .string()
    .min(5, {
      message: 'Diagnosis must be at least 5 characters.',
    })
    .max(100, {
      message: 'Diagnosis must be at most 100 characters.',
    }),
  prognosis: z
    .string()
    .min(5, {
      message: 'Prognosis must be at least 5 characters.',
    })
    .max(100, {
      message: 'Prognosis must be at most 100 characters.',
    }),
});

export const TreatmentForm = ({
  odontogramState,
}: {
  odontogramState: IToothState[];
}) => {
  const initialTreatment: IRealTxPlan = {
    txId: uuidv4(),
    txPhase: `Fase 1`,
    txActivity: '',
    txETT: '',
    txETTUnit: 'Months',
    txStartDate: new Date(),
    txPrice: '',
  };

  const initialEvolTreatment: ITxEvolution = {
    txEvolId: uuidv4(),
    txEvolDate: new Date(),
    txEvolDesc: '',
    txEvolDoc: '',
    txEvolPayment: '',
  };
  const router = useRouter();

  const { startSavingTreatment } = useTreatmentsStore();
  const { id: patientId } = useParams() as { id: string };
  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [openTreatmentEvolModal, setOpenTreatmentEvolModal] = useState(false);

  const [treatment, setTreatment] = useState<IRealTxPlan>(initialTreatment);
  const [treatments, setTreatments] = useState<IRealTxPlan[]>([]);

  const [treatmentEvolution, setTreatmentEvolution] =
    useState<ITxEvolution>(initialEvolTreatment);
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      diagnosis: '',
      prognosis: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (treatments.length === 0) {
      toast.error('You must add at least one treatment plan.');
      return;
    }

    startSavingTreatment({
      ...data,
      patientId: `${patientId}`,
      initialOdontogram: odontogramState.filter((n) => n),
      realTxPlan: treatments,
      txEvolutions: treatmentsEvolutions,
    });

    cancelSubmit();
  }

  function cancelSubmit() {
    form.reset({
      diagnosis: '',
      prognosis: '',
    });

    setTreatments([]);
    setTreatmentsEvolutions([]);
    router.push(`/dashboard/patient/${patientId}`);
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
                <>
                  {id === 1 ? (
                    <>
                      {treatments.map((item, index) => (
                        <TreatmentItem
                          key={item.txId}
                          item={item}
                          index={index}
                          treatments={treatments}
                          setTreatment={setTreatment}
                          setTreatments={setTreatments}
                          setOpen={setOpenTreatmentModal}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {treatmentsEvolutions.map((item, index) => (
                        <TreatmentEvolItem
                          key={item.txEvolId}
                          item={item}
                          index={index}
                          treatmentsEvols={treatmentsEvolutions}
                          setTreatmentEvol={setTreatmentEvolution}
                          setTreatmentsEvols={setTreatmentsEvolutions}
                          setOpenEvol={setOpenTreatmentEvolModal}
                        />
                      ))}
                    </>
                  )}
                </>
              </div>
            )}
          </div>
        ))}
        <Button type="button" variant="secondary" className="mr-4" onClick={cancelSubmit}>
          Cancel
        </Button>
        <Button type="submit">Save treatment</Button>
      </form>
    </Form>
  );
};
