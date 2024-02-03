import { TreatmentItem } from '@/components';
import { Skeleton } from '@/components/ui';

export const TreatmentBasicInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <div className="flex justify-between mb-3">
            <Skeleton className="h-6 w-1/4" />

            <Skeleton className="h-9 w-44" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <TreatmentItem.Skeleton key={index} />
            ))}
          </div>
        </div>
      ))}

      <Skeleton className="h-9 w-20" />
    </div>
  );
};
