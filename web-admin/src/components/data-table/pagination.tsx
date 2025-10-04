import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@denki-desk/ui/select';
import { Table } from '@tanstack/react-table';
import { Button } from '@denki-desk/ui/button';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { getPageNumbers } from '@denki-desk/utils';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between px-4 py-6">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2 w-1/3">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger showChevron className="w-[70px]">
            <SelectValue placeholder={String(pageSize)} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="hidden text-sm font-medium sm:block">Rows per page</p>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {/* Page number buttons */}
        {pageNumbers.map((pageNumber, index) => (
          <div key={`${pageNumber}-${index}`} className="flex items-center">
            {pageNumber === '...' ? (
              <span className="text-muted-foreground px-1 text-sm">...</span>
            ) : (
              <Button
                size="icon"
                variant={currentPage === pageNumber ? 'outline' : 'ghost'}
                onClick={() => table.setPageIndex((pageNumber as number) - 1)}
              >
                <span className="sr-only">Go to page {pageNumber}</span>
                {pageNumber}
              </Button>
            )}
          </div>
        ))}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 p-0 @max-md/main:hidden"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
