import { cn } from '@denki-desk/utils';
import { HTMLAttributes } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@denki-desk/ui/dropdown-menu';
import { Button } from '@denki-desk/ui/button';
import { Menu } from 'lucide-react';

type TopNavProps = HTMLAttributes<HTMLElement> & {
  links: {
    href: string;
    title: string;
    isActive: boolean;
    disabled?: boolean;
  }[];
};

export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="md:size-7">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {links.map(({ href, title, isActive, disabled }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <a
                  href={href}
                  className={!isActive ? 'text-muted-foreground' : ''}
                >
                  {title}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className
        )}
        {...props}
      >
        {links.map(({ href, title, isActive }) => (
          <a
            key={`${title}-${href}`}
            href={href}
            className={`hover:text-primary text-sm font-medium transition-colors ${
              isActive ? '' : 'text-muted-foreground'
            }`}
          >
            {title}
          </a>
        ))}
      </nav>
    </>
  );
}
