import { ITreatment } from '.';

export interface IPatient {
  id?: string;
  name: string;
  dniNumber: string;
  dniType: 'CC' | 'TI' | 'O';
  email: string;
  photoURL?: string | null;
  reasonForConsultation: string;
  currentIllness: string;

  workspaceId?: string;
  termsAndConditions: boolean;
  hasExtraInfo?: boolean;
  updatedAt?: string | Date;
  createdAt?: string | Date;

  BasicInformation: IBasicInformation | null;
  ContactInformation: IContactInformation | null;
  MedicalInformation: IMedicalInformation | null;
  Treatment: ITreatment | null;
  healthInformation?: IHealthInformation | null;
}

export interface IBasicInformation {
  id?: string;
  gender: 'M' | 'F' | 'O';
  bloodType:
    | 'O_POSITIVE'
    | 'O_NEGATIVE'
    | 'A_POSITIVE'
    | 'A_NEGATIVE'
    | 'B_POSITIVE'
    | 'B_NEGATIVE'
    | 'AB_POSITIVE'
    | 'AB_NEGATIVE';
  birthDate: string | Date;
  birthPlace: string;
  height: string;
  weight: string;
  maritalStatus: 'S' | 'C' | 'V' | 'U' | 'D' | 'M';
  occupation: string;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IContactInformation {
  id?: string;
  address: string;
  phone1: string;
  phone2?: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactPhone2?: string | null;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IMedicalInformation {
  id?: string;
  EPSActive: boolean;
  EPSName?: string | null;
  visitedDoctor: boolean;
  doctorType?: 'G' | 'E' | null;
  inTreatment: boolean;
  treatmentName?: string | null;
  boneScan: boolean;
  boneScanType?: string | null;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IHealthInformation {
  systemReview: ISystemReview;
  familyBackground: IFamilyBackground;
  personalBackground: IPersonalBackground;
  oralSystemReview: IOralSystemReview;
}

export interface ISystemReview {
  head: string;
  neck: string;
  genitourinary: string;
  eyes: string;
  cardiovascular: string;
  locomotor: string;
  ORL: string;
  respiratory: string;
  skin: string;
  stomological: string;
  gastrointestinal: string;
  circulatory: string;
}

export interface IFamilyBackground {
  diabetes: boolean;
  familyDiabetes?: string | null;
  cancer: boolean;
  familyCancer?: string | null;
  leukemia: boolean;
  familyLeukemia?: string | null;
  heartDisease: boolean;
  familyHeartDisease?: string | null;
  hypertension: boolean;
  familyHypertension?: string | null;
  others: boolean;
  familyOthers?: string | null;
}

export interface IPersonalBackground {
  allergies: string[];
  medications: string[];
  habits: string;
  habitsDescription?: string | null;
  diabetes: boolean;
  cancer: boolean;
  leukemia: boolean;
  heartDisease: boolean;
  surgeries: boolean;
  surgeriesDescription?: string | null;
  hospitalization: boolean;
  psychological: boolean;
  hypertension: boolean;
  others: boolean;
  othersDescription?: string | null;
}

export interface IOralSystemReview {
  faneras: string;
  oralCavity: string;
  teeth: string;
  tongue: string;
  ATMLeft: string;
  ATMRight: string;
  salivaryGlands: string;
  occlusion: string;
  teethColor: string;
  painThreshold: string;
  maxMandibularOpening: string;
  leftLaterality: string;
  rightLaterality: string;
  protrusion: string;
  jointSounds: string;
}

export interface IPatientCard {
  name: string;
  dniNumber: string;
  email: string;
  photoURL: string | null;
}
