import React from 'react';
import { PatientAlert, PatientCard, PatientInformation, PatientTreatment } from './components';
import { Breadcrumb } from '@/components';

export default function PatientLoadingPage() {
  return (
    <div className="py-5 px-8 flex flex-col gap-4">
      <Breadcrumb.Skeleton />

      <PatientAlert.Skeleton />

      <div className="grid md:grid-cols-6 xl:grid-cols-8 xl:grid-rows-2 gap-4">
        <PatientCard.Skeleton />
        <PatientInformation.Skeleton />
        <PatientTreatment.Skeleton />
      </div>
    </div>
  );
}
