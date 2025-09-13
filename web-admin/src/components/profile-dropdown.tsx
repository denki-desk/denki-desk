import { Avatar, AvatarFallback, AvatarImage } from '@denki-desk/ui/avatar';
import { Button } from '@denki-desk/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@denki-desk/ui/dropdown-menu';
import { useState } from 'react';
import { SignOutDialog } from './sign-out-dialog';

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/41994701?v=4"
                alt="@elpmid"
              />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm leading-none font-medium">elpmid</p>
              <p className="text-muted-foreground text-xs leading-none">
                elpmid@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Sign out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
