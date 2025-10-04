import { Plus, SearchIcon } from 'lucide-react';
import { Button } from '@denki-desk/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@denki-desk/ui/tooltip';
import { SelectDropdown } from '../../../components/ui/SelectDropdown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@denki-desk/ui/table';
import { DataTablePagination } from '../../../components/data-table/pagination';
import { useQuery } from '@tanstack/react-query';
import { Item } from '../../../types';
import { api } from '../../../libs/api-client';
import { useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const statuses = ['Active', 'Inactive', 'Out of Stock'];
const categories = ['Shoes', 'Clothes', 'Accessories', 'Electronics', 'Other'];

export const ItemsTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState('');

  const { data } = useQuery<{
    data: Item[];
    meta: { page: number; total: number; totalPages: number };
  }>({
    queryKey: ['items', pagination.pageIndex, pagination.pageSize, search],
    queryFn: async () => {
      const res = await api.get('/items', {
        params: {
          page: pagination.pageIndex + 1, // backend is usually 1-based
          limit: pagination.pageSize,
          q: search || undefined,
        },
      });
      return res.data;
    },
  });

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="flex flex-col max-w-full items-start">
            <h4 className="truncate w-full">{row.original.name}</h4>
            <div className="text-sm text-muted-foreground w-full line-clamp-1">
              {row.original.description}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'basePrice',
        header: 'Price',
        cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta.totalPages,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // tell RT we control pagination
  });

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-6 gap-x-3">
        <div className="flex items-center gap-x-3">
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
        </div>
        <div className="flex items-center gap-x-3">
          <Button variant="outline">Import</Button>
          <Button variant="outline">Export</Button>
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
      </div>

      <div className="p-4">
        <label className="flex items-center w-full space-x-2.5">
          <SearchIcon className="shrink-0 w-5 h-5 text-muted-foreground" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setPagination({ ...pagination, pageIndex: 0 }); // reset to page 1
              setSearch(e.target.value);
            }}
            className="bg-transparent py-2 focus:outline-none"
          />
        </label>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </>
  );
};
