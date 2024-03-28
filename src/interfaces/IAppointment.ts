export interface IAppointment {
  id: string;
  date: string | Date;
  startTime: string;
  startTimeAMPM: string;
  endTime: string;
  endTimeAMPM: string;
  treatment: string;
  description?: string | null;
  status: any;
  doctor: string;
  office: string;
  emailSent: boolean;
  SMSsent: boolean;
  WhatsAppSent: boolean;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
