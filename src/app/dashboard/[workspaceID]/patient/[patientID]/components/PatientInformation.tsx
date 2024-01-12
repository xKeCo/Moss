import { Fragment } from 'react';
import { PatientInfoItem } from '.';
import {
  formatBloodType,
  formatDate,
  formatGender,
  formatMaritalStatus,
  formatPhone,
  getAge,
} from '@/helpers';
import { IPatient } from '@/interfaces';

interface IInformationValues {
  label: string;
  value: string;
  colSpan?: number;
  show?: boolean;
}

interface IPatientInformationProps {
  patientInfo: IPatient;
}

export const PatientInformation = ({ patientInfo }: IPatientInformationProps) => {
  const informationValues: IInformationValues[] = [
    {
      label: 'Gender',
      value: formatGender(patientInfo?.BasicInformation?.gender!),
      show: true,
    },
    {
      label: 'Date of birth',
      value: formatDate(patientInfo?.BasicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: 'Age',
      value: getAge(patientInfo?.BasicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: '#. Identificación',
      value: patientInfo?.dniNumber,
      show: true,
    },
    {
      label: 'Height',
      value: patientInfo?.BasicInformation?.height! + ' cm',
      show: true,
    },
    {
      label: 'Weight',
      value: patientInfo?.BasicInformation?.weight! + ' kg',
      show: true,
    },
    {
      label: 'Blood type',
      value: formatBloodType(patientInfo?.BasicInformation?.bloodType!),
      show: true,
    },
    {
      label: 'EPS',
      value: patientInfo?.MedicalInformation?.EPSName?.toUpperCase()!,
      show: true,
    },
    {
      label: 'Address',
      value: patientInfo?.ContactInformation?.address!,
      show: true,
      colSpan: 2,
    },
    {
      label: 'Phone',
      value: formatPhone(patientInfo?.ContactInformation?.phone1!),
      show: true,
    },
    {
      label: 'Phone 2',
      value: formatPhone(patientInfo?.ContactInformation?.phone2!),
      show: patientInfo?.ContactInformation?.phone2 !== '',
    },
    {
      label: 'Marital status',
      value: formatMaritalStatus(patientInfo?.BasicInformation?.maritalStatus!),
      show: patientInfo?.ContactInformation?.phone2 === '',
    },
    {
      label: 'Emergency contact name',
      value: patientInfo?.ContactInformation?.emergencyContactName!,
      show: true,
      colSpan: 2,
    },
    {
      label: 'E. Phone',
      value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone!),
      show: true,
    },
    {
      label: 'E. Phone 2',
      value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone2!),
      show: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 w-full gap-3 rounded-2xl p-5 border col-span-4 items-center">
      {informationValues.map((value) => (
        <Fragment key={value.label}>
          {value.show && (
            <PatientInfoItem
              label={value.label}
              value={value.value}
              colSpan={value.colSpan}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
