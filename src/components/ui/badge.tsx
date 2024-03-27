import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        pendiente:
          'text-orange-500 border-orange-500 bg-orange-50 [&>svg]:text-orange-500 dark:text-[#ff9705] dark:bg-[#331b00] dark:border-[#331b00] dark:[&>svg]:text-[#ff9705]',
        nueva:
          'text-blue-600 bg-sky-50 border-blue-600 [&>svg]:text-blue-600 dark:text-[#4ca8f9] dark:bg-[#10233d] dark:border-[#10233d] dark:[&>svg]:text-[#4ca8f9]',
        confirmada:
          'text-green-600 bg-green-50 border-green-600 [&>svg]:text-green-600 dark:text-[#4ca8f9] dark:bg-[#10233d] dark:border-[#10233d] dark:[&>svg]:text-[#4ca8f9]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
