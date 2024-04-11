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
  statusChanged: boolean;
  doctor: string;
  office: string;
  emailSent: boolean;
  SMSsent: boolean;
  WhatsAppSent: boolean;

  suggestedDate?: string | Date;
  suggestedStartTime?: string;
  suggestedStartTimeAMPM?: string;
  suggestedEndTime?: string;
  suggestedEndTimeAMPM?: string;

  Patient: any;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
