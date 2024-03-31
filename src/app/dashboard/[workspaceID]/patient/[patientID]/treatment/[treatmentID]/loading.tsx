import { HeaderSectionTitle, OdontogramSkeleton } from '@/components';
import { Skeleton } from '@/components/ui';
import { TreatmentBasicInfoSkeleton } from './components/TreatmentBasicInfoSkeleton';

export default function TreatmentInformationLoadingPage() {
  return (
    <>
      <HeaderSectionTitle.Skeleton containerClassName="mb-6" />

      <h1 className="text-xl xl:text-xl font-semibold mt-2">Odontograma</h1>

      <OdontogramSkeleton />

      <div>
        <Skeleton className="h-6 w-1/6 mt-2" />

        <div className="mt-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-full mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TreatmentBasicInfoSkeleton />
    </>
  );
}
