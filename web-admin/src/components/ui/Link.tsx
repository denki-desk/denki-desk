import { cn } from '@denki-desk/utils';

type LinkProps = {
  text: string;
  isActive?: boolean;
  count?: number;
};

export function Link({ text, isActive = false, count }: LinkProps) {
  return (
    <div
      className={cn('flex items-center', {
        'border-b border-primary mb-[-1px]': isActive,
      })}
    >
      <h4
        className={cn('eyebrow font-semibold py-2', {
          'text-muted-foreground': !isActive,
        })}
      >
        {text}
      </h4>
    </div>
  );
}
