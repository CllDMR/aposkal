"use client";

import { useId } from "react";
import type { RowData, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export interface TableBodyProps<TData> {
  table: Table<TData>;
}

export const TableBody = <TData extends RowData>({
  table,
}: TableBodyProps<TData>) => {
  const rowsPerPage = table.getState().pagination.pageSize;
  const rows = table.getRowModel().rows;
  const columnSize = table.getVisibleFlatColumns().length;
  const blankRows: null[] = [];
  const blankRowsId = useId();

  if (rows.length < rowsPerPage)
    blankRows.push(...new Array<null>(rowsPerPage - rows.length).fill(null));

  return (
    <tbody className="bg-white">
      {rows.map((row) => (
        <tr key={row.id} className="border-b border-gray-200 bg-white">
          {row.getVisibleCells().map((cell) => {
            cell;
            return (
              <td
                className="whitespace-nowrap px-4 py-3 text-sm font-light text-gray-900"
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
      {blankRows.map((_, rowIndex) => (
        <tr key={blankRowsId + String(rowIndex)} className="bg-white">
          {new Array(columnSize).fill(null).map((_, cellIndex) => (
            <td
              className="h-11 px-4 py-3"
              key={blankRowsId + String(rowIndex) + String(cellIndex)}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};
