'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AddTreatmentEvolution,
  AddTreatmentPlan,
  EmptyTreatmentItem,
  TreatmentEvolItem,
  TreatmentItem,
} from '@/components';
import { Button, Label } from '@/components/ui';
import { IRealTxPlan, ITxEvolution } from '@/interfaces';
import { useTreatmentsStore } from '@/hooks';
import { useRouter } from 'next/navigation';

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
  const { activeTreatment, startSavingTreatment } = useTreatmentsStore();
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
    cancelSubmit();
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
                <p className="text-base mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-3">
          <h1 className="text-xl xl:text-xl font-semibold mt-2">Actual treatment plan</h1>
          <AddTreatmentPlan
            openPlan={openTreatmentModal}
            setOpenPlan={setOpenTreatmentModal}
            treatmentPlan={treatment}
            treatmentsPlan={treatments}
            setTreatmentPlan={setTreatment}
            setTreatmentsPlan={setTreatments}
          />
        </div>

        {activeTreatment?.realTxPlan && (
          <>
            {treatments.length === 0 ? (
              <EmptyTreatmentItem />
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div>
        <div className="flex justify-between mb-3">
          <h1 className="text-xl xl:text-xl font-semibold mt-2">Actual treatment plan</h1>
          <AddTreatmentEvolution
            openEvol={openTreatmentEvolModal}
            setOpenEvol={setOpenTreatmentEvolModal}
            treatmentEvol={treatmentEvolution}
            treatmentsEvols={treatmentsEvolutions}
            setTreatmentEvol={setTreatmentEvolution}
            setTreatmentsEvols={setTreatmentsEvolutions}
          />
        </div>

        {activeTreatment?.txEvolutions && (
          <>
            {treatmentsEvolutions.length === 0 ? (
              <EmptyTreatmentItem evolution />
            ) : (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
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
              </div>
            )}
          </>
        )}
      </div>

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
