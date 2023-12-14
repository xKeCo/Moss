import React from 'react';
import { usePatientsStore } from '@/hooks';
import { PatientInfoItem } from '.';
import {
  formatDate,
  formatGender,
  formatMaritalStatus,
  formatPhone,
  getAge,
} from '@/helpers';

interface IInformationValues {
  label: string;
  value: string;
  colSpan?: number;
  show?: boolean;
}

export const PatientInformation = () => {
  const { activePatient, loading } = usePatientsStore();

  const informationValues: IInformationValues[] = [
    {
      label: 'Gender',
      value: formatGender(activePatient?.basicInformation?.gender!),
      show: true,
    },
    {
      label: 'Date of birth',
      value: formatDate(activePatient?.basicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: 'Age',
      value: getAge(activePatient?.basicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: 'Cedula',
      value: `${activePatient?.dniType}. ${activePatient?.dniNumber}`,
      show: true,
    },
    {
      label: 'Height',
      value: activePatient?.basicInformation?.height! + ' cm',
      show: true,
    },
    {
      label: 'Weight',
      value: activePatient?.basicInformation?.weight! + ' kg',
      show: true,
    },
    {
      label: 'Blood type',
      value: activePatient?.basicInformation?.bloodType!,
      show: true,
    },
    {
      label: 'EPS',
      value: activePatient?.medicalInformation?.EPSName?.toUpperCase()!,
      show: true,
    },
    {
      label: 'Address',
      value: activePatient?.contactInformation?.address!,
      show: true,
      colSpan: 2,
    },
    {
      label: 'Phone',
      value: formatPhone(activePatient?.contactInformation?.phone1!),
      show: true,
    },
    {
      label: 'Phone 2',
      value: formatPhone(activePatient?.contactInformation?.phone2!),
      show: activePatient?.contactInformation?.phone2 !== '',
    },
    {
      label: 'Marital status',
      value: formatMaritalStatus(activePatient?.basicInformation?.maritalStatus!),
      show: activePatient?.contactInformation?.phone2 === '',
    },
    {
      label: 'Emergency contact name',
      value: activePatient?.contactInformation?.emergencyContactName!,
      show: true,
      colSpan: 2,
    },
    {
      label: 'E. Phone',
      value: formatPhone(activePatient?.contactInformation?.emergencyContactPhone!),
      show: true,
    },
    {
      label: 'E. Phone 2',
      value: formatPhone(activePatient?.contactInformation?.emergencyContactPhone2!),
      show: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 w-full gap-5 rounded-2xl p-6 border col-span-4">
      {informationValues.map((value) => (
        <React.Fragment key={value.label}>
          {value.show && (
            <PatientInfoItem
              label={value.label}
              value={value.value}
              colSpan={value.colSpan}
              loading={loading}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
