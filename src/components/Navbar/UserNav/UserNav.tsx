'use client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useAuthStore } from '@/hooks';

export default function UserNav() {
  const { data: session } = useSession();
  const { startLogout } = useAuthStore();

  const dropdownMenuItems = [
    {
      label: 'Profile',
      href: '#1',
      shortcut: '⇧⌘P',
    },
    {
      label: 'Billing',
      href: '#2',
      shortcut: '⌘B',
    },
    {
      label: 'Settings',
      href: '#3',
      shortcut: '⌘S',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={session?.user?.user?.photoURL} alt="@kevcollazos" />
            <AvatarFallback>{session?.user?.user?.username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.user?.name || session?.user?.user?.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownMenuItems.map(({ label, href, shortcut }) => (
            <DropdownMenuItem key={href}>
              {label}
              {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={startLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
