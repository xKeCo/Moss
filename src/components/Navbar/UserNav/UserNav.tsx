'use client';
import { useTheme } from 'next-themes';
import { signOut, useSession } from 'next-auth/react';
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Icons } from '@/components';
import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function UserNav() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const dropdownMenuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      // shortcut:  ,
    },
    // {
    //   label: 'Profile',
    //   href: `/profile/${session?.user?.username}`,
    //   shortcut: <PersonIcon className="h-[18px] w-[18px]" />,
    // },
    {
      label: 'Settings',
      href: '/settings',
      shortcut: <GearIcon className="h-[18px] w-[18px]" />,
    },
  ];

  const onLogOut = () => {
    signOut({ callbackUrl: `/login` });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={session?.user?.photoURL} alt="@kevcollazos" />
            <AvatarFallback>{session?.user?.username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name ?? session?.user?.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownMenuItems.map(({ label, href, shortcut }) => (
            <Link href={href} key={href}>
              <DropdownMenuItem className="flex items-center justify-between py-2">
                {label}
                {shortcut}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup className="flex justify-between items-center">
          <DropdownMenuLabel className="font-normal">Theme</DropdownMenuLabel>

          <Select
            onValueChange={(value) => {
              setTheme(value);
            }}
            value={theme}
          >
            <SelectTrigger className="w-[90px] h-7">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem onClick={onLogOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
