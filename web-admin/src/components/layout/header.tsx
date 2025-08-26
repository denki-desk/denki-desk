import { cn } from '@denki-desk/utils';
import { HTMLAttributes } from 'react';
import { SidebarTrigger } from '@denki-desk/ui/sidebar';
import { Separator } from '@denki-desk/ui/separator';

export function Header({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn('z-50 h-16', className)} {...props}>
      <div
        className={cn(
          'relative flex h-full items-center gap-3 p-4 sm:gap-4 border-b'
        )}
      >
        <SidebarTrigger variant="outline" className="max-md:scale-125" />
        {children}
      </div>
    </header>
  );
}
