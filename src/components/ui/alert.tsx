import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        default_filled:
          'bg-white text-foreground dark:bg-zinc-900 dark:text-accent1 dark:border-[#29292f]',
        success:
          'text-blue-600 border-blue-600 [&>svg]:text-blue-600 dark:text-[#4ca8f9] dark:border-[#10233d] dark:[&>svg]:text-[#4ca8f9]',
        success_filled:
          'text-blue-600 bg-sky-50 border-blue-600 [&>svg]:text-blue-600 dark:text-[#4ca8f9] dark:bg-[#10233d] dark:border-[#10233d] dark:[&>svg]:text-[#4ca8f9]',
        error:
          'text-destructive border-destructive/50 [&>svg]:text-destructive dark:text-[#ff5c62] dark:border-[#3c1618] dark:[&>svg]:text-[#ff5c62]',
        error_filled:
          'text-destructive bg-red-50 border-destructive/50 [&>svg]:text-destructive dark:text-[#ff5c62] dark:bg-[#3c1618] dark:border-[#3c1618] dark:[&>svg]:text-[#ff5c62]',
        warning:
          'text-orange-500 border-orange-500 [&>svg]:text-orange-500 dark:text-[#ff9705] dark:border-[#331b00] dark:[&>svg]:text-[#ff9705]',
        warning_filled:
          'text-orange-500 border-orange-500 bg-orange-50 [&>svg]:text-orange-500 dark:text-[#ff9705] dark:bg-[#331b00] dark:border-[#331b00] dark:[&>svg]:text-[#ff9705]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
