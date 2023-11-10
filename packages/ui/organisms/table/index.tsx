"use client";

import { useState } from "react";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DebouncedInput } from "./debounced-input";
import { filterFns } from "./filterFns";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter: boolean;
  showGlobalFilter?: boolean;
  showNavigation?: boolean;
  filterFn?: FilterFn<T>;
}

export const Table = <T extends object>({
  data,
  columns,
  showFooter,
  showGlobalFilter = true,
  showNavigation = true,
  filterFn = filterFns.fuzzy,
}: ReactTableProps<T>) => {
  // this is the search value
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    //
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFn,
  });
  return (
    <div className="flow-root">
      <div
        className="overflow-y-visible overflow-x-scroll"
        style={{ paddingBottom: "50px", marginBottom: "-50px" }}
      >
        <div className="inline-block min-w-full py-2 align-middle">
          {showGlobalFilter ? (
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="font-lg border-block mb-2 border p-2 shadow"
              placeholder="Search all columns..."
            />
          ) : null}
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    if (i === 0)
                      return (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-semibold text-gray-900 "
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );

                    if (i === headerGroup.headers.length - 1)
                      return (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );

                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='border-b" bg-white'>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="whitespace-nowrap px-4 py-3 text-sm font-light text-gray-900"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {showFooter ? (
              <tfoot className="border-t bg-gray-50">
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-900"
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            ) : null}
          </table>
          {showNavigation ? (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded border p-1"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </button>
                <span className="flex cursor-pointer items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                <span className="flex items-center gap-1">
                  | Go to page:
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="w-16 rounded border p-1"
                  />
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
