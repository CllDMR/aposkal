"use client";

import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export interface TableBodyProps<TData> {
  table: Table<TData>;
}

export const TableBody = <TData extends object>({
  table,
}: TableBodyProps<TData>) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className='border-b" bg-white'>
          {row.getVisibleCells().map((cell) => (
            <td
              className="whitespace-nowrap px-4 py-3 text-sm font-light text-gray-900"
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
