import {
  LayoutDashboard,
  Package,
  Receipt,
  Wallet,
  CalendarClock,
  ClipboardList,
  Users,
  BarChart3,
} from 'lucide-react';
import { SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'elpmid',
    email: 'elpmid@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/41994701?v=4',
  },
  stores: [
    {
      name: 'Shoenen Kicks',
      logo: Package, // maybe a sneaker icon later if you add one
      plan: 'Enterprise',
    },
    {
      name: 'Denki Desk',
      logo: CalendarClock, // rental vibe
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Items',
          url: '/items',
          icon: Package,
        },
        {
          title: 'Transactions',
          url: '/transactions',
          icon: Receipt,
        },
        {
          title: 'Payments',
          url: '/payments',
          icon: Wallet,
        },
        {
          title: 'Rentals',
          url: '/rentals',
          icon: CalendarClock,
        },
        {
          title: 'Preorders',
          url: '/preorders',
          icon: ClipboardList,
        },
        {
          title: 'Customers',
          url: '/customers',
          icon: Users,
        },
      ],
    },
    {
      title: 'Analytics',
      items: [
        {
          title: 'Reports',
          url: '/reports',
          icon: BarChart3,
        },
      ],
    },
  ],
};
