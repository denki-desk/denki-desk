import { Table } from '@tanstack/react-table';
import { Button } from '@denki-desk/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableFacetedFilter } from './faceted-filter';
import { ComponentType } from 'react';

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchKey?: string;
  filters?: {
    columnId: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: ComponentType<{ className?: string }>;
    }[];
  }[];
};

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Filter...',
  searchKey,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const globalFilterValue = table.getState().globalFilter?.trim() || '';

  const hasColumnFilters = table.getAllColumns().some((col) => {
    const value = col.getFilterValue();
    return value !== undefined && value !== null && value !== '';
  });

  const isFiltered = globalFilterValue !== '' || hasColumnFilters;

  return (
    <div className="flex items-center gap-x-3">
      <label className="min-w-[300px]">
        {searchKey ? (
          <input
            placeholder={searchPlaceholder}
            className="border borrder-border block focus:outline-none rounded-full py-[7px] px-[15px] w-full"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
          />
        ) : (
          <input
            placeholder={searchPlaceholder}
            className="border borrder-border block focus:outline-none rounded-full py-[7px] px-[15px] w-full"
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
        )}
      </label>

      {filters.map((filter) => {
        const column = table.getColumn(filter.columnId);
        if (!column) return null;
        return (
          <DataTableFacetedFilter
            key={filter.columnId}
            column={column}
            title={filter.title}
            options={filter.options}
          />
        );
      })}

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
        >
          Reset
          <Cross2Icon className="ms-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
