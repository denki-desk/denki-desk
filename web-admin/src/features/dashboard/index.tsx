import { Header } from '../../components/layout/header';
import { TopNav } from '../../components/layout/top-nav';
import { Main } from '../../components/layout/main';
import { Button } from '@denki-desk/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@denki-desk/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@denki-desk/ui/card';
import { Overview } from './components/overview';
import { StockDistribution } from './components/stock-distribution';
import { CreditCard, DollarSign, Package, ShoppingBag } from 'lucide-react';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';
import { ProfileDropdown } from '../../components/profile-dropdown';
import { ThemeSwitch } from '../../components/theme-switch';

export function Dashboard() {
  return (
    <AuthenticatedLayout>
      <Header>
        <TopNav links={topNav} />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>

        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-muted-foreground text-xs">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Inventory
                  </CardTitle>
                  <Package className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2350</div>
                  <p className="text-muted-foreground text-xs">
                    Items in stock
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-muted-foreground text-xs">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pre-orders
                  </CardTitle>
                  <ShoppingBag className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-muted-foreground text-xs">
                    Pending fulfillment
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="ps-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Stock Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <StockDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </AuthenticatedLayout>
  );
}

const topNav = [
  {
    title: 'Overview',
    href: '/dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Sales',
    href: '/dashboard/sales',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Rentals',
    href: '/dashboard/rentals',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Preorders',
    href: '/dashboard/preorders',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    isActive: false,
    disabled: true,
  },
];
