import { ReactNode } from 'react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from '@denki-desk/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { cn } from '@denki-desk/utils';
import { StoreSwitcher } from './store-switcher';
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { Outlet } from '@tanstack/react-router';
import { Header } from './header';
import { ThemeSwitch } from '../theme-switch';
import { ProfileDropdown } from '../profile-dropdown';

type AuthenticatedLayoutProps = {
  children?: ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  // TODO: Get from cookie
  const defaultOpen = true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar>
        <SidebarHeader>
          <StoreSwitcher stores={sidebarData.stores} />
        </SidebarHeader>
        <SidebarContent>
          {sidebarData.navGroups.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarData.user} />
        </SidebarFooter>
        <SidebarRail />
      </AppSidebar>
      <SidebarInset
        className={cn(
          // If layout is fixed, set the height
          // to 100svh to prevent overflow
          'has-[[data-layout=fixed]]:h-svh',

          // If layout is fixed and sidebar is inset,
          // set the height to 100svh - 1rem (total margins) to prevent overflow
          // 'peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-1rem)]',
          'peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]',

          // Set content container, so we can use container queries
          '@container/content'
        )}
      >
        <Header>
          <div className="ms-auto flex items-center space-x-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        {children ?? <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  );
}
