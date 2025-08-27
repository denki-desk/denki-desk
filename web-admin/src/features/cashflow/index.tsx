import { Header } from '../../components/layout/header';
import { Main } from '../../components/layout/main';
import { Button } from '@denki-desk/ui/button';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';
import { ProfileDropdown } from '../../components/profile-dropdown';
import { ThemeSwitch } from '../../components/theme-switch';
import { Label } from '../../components/ui/Label';
import { Link } from '../../components/ui/Link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@denki-desk/ui/table';
import {
  GanttChartSquare,
  Plus,
  TrendingDown,
  TrendingUp,
  TrendingUpDown,
} from 'lucide-react';
import { Badge } from '@denki-desk/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@denki-desk/ui/tooltip';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { useState } from 'react';

const mockCashFlowData = [
  {
    id: 1,
    type: 'inflow',
    source: 'transaction',
    category: null,
    amount: 1250,
    method: 'gcash',
    date: '2024-01-15',
    note: 'Shoe sale - Downtown Store',
    store: 'Downtown Shoes',
  },
  {
    id: 2,
    type: 'outflow',
    source: 'expense',
    category: 'rent',
    amount: 800,
    method: 'bank',
    date: '2024-01-14',
    note: 'Monthly rent payment',
    store: 'Downtown Shoes',
  },
  {
    id: 3,
    type: 'inflow',
    source: 'deposit',
    category: null,
    amount: 500,
    method: 'cash',
    date: '2024-01-13',
    note: 'Laptop rental deposit',
    store: 'Sports Rental Hub',
  },
  {
    id: 4,
    type: 'outflow',
    source: 'supplier',
    category: 'inventory',
    amount: 2400,
    method: 'bank',
    date: '2024-01-12',
    note: 'Nike shoe inventory',
    store: 'Mall Footwear',
  },
  {
    id: 5,
    type: 'inflow',
    source: 'payment',
    category: null,
    amount: 350,
    method: 'gcash',
    date: '2024-01-11',
    note: 'Equipment rental payment',
    store: 'Event Equipment',
  },
  {
    id: 6,
    type: 'outflow',
    source: 'expense',
    category: 'utilities',
    amount: 150,
    method: 'cash',
    date: '2024-01-10',
    note: 'Utilities payment',
    store: 'Sports Rental Hub',
  },
  {
    id: 7,
    type: 'inflow',
    source: 'refund',
    category: null,
    amount: 75,
    method: 'bank',
    date: '2024-01-09',
    note: 'Supplier refund',
    store: 'Downtown Shoes',
  },
  {
    id: 8,
    type: 'outflow',
    source: 'expense',
    category: 'marketing',
    amount: 300,
    method: 'gcash',
    date: '2024-01-08',
    note: 'Marketing campaign',
    store: 'Mall Footwear',
  },
  {
    id: 9,
    type: 'outflow',
    source: 'expense',
    category: 'supplies',
    amount: 120,
    method: 'cash',
    date: '2024-01-07',
    note: 'Office supplies',
    store: 'Downtown Shoes',
  },
  {
    id: 10,
    type: 'outflow',
    source: 'expense',
    category: 'maintenance',
    amount: 200,
    method: 'bank',
    date: '2024-01-06',
    note: 'Equipment maintenance',
    store: 'Event Equipment',
  },
];

export function CashFlow() {
  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const sources = [...new Set(mockCashFlowData.map((item) => item.source))];
  const categories = [
    ...new Set(mockCashFlowData.map((item) => item.category ?? 'unknown')),
  ];

  const filteredCashFlow = mockCashFlowData.filter((item) => {
    const matchesType = typeFilter === 'all' || item.type === typeFilter;

    return matchesType;
  });

  const handleClick = (type: string) => {
    setActiveTab(type);
    setTypeFilter(type);
  };

  return (
    <AuthenticatedLayout>
      <Header>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="flex items-stretch md:flex-row flex-col w-full h-full">
          {/*CashFlow*/}
          <div className="flex-1 grow min-w-0 h-full">
            <div className="flex px-4 border-b space-x-3 min-w-max">
              <button onClick={() => handleClick('all')}>
                <Link text="Overview" isActive={activeTab === 'all'} />
              </button>
              <button onClick={() => handleClick('inflow')}>
                <Link text="Inflow" isActive={activeTab === 'inflow'} />
              </button>
              <button onClick={() => handleClick('outflow')}>
                <Link text="Outflow" isActive={activeTab === 'outflow'} />
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-6 gap-2 gap-y-3">
              <div className="flex gap-x-3">
                <SelectDropdown
                  defaultValue={sources[0]}
                  options={sources}
                  placeholder="Source"
                />
                <SelectDropdown
                  defaultValue={categories[6]}
                  options={categories}
                  placeholder="Categories"
                />
              </div>
              <div className="flex gap-x-3">
                <Button variant="outline">Export</Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Entry</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <Label className="mb-2">Cash Flow</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCashFlow.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.source}</Badge>
                    </TableCell>
                    <TableCell>
                      {item.category ? (
                        <Badge variant="secondary">{item.category}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell
                      className={
                        item.type === 'inflow'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {item.type === 'inflow' ? '+' : '-'}$
                      {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.method}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div
            className="relative max-md:!w-full shrink-0 md:h-full z-40 border-l-0 md:border-l md:block"
            style={{ width: '340px' }}
          >
            <div className="h-full pb-10 flex flex-col space-y-4 p-4 pb-0 !h-auto">
              {/*Result*/}
              <div>
                <h4 className="mb-2.5 eyebrow font-semibold leading-3 flex items-center gap-2">
                  <GanttChartSquare className="h-4 w-4 text-muted-foreground" />
                  Results
                </h4>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 border border-success rounded-lg px-3 py-2.5 last:mb-0 relative overflow-hidden items-center">
                    <div
                      className="absolute border-border inset-y-0 left-0 pointer-events-none -z-10 bg-success opacity-20"
                      style={{
                        width: '75%',
                      }}
                    />
                    <TrendingUp className="text-success" />
                    <div className="inline-block relative grow truncate">
                      Inflow
                    </div>
                    <div>23,646</div>
                    <div>75%</div>
                  </div>

                  <div className="flex gap-2 border border-destructive rounded-lg px-3 py-2.5 last:mb-0 relative overflow-hidden items-center">
                    <div
                      className="absolute border-border inset-y-0 left-0 pointer-events-none -z-10 bg-destructive opacity-20"
                      style={{
                        width: '25%',
                      }}
                    />
                    <TrendingDown className="text-destructive" />
                    <div className="inline-block relative grow truncate">
                      Outflow
                    </div>
                    <div>4,679</div>
                    <div>25%</div>
                  </div>

                  <div className="flex gap-2 border border-muted-foreground rounded-lg px-3 py-2.5 last:mb-0 relative overflow-hidden items-center">
                    <div
                      className="absolute border-border inset-y-0 left-0 pointer-events-none -z-10 bg-muted-foreground opacity-20"
                      style={{
                        width: '90%',
                      }}
                    />
                    <TrendingUpDown className="text-muted-foreground" />
                    <div className="inline-block relative grow truncate">
                      Netflow
                    </div>
                    <div>19,681</div>
                    <div>+90%</div>
                  </div>
                </div>
              </div>
              {/*Todo: Timeline */}
            </div>
          </div>
        </div>
      </Main>
    </AuthenticatedLayout>
  );
}
