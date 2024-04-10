import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../ui';
import { UserNav, WorkspaceSwitcher } from '..';

export const Navbar = () => {
  return (
    <div className="w-full p-4 px-4 sm:px-8 border-b border-secondary flex items-center dark:bg-[#0e0e0f]">
      <div className="flex justify-start items-center gap-6">
        <Link className="w-9" href="/dashboard">
          <Image src="/logo1.svg" alt="logo1" width={100} height={100} />
        </Link>

        <Input
          id="search"
          placeholder="Search patient"
          type="text"
          className="hidden sm:block w-[200px] md:w-72"
        />
      </div>
      <div className="ml-auto flex items-center gap-6">
        <WorkspaceSwitcher />
        <UserNav />
      </div>
    </div>
  );
};
