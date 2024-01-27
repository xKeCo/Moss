'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import {
  AddTreatmentEvolution,
  AddTreatmentPlan,
  EmptyTreatmentItem,
  Icons,
  TreatmentEvolItem,
  TreatmentItem,
} from '@/components';
import { Button } from '@/components/ui';
import type { IRealTxPlan, ITreatment, ITxEvolution } from '@/interfaces';
import { updateTreatment } from '@/actions';

export const TreatmentBasicInfo = ({ treatmentInfo }: { treatmentInfo: ITreatment }) => {
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

  const [treatment, setTreatment] = useState<ITreatment>(treatmentInfo);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [openTreatmentEvolModal, setOpenTreatmentEvolModal] = useState(false);

  const [treatmentEvolution, setTreatmentEvolution] = useState<ITxEvolution>(initialEvolTreatment);
  const [treatmentsEvolutions, setTreatmentsEvolutions] = useState<ITxEvolution[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<IRealTxPlan>(initialTreatment);
  const [treatmentsPlan, setTreatmentsPlan] = useState<IRealTxPlan[]>([]);

  const basicInfo = [
    { label: 'Diagnosis', value: treatment?.diagnosis },
    { label: 'Prognosis', value: treatment?.prognosis },
  ];

  const treatmentsAndEvolutionsItems = [
    {
      id: 1,
      title: 'Actual treatment plan',
      array: treatmentsPlan,
      isEvol: false,
    },
    {
      id: 2,
      title: 'Treatment evolution',
      array: treatmentsEvolutions,
      isEvol: true,
    },
  ];

  const cancelSubmit = () => {
    setTreatmentPlan(initialTreatment);
    setTreatmentsPlan([]);
    setTreatmentEvolution(initialEvolTreatment);
    setTreatmentsEvolutions([]);
    router.back();
  };

  const validateShowSaveButton = () => {
    if (
      treatmentsPlan.length !== treatment?.RealTxPlan?.length ||
      treatmentsEvolutions.length !== treatment?.TxEvolutions?.length
    ) {
      return true;
    }
    return false;
  };

  const saveTreatment = async () => {
    if (treatment) {
      setIsLoading(true);

      const treatmentData = {
        ...treatment,
        RealTxPlan: treatmentsPlan,
        TxEvolutions: treatmentsEvolutions,
      };

      const {
        Patient,
        updatedAt,
        totalPending,
        totalPaid,
        totalPrice,
        InitialOdontogram,
        ...rest
      } = treatmentData;

      const { ok, updatedTreatment, errorMessage } = await updateTreatment(rest, treatment?.id);

      setIsLoading(false);

      if (!ok) {
        toast.error(errorMessage);
        return;
      }

      setTreatment(updatedTreatment!);
      setTreatmentsPlan(updatedTreatment?.RealTxPlan!);
      setTreatmentsEvolutions(updatedTreatment?.TxEvolutions!);

      toast.success('Treatment updated successfully.');
    }
  };

  const renderTreatmentItems = ({
    id,
    array,
    isEvol,
  }: {
    id: number;
    array: IRealTxPlan[] | ITxEvolution[];
    isEvol: boolean;
  }) => {
    if (array.length === 0) {
      return <EmptyTreatmentItem evolution={isEvol} />;
    } else {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {id === 1
            ? treatmentsPlan.map((item, index) => (
                <TreatmentItem
                  key={item.id}
                  item={item}
                  index={index}
                  treatments={treatmentsPlan}
                  setTreatment={setTreatmentPlan}
                  setTreatments={setTreatmentsPlan}
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
      );
    }
  };

  useEffect(() => {
    if (treatment) {
      setTreatmentsPlan(treatment?.RealTxPlan!);
      setTreatmentsEvolutions(treatment.TxEvolutions!);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treatment]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl xl:text-xl font-semibold mt-2">Basic information</h1>

        <div className="mt-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {basicInfo.map((item) => (
              <div key={item.label}>
                <p className="text-base font-medium text-muted-foreground">{item.label}</p>
                {/* {loading ? (
                  <Skeleton className="h-6 w-full mt-2" />
                ) : ( */}
                <p className="text-base mt-2">{item.value}</p>
                {/* )} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {treatmentsAndEvolutionsItems.map(({ id, title, array, isEvol }) => (
        <div key={id}>
          <div className="flex justify-between mb-3">
            <h1 className="text-xl xl:text-xl font-semibold">{title}</h1>

            {id === 1 ? (
              <AddTreatmentPlan
                openPlan={openTreatmentModal}
                setOpenPlan={setOpenTreatmentModal}
                treatmentPlan={treatmentPlan}
                treatmentsPlan={treatmentsPlan}
                setTreatmentPlan={setTreatmentPlan}
                setTreatmentsPlan={setTreatmentsPlan}
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
          {/* {loading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Alert className="flex flex-col" key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-6 w-32 mb-1" />

                    <Skeleton className="h-6 w-32" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start justify-center gap-2 w-full">
                      <Skeleton className="h-6 w-full" />

                      <Skeleton className="h-6 w-48" />
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          ) : ( */}

          {renderTreatmentItems({ id, array, isEvol })}
        </div>
      ))}

      <Button type="button" variant="secondary" className="mr-4" onClick={cancelSubmit}>
        Cancel
      </Button>
      {validateShowSaveButton() && (
        <Button type="button" onClick={saveTreatment} disabled={isLoading}>
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save treatment
        </Button>
      )}
    </div>
  );
};
