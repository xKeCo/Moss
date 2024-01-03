'use client';
import { Icons } from '@/components';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const DashboardTitle = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <Link href="/dashboard/patient/new">
        <Button className="text-sm">
          <Icons.Add className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </Link>
    </div>
  );
};
