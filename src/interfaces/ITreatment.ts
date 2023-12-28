export interface ITreatment {
  _id: string;
  diagnosis: string;
  prognosis: string;
  treatment: string;
  patientId: string;
  realTxPlan: IRealTxPlan[];
  txEvolutions: ITxEvolution[];
  totalPrice: number;
  totalPaid: number;
  balance: number;
  updatedAt: string;
  createdAt: string;
}

interface IRealTxPlan {
  txPhase: string;
  txActivity: string;
  txETT: string;
  txStartDate: string;
  txPrice: number;
}

interface ITxEvolution {
  txEvolDate: string;
  txEvolDesc: string;
  txEvolId: string;
  txEvolDoc: string;
  txEvolPayment: number;
}
