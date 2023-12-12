import type { FC } from "react";
import { useId } from "react";

interface TableHeadProps {
  isSelectionMode: boolean;
  headers: { text: string; maxWidth?: number }[];
}

export const TableHead: FC<TableHeadProps> = ({ isSelectionMode, headers }) => {
  const _id = useId();
  const headerId = useId();

  return (
    <thead>
      <tr>
        {isSelectionMode && (
          <td className="h-14 px-4 py-3 ">
            <div className="flex items-center gap-2 ">
              <input
                id={"actions-checkbox-header" + _id}
                name={"actions-checkbox-header" + _id}
                type="checkbox"
                className="rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-primary-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-opacity-30"
              />
            </div>
          </td>
        )}

        {headers.map(({ text, maxWidth }, headerIndex) => (
          <th
            key={_id + headerId + headerIndex}
            scope="col"
            className="h-14 px-4 py-3 text-left text-sm font-semibold text-gray-900 "
            style={{
              maxWidth: maxWidth,
              width: maxWidth && "100%",
            }}
          >
            {text}
          </th>
        ))}
        <th key={_id + "blank-cell-headerGroup.headers"} />
      </tr>
    </thead>
  );
};
