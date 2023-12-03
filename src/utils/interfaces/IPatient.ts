export interface IPatient {
  name: string;
  gender: 'M' | 'F';
  bloodType: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  age: string;
  dniType: 'CC' | 'TI' | 'OTRO';
  dniNumber: string;
  birthDate: string;
  birthPlace: string;
  email: string;
  address: string;
  phone: string;
  height: string;
  weight: string;
  civilStatus: 'S' | 'C' | 'V' | 'D' | 'MENOR';
  occupation: string;
  phone2?: string;
  EPSActive: boolean;
  EPSName: string;
  visitedDoctor: boolean;
  doctorType?: 'GENERAL' | 'ESPECIALISTA';
  inTreatment: boolean;
  treatment?: string;
  boneScan: boolean;
  boneScanType?: string;
}
