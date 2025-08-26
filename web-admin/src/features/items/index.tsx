import { Header } from '../../components/layout/header';
import { Main } from '../../components/layout/main';
import { Button } from '@denki-desk/ui/button';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';
import { ProfileDropdown } from '../../components/profile-dropdown';
import { ThemeSwitch } from '../../components/theme-switch';
import { Label } from '../../components/ui/Label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@denki-desk/ui/table';
import { Edit, Plus, Store, Trash2 } from 'lucide-react';
import { Badge } from '@denki-desk/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@denki-desk/ui/tooltip';
import { SelectDropdown } from '../../components/ui/SelectDropdown';

const mockInventoryData = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    category: 'Athletic',
    sku: 'NAM270-001',
    stock: 45,
    minStock: 20,
    price: 150,
    store: 'Downtown Shoes',
    type: 'sale',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 22',
    category: 'Athletic',
    sku: 'AUB22-002',
    stock: 12,
    minStock: 15,
    price: 180,
    store: 'Mall Footwear',
    type: 'sale',
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    category: 'Laptops',
    sku: 'MBP16-003',
    stock: 8,
    minStock: 5,
    price: 2499,
    store: 'Sports Rental Hub',
    type: 'rental',
    status: 'Available',
  },
  {
    id: 4,
    name: 'Canon EOS R5',
    category: 'Cameras',
    sku: 'CEOSR5-004',
    stock: 3,
    minStock: 2,
    price: 3899,
    store: 'Event Equipment',
    type: 'rental',
    status: 'Available',
  },
  {
    id: 5,
    name: 'Converse Chuck Taylor',
    category: 'Casual',
    sku: 'CCT-005',
    stock: 0,
    minStock: 10,
    price: 65,
    store: 'Downtown Shoes',
    type: 'sale',
    status: 'Out of Stock',
  },
  {
    id: 6,
    name: 'Professional Camera Kit',
    category: 'Photography',
    sku: 'PCK-006',
    stock: 15,
    minStock: 8,
    price: 1200,
    store: 'Event Equipment',
    type: 'rental',
    status: 'Available',
  },
  {
    id: 7,
    name: 'Dr. Martens 1460',
    category: 'Boots',
    sku: 'DM1460-007',
    stock: 28,
    minStock: 15,
    price: 170,
    store: 'Mall Footwear',
    type: 'sale',
    status: 'In Stock',
  },
  {
    id: 8,
    name: 'Gaming Laptop Setup',
    category: 'Gaming',
    sku: 'GLS-008',
    stock: 6,
    minStock: 4,
    price: 1800,
    store: 'Sports Rental Hub',
    type: 'rental',
    status: 'Available',
  },
];

export function Items() {
  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= minStock) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      );
    }
  };

  const statuses = [...new Set(mockInventoryData.map((item) => item.status))];
  const categories = [
    ...new Set(mockInventoryData.map((item) => item.category)),
  ];

  return (
    <AuthenticatedLayout>
      <Header>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="flex items-center justify-between px-4 py-6 gap-2 gap-y-3">
          <div className="flex gap-x-3">
            <SelectDropdown
              defaultValue={statuses[0]}
              options={statuses}
              placeholder="Status"
            />
            <SelectDropdown
              defaultValue={categories[4]}
              options={categories}
              placeholder="Categories"
            />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Item</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Label className="mb-2">Items</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Min Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventoryData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    {item.store}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.type === 'sale' ? 'default' : 'secondary'}
                  >
                    {item.type === 'sale' ? 'Sale' : 'Rental'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      item.stock <= item.minStock
                        ? 'text-red-600 font-semibold'
                        : ''
                    }
                  >
                    {item.stock}
                  </span>
                </TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  {getStatusBadge(item.status, item.stock, item.minStock)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Main>
    </AuthenticatedLayout>
  );
}
