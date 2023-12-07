import type { FC } from "react";
import { useId } from "react";

export interface TableBodyProps {
  isSelectionMode: boolean;
  rowsPerPage: number;
  columnSize: number;
}

export const TableBody: FC<TableBodyProps> = ({
  rowsPerPage,
  columnSize,
  isSelectionMode,
}) => {
  const blankRows: null[] = new Array<null>(rowsPerPage).fill(null);
  const blankRowsId = useId();

  return (
    <tbody className="bg-white">
      {blankRows.map((_, rowIndex) => (
        <tr
          key={blankRowsId + String(rowIndex)}
          className="border-b border-gray-200 bg-white"
        >
          {isSelectionMode && (
            <td className="h-9 px-4 py-3" key={blankRowsId + String(rowIndex)}>
              <input
                id={blankRowsId + String(rowIndex)}
                name={"actions-checkbox-cell" + blankRowsId + String(rowIndex)}
                type="checkbox"
                className="rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-primary-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-opacity-30"
              />
            </td>
          )}

          {new Array(columnSize).fill(null).map((_, cellIndex) => (
            <td
              className="h-9 px-4 py-3"
              key={blankRowsId + String(rowIndex) + String(cellIndex)}
            >
              <div className="h-2 animate-pulse rounded bg-gray-400"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
