import { IToothState } from '.';

export interface ITreatment {
  _id?: string;
  diagnosis: string;
  prognosis: string;
  patientId: string;
  patientName?: string;
  initialOdontogram: IToothState[];
  realTxPlan: IRealTxPlan[];
  txEvolutions: ITxEvolution[];
  totalPrice?: number;
  totalPaid?: number;
  balance?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IRealTxPlan {
  txId: string;
  txPhase: string;
  txActivity: string;
  txETT: string;
  txETTUnit: string;
  txStartDate: string | Date;
  txPrice: string;
  txActive?: boolean;
}

export interface ITxEvolution {
  txEvolId: string;
  txEvolDate: string | Date;
  txEvolDesc: string;
  txEvolDoc: string;
  txEvolPayment: string;
  txEvolActive?: boolean;
}
