import { Plus } from 'lucide-react';
import { Button } from '@denki-desk/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@denki-desk/ui/tooltip';
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
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  useReactTable,
} from '@tanstack/react-table';
import { categories } from '../../../mocks/data-generators';
import { DataTableToolbar } from '../../../components/data-table/toolbar';

export const ItemsTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columnFiltersCfg = [
    { columnId: 'category', searchKey: 'category', type: 'string' },
  ];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useState('');

  const categoryFilter =
    columnFilters.find((f) => f.id === 'category')?.value || '';

  const { data } = useQuery<{
    data: Item[];
    meta: { page: number; total: number; totalPages: number };
  }>({
    queryKey: [
      'items',
      pagination.pageIndex,
      pagination.pageSize,
      categoryFilter,
      search,
    ],
    queryFn: async () => {
      const res = await api.get('/items', {
        params: {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          category: categoryFilter || undefined,
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

  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updater) => {
    const next =
      typeof updater === 'function' ? updater(columnFilters) : updater;
    setColumnFilters(next);

    const patch: Record<string, unknown> = {};

    for (const cfg of columnFiltersCfg) {
      const found = next.find((f) => f.id === cfg.columnId);

      if (cfg.type === 'string') {
        const value =
          typeof found?.value === 'string' ? found.value.trim() : '';
        patch[cfg.searchKey] = value || undefined;
      } else if (cfg.type === 'array') {
        const value = Array.isArray(found?.value)
          ? found.value
          : found?.value
          ? [found.value]
          : [];
        patch[cfg.searchKey] = value.length > 0 ? value : undefined;
      }
    }
  };

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta.totalPages,
    state: {
      pagination,
      globalFilter: search,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearch,
    onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <>
      <div className="flex items-center justify-between px-4 py-6 gap-x-3">
        <DataTableToolbar
          table={table}
          searchPlaceholder="Filter by name..."
          filters={[
            {
              columnId: 'category',
              title: 'Category',
              options: categories.map((category) => ({
                label: category,
                value: category,
              })),
            },
          ]}
        />
        <div className="flex items-center gap-x-3">
          <Button variant="outline">Import</Button>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </>
  );
};
