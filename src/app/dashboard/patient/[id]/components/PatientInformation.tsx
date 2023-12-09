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
}

export const PatientInformation = () => {
  const { activePatient, loading } = usePatientsStore();

  const informationValues: IInformationValues[] = [
    {
      label: 'Gender',
      value: formatGender(activePatient?.basicInformation?.gender!),
    },
    {
      label: 'Date of birth',
      value: formatDate(activePatient?.basicInformation?.birthDate! as string),
    },
    {
      label: 'Age',
      value: getAge(activePatient?.basicInformation?.birthDate! as string),
    },
    {
      label: 'Cedula',
      value: `${activePatient?.dniType}. ${activePatient?.dniNumber}`,
    },
    {
      label: 'EPS',
      value: activePatient?.medicalInformation?.EPSName?.toUpperCase()!,
    },
    {
      label: 'Blood type',
      value: activePatient?.basicInformation?.bloodType!,
    },
    {
      label: 'Height',
      value: activePatient?.basicInformation?.height! + ' cm',
    },
    {
      label: 'Weight',
      value: activePatient?.basicInformation?.weight! + ' kg',
    },
    {
      label: 'Address',
      value: activePatient?.contactInformation?.address!,
      colSpan: 2,
    },
    {
      label: 'Phone 2',
      value: formatPhone(activePatient?.contactInformation?.phone2!),
    },
    {
      label: 'Marital status',
      value: formatMaritalStatus(activePatient?.basicInformation?.maritalStatus!),
    },
    {
      label: 'Emergency contact name',
      value: activePatient?.contactInformation?.emergencyContactName!,
      colSpan: 2,
    },
    {
      label: 'Emergency phone',
      value: formatPhone(activePatient?.contactInformation?.emergencyContactPhone!),
    },
    {
      label: 'Emergency phone 2',
      value: formatPhone(activePatient?.contactInformation?.emergencyContactPhone2!),
    },
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full gap-5 rounded-2xl p-6 border col-span-4">
      {informationValues.map((value) => (
        <PatientInfoItem
          key={value.label}
          label={value.label}
          value={value.value}
          colSpan={value.colSpan}
          loading={loading}
        />
      ))}
    </div>
  );
};
