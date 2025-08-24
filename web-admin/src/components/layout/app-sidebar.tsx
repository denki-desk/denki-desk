import { Sidebar } from '@denki-desk/ui/sidebar';
import { ComponentProps } from 'react';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return <Sidebar {...props} collapsible="icon" variant="inset" />;
}
