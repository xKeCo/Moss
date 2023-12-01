import Image from 'next/image';
import Link from 'next/link';
import UserNav from './UserNav/UserNav';
import { Input } from '../ui/input';

export const Navbar = () => {
  return (
    <div className="w-full p-4 px-8 border-b border-secondary flex items-center">
      <div className="flex justify-start items-center gap-6">
        <Link className="w-9" href="/dashboard">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>

        <Input
          placeholder="Search patient"
          type="text"
          className="hidden sm:block w-[300px]"
        />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
};
