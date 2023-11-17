"use client";

import { useState } from "react";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { filterFns } from "./filterFns";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableGlobalFilter } from "./TableGlobalFilter";
import { TableHead } from "./TableHead";
import { TablePagination } from "./TablePagination";

interface ReactTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  showFooter?: boolean;
  showGlobalFilter?: boolean;
  showNavigation?: boolean;
  filterFn?: FilterFn<TData>;
}

export const Table = <TData extends object>({
  data,
  columns,
  showFooter = false,
  showGlobalFilter = false,
  showNavigation = true,
  filterFn = filterFns.fuzzy,
}: ReactTableProps<TData>) => {
  // this is the search value
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable<TData>({
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
            <TableGlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          ) : null}
          <table className="min-w-full divide-y divide-gray-300">
            <TableHead table={table} />
            <TableBody table={table} />
            {showFooter ? <TableFooter table={table} /> : null}
          </table>
          {showNavigation ? <TablePagination table={table} /> : null}
        </div>
      </div>
    </div>
  );
};
