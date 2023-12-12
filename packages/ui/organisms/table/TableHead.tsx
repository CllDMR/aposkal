"use client";

import { useId } from "react";
import type { RowData, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export interface TableHeadProps<TData> {
  table: Table<TData>;
}

export const TableHead = <TData extends RowData>({
  table,
}: TableHeadProps<TData>) => {
  const id = useId();

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            if (i === 0)
              return (
                <th
                  key={header.id}
                  scope="col"
                  className=" h-14 px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
                  className=" h-14 px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
                className=" h-14 px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
          <th key={id + "blank-cell-headerGroup.headers"} />
        </tr>
      ))}
    </thead>
  );
};
