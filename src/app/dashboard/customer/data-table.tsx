"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PaginationButton } from "@/components/pagination";
// import { ScrollArea } from "@radix-ui/react-scroll-area";

//import { ScrollArea } from "@/components/ui/scroll-area"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]); //sorting
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>( //filter
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    //filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="mr-2">
            <Button variant="default">+ Add Product </Button>
          </div>
          <div>
            <Button variant="outline"># Export </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
      {/* <ScrollArea className="lg:h-[62vh] xxl:h-[20vw]  overflow-auto"> */}
      <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      {/* </ScrollArea> */}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationButton
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          setPageIndex={table.setPageIndex}
        />
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button> */}
      </div>
    </div>
  );
}
