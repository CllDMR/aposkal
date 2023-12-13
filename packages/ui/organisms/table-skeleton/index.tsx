import type { FC } from "react";

import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableGlobalFilter } from "./TableGlobalFilter";
import { TableHead } from "./TableHead";
import { TablePagination } from "./TablePagination";

interface TableSkeletonProps {
  isSelectionMode?: boolean;
  showFooter?: boolean;
  showGlobalFilter?: boolean;
  showPagination?: boolean;
  headers: { text: string; maxWidth?: number }[];
  rowsPerPage?: number;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({
  isSelectionMode = true,
  showFooter = false,
  showGlobalFilter = false,
  showPagination = true,
  headers,
  rowsPerPage = 10,
}) => (
  <div className="flow-root">
    <div
      className="overflow-y-visible overflow-x-scroll"
      style={{ paddingBottom: "50px", marginBottom: "-50px" }}
    >
      <div className="inline-block min-w-full py-2 align-middle">
        {showGlobalFilter ? <TableGlobalFilter /> : null}
        <table className="min-w-full divide-y divide-gray-300">
          <TableHead isSelectionMode={isSelectionMode} headers={headers} />
          <TableBody
            columnSize={headers.length}
            rowsPerPage={rowsPerPage}
            isSelectionMode={isSelectionMode}
          />
          {showFooter ? <TableFooter /> : null}
        </table>
        {showPagination ? (
          <TablePagination
            pageCount={1}
            pageIndex={0}
            rowsPerPage={rowsPerPage}
            totalRows={0}
          />
        ) : null}
      </div>
    </div>
  </div>
);
