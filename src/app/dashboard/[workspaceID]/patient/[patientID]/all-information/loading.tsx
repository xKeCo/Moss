import { Skeleton } from '@/components/ui';
import { PatientGeneralInfo } from './components';
import { HeaderSectionTitle } from '@/components';

export default async function AllInformationPageLoading() {
  return (
    <div className="dark:bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto min-h-screenwithoutheader py-12 p-6">
        <HeaderSectionTitle.Skeleton containerClassName="mb-6" />

        <Skeleton className="h-8 w-[337px] mt-2 mb-6" />

        <PatientGeneralInfo.Skeleton />
      </div>
    </div>
  );
}
