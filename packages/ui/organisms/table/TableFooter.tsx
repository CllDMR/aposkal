"use client";

import { useId } from "react";
import type { RowData, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export interface TableFooterProps<TData> {
  table: Table<TData>;
}

export const TableFooter = <TData extends RowData>({
  table,
}: TableFooterProps<TData>) => {
  const id = useId();

  return (
    <tfoot className="border-t bg-gray-50">
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <th
              key={header.id}
              className=" h-14 whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
          <th key={id + "blank-cell-footerGroup.headers"} />
        </tr>
      ))}
    </tfoot>
  );
};
