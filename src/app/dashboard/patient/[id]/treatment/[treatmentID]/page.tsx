'use client';
import { useParams } from 'next/navigation';

export default function TreatmentInformation() {
  const { treatmentID } = useParams() as { treatmentID: string };

  console.log(treatmentID);

  return (
    <div>
      <h1>Treatment Information {treatmentID}</h1>
    </div>
  );
}
