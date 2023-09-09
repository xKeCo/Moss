import React from 'react';
import { Input } from '../ui/input';
import UserNav from './UserNav/UserNav';

export const Navbar = () => {
  return (
    <div className="w-full p-4 px-8 border-b border-secondary flex items-center">
      <div className="flex justify-start items-center gap-6">
        <div className="">
          <h1>Dentalsoft Logo</h1>
        </div>

        <div>
          <Input placeholder="Search patient" type="text" className="w-[500px]" />
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
};
