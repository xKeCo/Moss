import { OdontogramSkeleton } from '@/components';
import { Skeleton } from '@/components/ui';

export default function TreatmentInformationLoadingPage() {
  return (
    <>
      <p>7bcf40a0-748c-459c-9385-2bc297f5e833</p>

      <Skeleton className="h-9 w-1/2 mb-3" />

      <div className="h-[2px] bg-secondary"></div>

      <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontogram</h1>

      <OdontogramSkeleton />

      {/* <TreatmentBasicInfo treatmentInfo={treatmentInfo!} /> */}
    </>
  );
}
