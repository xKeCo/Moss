'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { AddTreatmentItem, EmptyTreatmentItem, Icons, TreatmentItem } from '@/components';
import { Button } from '@/components/ui';
import type { IRealTxPlan, ITreatment, ITxEvolution } from '@/interfaces';
import { navigate, updateTreatment } from '@/actions';

export const TreatmentBasicInfo = ({
  treatmentInfo,
  params,
}: {
  treatmentInfo: ITreatment;
  params?: { workspaceID: string; patientID: string; treatmentID: string };
}) => {
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

  const treatmentsAndEvolutionsItems = [
    {
      id: 1,
      title: 'Actual treatment plan',
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
      title: 'Treatment evolution',
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

  const cancelSubmit = async () => {
    setTreatmentPlan(initialTreatment);
    setTreatmentsPlan([]);
    setTreatmentEvolution(initialEvolTreatment);
    setTreatmentsEvolutions([]);

    if (
      treatmentsPlan.length !== treatmentInfo?.RealTxPlan?.length ||
      treatmentsEvolutions.length !== treatmentInfo?.TxEvolutions?.length
    ) {
      await navigate(
        `/dashboard/${params?.workspaceID}/patient/${params?.patientID}/treatment/${params?.treatmentID}`
      );
      return;
    }

    router.back();
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

  const validateShowSaveButton = () => {
    if (
      treatmentsPlan.length !== treatment?.RealTxPlan?.length ||
      treatmentsEvolutions.length !== treatment?.TxEvolutions?.length
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (treatment) {
      setTreatmentsPlan(treatment?.RealTxPlan!);
      setTreatmentsEvolutions(treatment.TxEvolutions!);
    }
  }, [treatment]);

  return (
    <div className="space-y-6">
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
            <EmptyTreatmentItem evolution={isEvol} />
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
