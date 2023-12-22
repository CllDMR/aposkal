"use client";

import { useId, useState } from "react";
import type { ColumnDef, FilterFn, RowData } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "../../atoms";
import { filterFns } from "./filterFns";
import type { TableActionsDropdownOption } from "./TableActionsDropdown";
import { TableActionsDropdown } from "./TableActionsDropdown";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableGlobalFilter } from "./TableGlobalFilter";
import { TableHead } from "./TableHead";
import { TablePagination } from "./TablePagination";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    maxWidth?: number;
  }
}

interface ReactTableProps<TData extends RowData, TValue = unknown> {
  data: TData[];
  totalCount: number;
  pageSize?: number;
  pageIndex?: number;
  columns: ColumnDef<TData, TValue>[];
  isSelectionMode?: boolean;
  showFooter?: boolean;
  showGlobalFilter?: boolean;
  showPagination?: boolean;
  filterFn?: FilterFn<TData>;
  optionsMatrix?: TableActionsDropdownOption<TData>[][];
}

export const Table = <TData extends RowData, TValue = unknown>({
  data,
  totalCount,
  pageIndex = 0,
  pageSize = 10,
  columns,
  isSelectionMode = true,
  showFooter = false,
  showGlobalFilter = false,
  showPagination = true,
  filterFn = filterFns.fuzzy,
  optionsMatrix,
}: ReactTableProps<TData, TValue>) => {
  // this is the search value
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper<TData>();
  const actionsId = useId();
  const _columns =
    isSelectionMode && optionsMatrix
      ? [
          columnHelper.display({
            id: "actions",
            header() {
              return (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={actionsId}
                    name={"actions-checkbox-header" + actionsId}
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    indeterminate={table.getIsSomeRowsSelected()}
                  />
                  {optionsMatrix ? (
                    <TableActionsDropdown
                      optionsMatrix={optionsMatrix}
                      table={table}
                    />
                  ) : null}
                </div>
              );
            },
            cell: ({
              row: {
                index,
                id,
                getIsSelected,
                getCanSelect,
                getToggleSelectedHandler,
              },
            }) => (
              <Checkbox
                id={actionsId + index + id}
                name={"actions-checkbox-cell" + actionsId + index + id}
                checked={getIsSelected()}
                disabled={!getCanSelect()}
                onChange={getToggleSelectedHandler()}
              />
            ),
            meta: {
              maxWidth: 50,
            },
          }),
          ...columns,
        ]
      : columns;

  const table = useReactTable<TData>({
    data,
    columns: _columns,
    //
    pageCount: Math.ceil(totalCount / pageSize),
    manualPagination: true,
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
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
          {showPagination ? (
            <TablePagination table={table} totalCount={totalCount} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
