"use client";

import type { RowData, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export interface TableFooterProps<TData> {
  table: Table<TData>;
}

export const TableFooter = <TData extends RowData>({
  table,
}: TableFooterProps<TData>) => {
  return (
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
  );
};
