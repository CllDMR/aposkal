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

interface ReactTableProps<TData extends RowData, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isSelectionMode?: boolean;
  showFooter?: boolean;
  showGlobalFilter?: boolean;
  showNavigation?: boolean;
  filterFn?: FilterFn<TData>;
  optionsMatrix?: TableActionsDropdownOption<TData>[][];
}

export const Table = <TData extends RowData, TValue = unknown>({
  data,
  columns,
  isSelectionMode = true,
  showFooter = false,
  showGlobalFilter = false,
  showNavigation = true,
  filterFn = filterFns.fuzzy,
  optionsMatrix = [],
}: ReactTableProps<TData, TValue>) => {
  // this is the search value
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper<TData>();
  const actionsId = useId();
  const _columns = isSelectionMode
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
        }),
        ...columns,
      ]
    : columns;

  const table = useReactTable<TData>({
    data,
    columns: _columns,
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
