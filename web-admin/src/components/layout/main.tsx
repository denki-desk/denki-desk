import { cn } from '@denki-desk/utils';
import { HTMLAttributes } from 'react';

export function Main({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <main className={cn('@container/main px-4 py-6', className)} {...props} />
  );
}
