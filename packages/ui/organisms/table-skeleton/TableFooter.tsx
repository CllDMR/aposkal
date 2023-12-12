import type { FC } from "react";
import { useId } from "react";

const footerGroups = [{ id: "", footers: [{ id: "", label: "", colSpan: 0 }] }];

export const TableFooter: FC = () => {
  const _id = useId();

  return (
    <tfoot className="border-t bg-gray-50">
      {footerGroups.map(({ id, footers }) => (
        <tr key={_id + id}>
          {footers.map((footer) => (
            <th
              key={_id + id + footer.id}
              className="h-14 whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-900"
              colSpan={footer.colSpan}
            >
              {footer.label}
            </th>
          ))}
          <th key={_id + "blank-cell-footerGroup.headers"} />
        </tr>
      ))}
    </tfoot>
  );
};
