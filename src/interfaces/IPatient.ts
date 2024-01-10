export interface IPatient {
  name: string;
  dniNumber: string;
  dniType: 'CC' | 'TI' | 'O';
  email: string;
  photoURL?: string;

  basicInformation: IBasicInformation;
  contactInformation: IContactInformation;
  medicalInformation: IMedicalInformation;
  // healthInformation: IHealthInformation;

  termsAndConditions: boolean;
  updatedAt?: string;
  createdAt?: string;
}

interface IBasicInformation {
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

  birthDate: Date | string;
  birthPlace: string;
  height: string;
  weight: string;
  maritalStatus: 'S' | 'C' | 'V' | 'U' | 'D' | 'M';
  occupation: string;
}

interface IContactInformation {
  address: string;
  phone1: string;
  phone2?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactPhone2?: string;
}

interface IMedicalInformation {
  EPSActive: boolean;
  EPSName?: string;
  visitedDoctor: boolean;
  doctorType?: 'G' | 'E';
  inTreatment: boolean;
  treatment?: string;
  boneScan: boolean;
  boneScanType?: string;
}

// interface IHealthInformation {
// allergies: string[];
// diseases: string[];
// medications: string[];
// surgeries: string[];
// familyBackground: string[];
// habits: string[];
// observations: string[];
// other: string[];
// }
