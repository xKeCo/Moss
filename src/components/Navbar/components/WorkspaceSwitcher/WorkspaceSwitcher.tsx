'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { navigate, setActiveWorkspace } from '@/actions';

export const WorkspaceSwitcher = ({ activeWorkspaceID }: { activeWorkspaceID: string }) => {
  const { data: session } = useSession();
  const workspaces = session?.user?.workspaces;

  const [selectedWorkspace, setSelectedWorkspace] = useState<string>(
    activeWorkspaceID ?? workspaces?.[0]?.id!
  );

  return (
    <>
      {!session ? (
        <Skeleton className="w-32 h-8" />
      ) : (
        <Select
          defaultValue={activeWorkspaceID}
          onValueChange={(value) => {
            setSelectedWorkspace(value);
            setActiveWorkspace(value);
            navigate(`/dashboard/${value}`);
          }}
        >
          <SelectTrigger
            className={cn(
              'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 dark:bg-zinc-900'
            )}
            aria-label="Select account"
          >
            <SelectValue placeholder="Select a workspace">
              <span className="text-white bg-black dark:text-black dark:bg-white px-[6px] ml-1 rounded font-semibold">
                {workspaces?.findIndex((workspace) => workspace.id === selectedWorkspace)! + 1}
              </span>
              <span className="text-sm ml-1 capitalize">
                {workspaces?.find((workspace) => workspace.id === selectedWorkspace)?.name}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {session?.user?.workspaces?.map((workspace, index) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <p className="text-white bg-black px-[6px] ml-1 rounded font-semibold">
                    {index + 1}
                  </p>
                  <p className="">{workspace.name}</p>
                </div>
              </SelectItem>
            ))}

            {session?.user?.workspaces?.length < 3 && (
              <div className="flex items-center justify-center py-2 px-4 w-full">
                <Button className="w-full" asChild>
                  <Link href="/workspace">Create new workspace</Link>
                </Button>
              </div>
            )}
          </SelectContent>
        </Select>
      )}
    </>
  );
};
