import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface NewInputProps extends InputProps {
  startDecorator?: string;
  endDecorator?: string;
}

const Input = React.forwardRef<HTMLInputElement, NewInputProps>(
  ({ className, type, endDecorator, startDecorator, ...props }, ref) => {
    return (
      <div className="flex items-end">
        {startDecorator && (
          <p className="flex items-center h-9 px-2 text-sm text-muted-foreground bg-input border border-input rounded-md rounded-r-none">
            {startDecorator}
          </p>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition duration-150 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ',
            className,
            endDecorator && 'border-r-0 rounded-r-none',
            startDecorator && 'border-l-0 rounded-l-none'
          )}
          ref={ref}
          {...props}
        />
        {endDecorator && (
          <p className="flex items-center h-9 px-2 text-sm text-muted-foreground bg-input border border-input rounded-md rounded-l-none">
            {endDecorator}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
