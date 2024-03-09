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
import { Button, Skeleton } from '@/components/ui';
import type { IPatient } from '@/interfaces';
import Link from 'next/link';

interface IInformationValues {
  label: string;
  value: string;
  colSpan?: number;
  show?: boolean;
  className?: string;
}

interface IPatientInformationProps {
  patientInfo: IPatient;
}

export const PatientInformation = ({ patientInfo }: IPatientInformationProps) => {
  const informationValues: IInformationValues[] = [
    {
      label: 'Género',
      value: formatGender(patientInfo?.BasicInformation?.gender!),
      show: true,
    },
    {
      label: 'F. Nacimiento',
      value: formatDate(patientInfo?.BasicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: 'Edad',
      value: getAge(patientInfo?.BasicInformation?.birthDate! as string),
      show: true,
    },
    {
      label: '#. Identificación',
      value: patientInfo?.dniNumber,
      show: true,
    },
    {
      label: 'Altura',
      value: patientInfo?.BasicInformation?.height! + ' cm',
      show: true,
    },
    {
      label: 'Peso',
      value: patientInfo?.BasicInformation?.weight! + ' kg',
      show: true,
    },
    {
      label: 'Tipo de sangre',
      value: formatBloodType(patientInfo?.BasicInformation?.bloodType!),
      show: true,
    },
    {
      label: 'EPS',
      value: patientInfo?.MedicalInformation?.EPSName?.toUpperCase()!,
      show: true,
    },
    {
      label: 'Dirección',
      value: patientInfo?.ContactInformation?.address!,
      show: true,
      colSpan: 2,
      className: 'capitalize',
    },
    {
      label: 'Telefono',
      value: formatPhone(patientInfo?.ContactInformation?.phone1!),
      show: true,
    },
    {
      label: 'Telefono 2',
      value: formatPhone(patientInfo?.ContactInformation?.phone2!),
      show: patientInfo?.ContactInformation?.phone2 !== '',
    },
    {
      label: 'Estado civil',
      value: formatMaritalStatus(patientInfo?.BasicInformation?.maritalStatus!),
      show: patientInfo?.ContactInformation?.phone2 === '',
    },
    {
      label: 'Contacto de emergencia',
      value: patientInfo?.ContactInformation?.emergencyContactName!,
      show: true,
      colSpan: 2,
      className: 'capitalize',
    },
    {
      label: 'E. Telefono',
      value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone!),
      show: true,
    },
    // {
    //   label: 'E. Telefono 2',
    //   value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone2!),
    //   show: true,
    // },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 w-full gap-3 rounded-2xl p-5 border col-span-4 items-center dark:border-[#29292f] dark:bg-zinc-900">
      {informationValues.map((value) => (
        <Fragment key={value.label}>
          {value.show && (
            <PatientInfoItem
              label={value.label}
              value={value.value}
              colSpan={value.colSpan}
              className={value.className}
            />
          )}
        </Fragment>
      ))}
      <div className="flex flex-col gap-1 items-start justify-start">
        <h1 className="text-sm font-medium text-muted-foreground">Toda la información</h1>
        <Button type="button" className="w-full" asChild>
          <Link href={`${patientInfo?.dniNumber}/all-information`}>Ver más</Link>
        </Button>
      </div>
    </div>
  );
};

PatientInformation.Skeleton = function PatientInformationSkeleton() {
  const informationValues = [
    {
      label: 'Género',
      show: true,
    },
    {
      label: 'Fecha de nacimiento',
      show: true,
    },
    {
      label: 'Edad',
      show: true,
    },
    {
      label: '#. Identificación',
      show: true,
    },
    {
      label: 'Altura',
      show: true,
    },
    {
      label: 'Peso',
      show: true,
    },
    {
      label: 'Tipo de sangre',
      show: true,
    },
    {
      label: 'EPS',
      show: true,
    },
    {
      label: 'Dirección',
      show: true,
      colSpan: 2,
    },
    {
      label: 'Telefono',
      show: true,
    },
    {
      label: 'Telefono 2',
      show: false,
    },
    {
      label: 'Contacto de emergencia',
      show: true,
      colSpan: 2,
    },
    {
      label: 'E. Telefono',
      show: true,
    },
    {
      label: 'E. Telefono 2',
      show: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 w-full gap-3 rounded-2xl p-5 border col-span-4 items-center dark:border-[#29292f] dark:bg-zinc-900">
      {informationValues.map(({ label, colSpan }) => (
        <div
          className={`flex flex-col gap-1 items-start justify-start col-span-${colSpan}`}
          key={label}
        >
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
};
