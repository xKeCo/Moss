'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const WorkspaceSwitcher = () => {
  const { data: session } = useSession();
  const workspaces = session?.user?.workspaces;
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('');

  useEffect(() => {
    if (session) {
      setSelectedWorkspace(session?.user?.workspaces[0]?.name);
    }
  }, [session]);

  return (
    <>
      {!session ? (
        <Skeleton className="w-32 h-8" />
      ) : (
        <Select
          defaultValue={session?.user?.workspaces[0]?.name}
          onValueChange={setSelectedWorkspace}
        >
          <SelectTrigger
            className={cn(
              'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0'
            )}
            aria-label="Select account"
          >
            <SelectValue placeholder="Select an account">
              <span className="text-white bg-black px-[6px] ml-1 rounded font-semibold">
                {workspaces?.findIndex(
                  (workspace) => workspace.name === selectedWorkspace
                )! + 1}
              </span>
              <span className="text-sm ml-1 capitalize">{selectedWorkspace}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {session?.user?.workspaces?.map((workspace, index) => (
              <SelectItem key={workspace.id} value={workspace.name}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <p className="text-white bg-black px-[6px] ml-1 rounded font-semibold">
                    {index + 1}
                  </p>
                  <p className="">{workspace.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};
