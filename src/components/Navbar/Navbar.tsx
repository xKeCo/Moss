import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../ui';
import { UserNav, WorkspaceSwitcher } from '..';
import { getActiveWorkspace } from '@/actions';

export const Navbar = async () => {
  const activeWorkspaceID = await getActiveWorkspace();

  return (
    <div className="w-full p-4 px-8 border-b border-secondary flex items-center">
      <div className="flex justify-start items-center gap-6">
        <Link className="w-9" href="/dashboard">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>

        <Input
          id="search"
          placeholder="Search patient"
          type="text"
          className="hidden sm:block w-[300px]"
        />
      </div>
      <div className="ml-auto flex items-center gap-6">
        <WorkspaceSwitcher activeWorkspaceID={activeWorkspaceID!} />
        <UserNav />
      </div>
    </div>
  );
};
