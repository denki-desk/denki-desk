import { HTMLAttributes } from 'react';

export function Label({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <h4
      className="eyebrow font-semibold text-muted-foreground border-b py-2 pt-2.5 px-4"
      {...props}
    >
      {children}
    </h4>
  );
}
