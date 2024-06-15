'use client';
import Link from 'next/link';
import { Building, ChevronLeft, Home, User, UserCircle, UserCog } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

export const Sidebar = ({ workspaceID }: { workspaceID: string }) => {
  const pathname = usePathname();

  const sideBarItems = [
    {
      label: 'Sucursal',
      icon: <Building size={16} />,
      subItems: [
        {
          label: 'General',
          href: `/settings/${workspaceID}/workspace`,
        },
        {
          label: 'Miembros',
          href: `/settings/${workspaceID}/members`,
        },
        {
          label: 'Planes',
          href: `/settings/${workspaceID}/plans`,
        },
        {
          label: 'Facturación',
          href: `/settings/${workspaceID}/billing`,
        },
        // {
        //   label: 'Integrations',
        //   href: '#',
        // },
        // {
        //   label: 'Support',
        //   href: '#',
        // },
        // {
        //   label: 'Organizations',
        //   href: '#',
        // },
        // {
        //   label: 'Advanced',
        //   href: '#',
        // },
      ],
    },
    // {
    //   label: 'General',
    //   icon: <Home size={16} />,
    //   subItems: [
    //     {
    //       label: 'Security',
    //       href: '#',
    //     },
    //     {
    //       label: 'Integrations',
    //       href: '#',
    //     },
    //     {
    //       label: 'Support',
    //       href: '#',
    //     },
    //     {
    //       label: 'Organizations',
    //       href: '#',
    //     },
    //     {
    //       label: 'Advanced',
    //       href: '#',
    //     },
    //   ],
    // },
    {
      label: 'Mi Cuenta',
      icon: <UserCog size={16} />,
      subItems: [
        {
          label: 'Perfil',
          href: '#',
        },
        {
          label: 'Preferencias',
          href: '#',
        },
        {
          label: 'Notificaciones',
          href: '#',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 pl-4 py-2 min-w-56 max-w-56 w-full sticky top-0">
      <Link
        href={`/dashboard/${workspaceID}`}
        className="text-lg font-semibold flex gap-2 items-center hover:text-black/80 hover:dark:text-white/80"
      >
        <ChevronLeft size={16} />
        Ajustes
      </Link>

      <nav className="flex flex-col gap-4 text-sm text-foreground  h-[calc(100vh-96px)] overflow-y-auto">
        {sideBarItems.map(({ label, icon, subItems }) => (
          <div key={label} className="grid gap-1">
            <div className="text-sm font-semibold flex gap-2 items-center mb-2">
              {icon} {label}
            </div>

            {subItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center h-8 pl-6 font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800',
                  pathname === href &&
                    'bg-neutral-200 dark:bg-zinc-900 hover:bg-neutral-200  dark:hover:bg-zinc-900'
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};
