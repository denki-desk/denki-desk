import { HTMLAttributes } from 'react';

export function Label({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <h4
      className="uppercase tracking-wider font-semibold text-xs text-muted-foreground border-b py-2 pt-2.5 px-4"
      {...props}
    >
      {children}
    </h4>
  );
}
