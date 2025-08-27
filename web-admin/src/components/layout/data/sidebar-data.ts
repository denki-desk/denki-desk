import {
  LayoutDashboard,
  Package,
  Receipt,
  Wallet,
  CalendarClock,
  ClipboardList,
  Users,
  BarChart3,
  TrendingUp,
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
      name: 'Denki Desk',
      logo: CalendarClock,
      plan: 'Startup',
    },
    {
      name: 'Shoenen Kicks',
      logo: Package,
      plan: 'Enterprise',
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
          disabled: true,
        },
        {
          title: 'Payments',
          url: '/payments',
          icon: Wallet,
          disabled: true,
        },
        {
          title: 'Rentals',
          url: '/rentals',
          icon: CalendarClock,
          disabled: true,
        },
        {
          title: 'Preorders',
          url: '/preorders',
          icon: ClipboardList,
          disabled: true,
        },
        {
          title: 'Customers',
          url: '/customers',
          icon: Users,
          disabled: true,
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
          disabled: true,
        },
        {
          title: 'Cash Flow',
          url: '/cashflow',
          icon: TrendingUp,
        },
      ],
    },
  ],
};
