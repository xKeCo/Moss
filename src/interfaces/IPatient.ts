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

interface IBasicInformation {
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

interface IContactInformation {
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

interface IMedicalInformation {
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

interface IHealthInformation {
  systemReview: ISystemReview;
  familyBackground: IFamilyBackground;
  personalBackground: IPersonalBackground;
  oralSystemReview: IOralSystemReview;
}

interface ISystemReview {
  head?: string;
  neck?: string;
  genitourinary?: string;
  eyes?: string;
  cardiovascular?: string;
  locomotor?: string;
  ORL?: string;
  respiratory?: string;
  skin?: string;
  stomological?: string;
  gastrointestinal?: string;
  circulatory?: string;
}

interface IFamilyBackground {
  diabetes: boolean;
  familyDiabetes?: string;
  cancer: boolean;
  familyCancer?: string;
  leukemia: boolean;
  familyLeukemia?: string;
  heartDisease: boolean;
  familyHeartDisease?: string;
  hypertension: boolean;
  familyHypertension?: string;
  others: string;
}

interface IPersonalBackground {
  allergies: string[];
  medications: string[];
  habits: string;
  diseases: string;
  diabetes: boolean;
  cancer: boolean;
  leukemia: boolean;
  heartDisease: boolean;
  surgeries: boolean;
  surgeriesDescription: string;
  hospitalization: boolean;
  psychological: boolean;
  hypertension: boolean;
  others: string;
}

interface IOralSystemReview {
  faneras: string;
  oralCavity: string;
  teeth: string;
  tongue: string;
  ATM: string;
  salivaryGlands: string;
  occlusion: string;
  teethColor: string;
  painThreshold: string;
  maxMandibularOpening: string;
  leftLaterality: string;
  rightLaterality: string;
  protrusion: string;
  jointSounds: string;

  // oralMucosa: string;
  // lips: string;
  // palate: string;
  // gums: string;
  // temporomandibularJoint: string;
  // oropharynx: string;
  // tonsils: string;
  // floorOfTheMouth: string;
  // other: string;
}

export interface IPatientCard {
  name: string;
  dniNumber: string;
  email: string;
  photoURL: string | null;
}
