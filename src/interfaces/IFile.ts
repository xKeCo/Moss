export interface IFile {
  id?: string;
  ETag: string;
  name: string;
  extension: string;
  url: string;
  type: string;
  size: number;
  fileKey: string;
  patientId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
