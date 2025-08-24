import { ElementType } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string;
};

type Store = {
  name: string;
  logo: ElementType;
  plan: string;
};

type BaseNavItem = {
  title: string;
  badge?: string;
  icon?: ElementType;
};

type NavLink = BaseNavItem & {
  url: string & {};
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string & {} })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  user: User;
  stores: Store[];
  navGroups: NavGroup[];
};

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
