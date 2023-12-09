export interface IPatient {
  name: string;
  dniNumber: string;
  dniType: 'CC' | 'TI' | 'O' | '';
  email: string;
  photoURL?: string;

  basicInformation: IBasicInformation;
  contactInformation: IContactInformation;
  medicalInformation: IMedicalInformation;
  // healthInformation: IHealthInformation;

  termsAndConditions: boolean;
}

interface IBasicInformation {
  gender: 'M' | 'F' | 'O' | '';
  bloodType: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | '';
  birthDate: Date | string;
  age: string;
  birthPlace: string;
  height: string;
  weight: string;
  maritalStatus: 'S' | 'C' | 'V' | 'D' | 'M' | '';
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
  doctorType?: 'G' | 'E' | '';
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
