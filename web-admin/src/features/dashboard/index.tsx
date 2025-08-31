import { Main } from '../../components/layout/main';
import { Card, CardContent, CardHeader, CardTitle } from '@denki-desk/ui/card';
import { Overview } from './components/overview';
import { StockDistribution } from './components/stock-distribution';
import { CreditCard, DollarSign, Package, ShoppingBag } from 'lucide-react';
import { Label } from '../../components/ui/Label';

export function Dashboard() {
  return (
    <Main className="space-y-4">
      <Label className="mb-2">Overview</Label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-4">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">$45,231.89</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Inventory
            </CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">2350</div>
            <p className="text-muted-foreground text-xs">Items in stock</p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales
            </CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">+12,234</div>
            <p className="text-muted-foreground text-xs">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pre-orders
            </CardTitle>
            <ShoppingBag className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">573</div>
            <p className="text-muted-foreground text-xs">Pending fulfillment</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 px-4">
        <Card className="col-span-1 lg:col-span-4 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="ps-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Stock Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockDistribution />
          </CardContent>
        </Card>
      </div>
    </Main>
  );
}
