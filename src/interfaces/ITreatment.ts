import { IToothState } from '.';

export interface ITreatment {
  id: string;
  diagnosis: string;
  prognosis: string;

  patientId: string;

  InitialOdontogram?: IToothState[] | null;
  RealTxPlan?: IRealTxPlan[] | null;
  TxEvolutions?: ITxEvolution[] | null;

  totalPrice: number;
  totalPaid: number;
  totalPending: number;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export interface IRealTxPlan {
  id: string;
  txPhase: string;
  txActivity: string;
  txETT: string;
  txETTUnit: string;
  txStartDate: string | Date;
  txPrice: string;
  txActive?: boolean;
}

export interface ITxEvolution {
  id: string;
  txEvolDate: string | Date;
  txEvolDesc: string;
  txEvolDoc: string;
  txEvolPayment: string;
  txEvolActive?: boolean;
}
