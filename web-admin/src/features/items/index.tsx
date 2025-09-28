import { Main } from '../../components/layout/main';
import { Button } from '@denki-desk/ui/button';
import { Label } from '../../components/ui/Label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@denki-desk/ui/table';
import { Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@denki-desk/ui/tooltip';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { useQuery } from '@tanstack/react-query';
import { Item } from '../../types';
import { api } from '../../libs/api-client';

const statuses = ['Active', 'Inactive', 'Out of Stock'];
const categories = ['Shoes', 'Clothes', 'Accessories', 'Electronics', 'Other'];

export function Items() {
  const { data } = useQuery<{ data: Item[] }>({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await api.get('/items');
      return res.data;
    },
  });

  return (
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
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-2/3">
                <div className="flex flex-col max-w-full items-start">
                  <h4 className="truncate w-full">{item.name}</h4>
                  <div className="text-sm text-muted-foreground w-full line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.basePrice.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Main>
  );
}
