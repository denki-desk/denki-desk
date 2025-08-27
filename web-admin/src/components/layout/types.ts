import { ElementType } from 'react';
import { LinkProps } from '@tanstack/react-router';

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
  url: LinkProps['to'] | (string & {});
  items?: never;
  disabled?: boolean;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] | (string & {}) })[];
  url?: never;
  disabled?: boolean;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  title: string;
  items: NavItem[];
  disabled?: boolean;
};

type SidebarData = {
  user: User;
  stores: Store[];
  navGroups: NavGroup[];
};

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
