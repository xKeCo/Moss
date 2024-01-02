'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  AddTreatmentEvolution,
  AddTreatmentPlan,
  EmptyTreatmentItem,
  TreatmentEvolItem,
  TreatmentItem,
} from '@/components';
import { Alert, Button, Label, Skeleton } from '@/components/ui';
import { IRealTxPlan, ITxEvolution } from '@/interfaces';
import { useTreatmentsStore } from '@/hooks';

export default function TreatmentBasicInfo() {
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
  const { loading, activeTreatment, startSavingTreatment } = useTreatmentsStore();
  const [openTreatmentModal, setOpenTreatmentModal] = useState(false);
  const [openTreatmentEvolModal, setOpenTreatmentEvolModal] = useState(false);

  const [treatmentEvolution, setTreatmentEvolution] =
    useState<ITxEvolution>(initialEvolTreatment);
  const [treatmentsEvolutions, setTreatmentsEvolutions] = useState<ITxEvolution[]>([]);
  const [treatment, setTreatment] = useState<IRealTxPlan>(initialTreatment);
  const [treatments, setTreatments] = useState<IRealTxPlan[]>([]);

  const basicInfo = [
    { label: 'Diagnosis', value: activeTreatment?.diagnosis },
    { label: 'Prognosis', value: activeTreatment?.prognosis },
  ];

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

  const cancelSubmit = () => {
    setTreatment(initialTreatment);
    setTreatments([]);
    setTreatmentEvolution(initialEvolTreatment);
    setTreatmentsEvolutions([]);
    router.back();
  };

  const validateShowSaveButton = () => {
    if (treatments.length !== activeTreatment?.realTxPlan.length) {
      return true;
    }
    if (treatmentsEvolutions.length !== activeTreatment?.txEvolutions.length) {
      return true;
    }
    return false;
  };

  const saveTreatment = () => {
    if (activeTreatment) {
      const treatmentData = {
        ...activeTreatment,
        realTxPlan: treatments,
        txEvolutions: treatmentsEvolutions,
      };

      startSavingTreatment(treatmentData);
    }
  };

  useEffect(() => {
    if (activeTreatment) {
      setTreatments(activeTreatment.realTxPlan);
      setTreatmentsEvolutions(activeTreatment.txEvolutions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTreatment]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl xl:text-xl font-semibold mt-2">Basic information</h1>

        <div className="mt-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {basicInfo.map((item) => (
              <div key={item.label}>
                <Label className="text-base text-muted-foreground">{item.label}</Label>
                {loading ? (
                  <Skeleton className="h-6 w-full mt-2" />
                ) : (
                  <p className="text-base mt-2">{item.value}</p>
                )}
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

          {loading ? (
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
          ) : array.length === 0 ? (
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
      {validateShowSaveButton() && (
        <Button type="button" onClick={saveTreatment}>
          Save treatment
        </Button>
      )}
    </div>
  );
}
