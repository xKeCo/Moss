import { Fragment } from 'react';
import {
  formatBloodType,
  formatDate,
  formatDniType,
  formatDoctorType,
  formatGender,
  formatMaritalStatus,
  formatPhone,
  getAge,
} from '@/helpers';
import { Skeleton } from '@/components/ui';

export const PatientGeneralInfo = ({ patientInfo }: { patientInfo: any }) => {
  const patientInfoValues = [
    {
      label: 'Nombre',
      value: patientInfo?.name,
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Tipo de identificación',
      value: formatDniType(patientInfo?.dniType, true),
    },
    {
      label: '#. Identificación',
      value: patientInfo?.dniNumber,
    },
    {
      label: 'Género',
      value: formatGender(patientInfo?.BasicInformation?.gender),
    },
    {
      label: 'Familiar(es) con Nacimiento',
      value: formatDate(patientInfo?.BasicInformation?.birthDate),
    },
    {
      label: 'Edad',
      value: getAge(patientInfo?.BasicInformation?.birthDate),
    },
    {
      label: 'Altura',
      value: `${patientInfo?.BasicInformation?.height} cm`,
    },
    {
      label: 'Peso',
      value: `${patientInfo?.BasicInformation?.weight} kg`,
    },
    {
      label: 'Tipo de sangre',
      value: formatBloodType(patientInfo?.BasicInformation?.bloodType),
    },
    {
      label: 'EPS',
      value: patientInfo?.MedicalInformation?.EPSName?.toUpperCase(),
    },
    {
      label: 'Estado civil',
      value: formatMaritalStatus(patientInfo?.BasicInformation?.maritalStatus),
    },
    {
      label: 'Dirección',
      value: patientInfo?.ContactInformation?.address,
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Telefono',
      value: formatPhone(patientInfo?.ContactInformation?.phone1),
    },
    {
      label: 'Telefono 2',
      value: formatPhone(patientInfo?.ContactInformation?.phone2),
    },
    {
      label: 'Contacto de emergencia',
      value: patientInfo?.ContactInformation?.emergencyContactName,
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'E. Telefono',
      value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone),
    },
    {
      label: 'E. Telefono 2',
      value: formatPhone(patientInfo?.ContactInformation?.emergencyContactPhone2),
    },
    {
      label: 'Ocupación',
      value: patientInfo?.BasicInformation?.occupation,
      valueClass: 'capitalize',
    },
    {
      label: '¿Ha visitado al médico recientemente?',
      value: patientInfo?.MedicalInformation?.visitedDoctor ? 'Si' : 'No',
    },
    {
      label: 'Tipo de médico visitado',
      value: formatDoctorType(patientInfo?.MedicalInformation?.doctorType),
      hide: !patientInfo?.MedicalInformation?.visitedDoctor,
    },
    {
      label: '¿Se encuentra en tratamiento?',
      value: patientInfo?.MedicalInformation?.inTreatment ? 'Si' : 'No',
    },
    {
      label: 'Nombre del tratamiento',
      value: patientInfo?.MedicalInformation?.treatmentName,
      hide: !patientInfo?.MedicalInformation?.inTreatment,
    },
    {
      label: '¿Se ha realizado una radiografía?',
      value: patientInfo?.MedicalInformation?.boneScan ? 'Si' : 'No',
    },
    {
      label: 'Tipo de radiografía',
      value: patientInfo?.MedicalInformation?.boneScanType,
      hide: !patientInfo?.MedicalInformation?.boneScan,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {patientInfoValues.map((patient) => (
        <Fragment key={patient.label}>
          {patient.hide ? null : (
            <div
              className={`flex flex-col gap-1 items-start justify-start col-span-${patient.colSpan} p-3 rounded-2xl bg-accent1 dark:border-[#29292f] dark:bg-zinc-900`}
            >
              <h1 className="text-sm font-medium text-muted-foreground">{patient.label}</h1>
              <p className={patient.valueClass}>{patient.value}</p>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

PatientGeneralInfo.Skeleton = function PatientGeneralInfoSkeleton() {
  const patientInfoValues = [
    {
      label: 'Nombre',
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Tipo de identificación',
    },
    {
      label: '#. Identificación',
    },
    {
      label: 'Género',
    },
    {
      label: 'Familiar(es) con Nacimiento',
    },
    {
      label: 'Edad',
    },
    {
      label: 'Altura',
    },
    {
      label: 'Peso',
    },
    {
      label: 'Tipo de sangre',
    },
    {
      label: 'EPS',
    },
    {
      label: 'Estado civil',
    },
    {
      label: 'Dirección',
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'Telefono',
    },
    {
      label: 'Telefono 2',
    },
    {
      label: 'Contacto de emergencia',
      colSpan: 2,
      valueClass: 'capitalize',
    },
    {
      label: 'E. Telefono',
    },
    {
      label: 'E. Telefono 2',
    },
    {
      label: 'Ocupación',
      valueClass: 'capitalize',
    },
    {
      label: '¿Ha visitado al médico recientemente?',
    },
    {
      label: '¿Se encuentra en tratamiento?',
    },
    {
      label: '¿Se ha realizado una radiografía?',
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {patientInfoValues.map((value, index) => (
        <div
          key={value.label}
          className={`flex flex-col gap-1 items-start justify-start col-span-${value.colSpan} p-3 rounded-2xl bg-accent1 dark:border-[#29292f] dark:bg-zinc-900`}
        >
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
};
