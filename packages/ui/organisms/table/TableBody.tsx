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
  const columnDefs = table._getColumnDefs();
  const rowsPerPage = table.getState().pagination.pageSize;
  const rows = table.getRowModel().rows;
  // const columnSize = table.getVisibleFlatColumns().length;
  const blankRows: null[] = [];
  const blankRowsId = useId();

  if (rows.length < rowsPerPage)
    blankRows.push(...new Array<null>(rowsPerPage - rows.length).fill(null));

  return (
    <tbody className="bg-white">
      {rows.map((row) => (
        <tr key={row.id} className="border-b border-gray-200 bg-white">
          {row.getVisibleCells().map((cell) => (
            <td
              className="h-14 truncate px-4 py-3 text-sm font-light text-gray-900"
              style={{
                maxWidth: cell.column.columnDef.meta?.maxWidth,
                width: cell.column.columnDef.meta?.maxWidth && 1000,
              }}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
          <td key={blankRowsId + "blank-cell-rows"} />
        </tr>
      ))}
      {blankRows.map((_, rowIndex) => (
        <tr
          key={blankRowsId + String(rowIndex)}
          className="border-b border-gray-200 bg-white"
        >
          {columnDefs.map((columnDef, cellIndex) => (
            <td
              className="h-14 whitespace-break-spaces border-b border-gray-200 px-4 py-3"
              style={{
                maxWidth: columnDef.meta?.maxWidth,
                width: columnDef.meta?.maxWidth && 1000,
              }}
              key={blankRowsId + String(rowIndex) + String(cellIndex)}
            />
          ))}
          <td key={blankRowsId + "blank-cell-blankRows"} />
        </tr>
      ))}
    </tbody>
  );
};
