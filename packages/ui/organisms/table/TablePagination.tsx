"use client";

import { useCallback, useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { RowData, Table } from "@tanstack/react-table";

export interface TablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
}

export const TablePagination = <TData extends RowData>({
  table,
  totalCount,
}: TablePaginationProps<TData>) => {
  const keyId = useId();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = totalCount;
  const totalPaginationPiece = Array.from(
    { length: table.getPageCount() },
    (_, i) => i + 1,
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (data: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      for (const [name, value] of Object.entries(data)) {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            router.replace(
              pathname +
                "?" +
                createQueryString({
                  pi: pageIndex - 1 + "",
                }),
              { scroll: false },
            );

            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            router.replace(
              pathname +
                "?" +
                createQueryString({
                  pi: pageIndex + 1 + "",
                }),
              { scroll: false },
            );

            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pageIndex * pageSize}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(pageIndex * pageSize + pageSize, totalRows)}
            </span>{" "}
            of <span className="font-medium">{totalRows}</span> results
          </p>
        </div>
        <div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              const currentPageCount = pageIndex * pageSize;
              const newPageSize = Number(e.target.value);
              const newPageIndex = Math.floor(currentPageCount / newPageSize);

              router.replace(
                pathname +
                  "?" +
                  createQueryString({
                    pi: newPageIndex + "",
                    ps: newPageSize + "",
                  }),
                { scroll: false },
              );

              table.setPageSize(newPageSize);
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                router.replace(
                  pathname +
                    "?" +
                    createQueryString({
                      pi: pageIndex - 1 + "",
                    }),
                  { scroll: false },
                );

                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {totalPaginationPiece.map((e) => {
              if (pageIndex + 1 === e)
                return (
                  <button
                    key={"TablePagination" + keyId + e}
                    type="button"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    onClick={() => {
                      router.replace(
                        pathname +
                          "?" +
                          createQueryString({
                            pi: e - 1 + "",
                          }),
                        { scroll: false },
                      );

                      table.setPageIndex(e - 1);
                    }}
                  >
                    {e}
                  </button>
                );
              else
                return (
                  <button
                    key={"TablePagination" + keyId + e}
                    type="button"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    onClick={() => {
                      router.replace(
                        pathname +
                          "?" +
                          createQueryString({
                            pi: e - 1 + "",
                          }),
                        { scroll: false },
                      );

                      table.setPageIndex(e - 1);
                    }}
                  >
                    {e}
                  </button>
                );
            })}

            <button
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                router.replace(
                  pathname +
                    "?" +
                    createQueryString({
                      pi: pageIndex + 1 + "",
                    }),
                  { scroll: false },
                );

                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// const firstPieceSize = 3;
// const lastPieceSize = 3;

// const totalPaginationPiece = Array.from(
//   { length: table.getPageCount() },
//   (_, i) => i + 1,
// );
// let firstPiece: number[] = [];
// let lastPiece: number[] = [];
// let showPaginationDivider = false;

// const isNeededToDividePagination =
//   firstPieceSize + lastPieceSize < totalRows &&
//   pageIndex + firstPieceSize - 1 < table.getPageCount() - lastPieceSize;

// if (isNeededToDividePagination) {
//   if (pageIndex + firstPieceSize - 1 < table.getPageCount() - lastPieceSize) {
//     firstPiece = totalPaginationPiece.slice(
//       pageIndex,
//       pageIndex + firstPieceSize - 1,
//     );
//     lastPiece = totalPaginationPiece.slice(-lastPieceSize);
//     showPaginationDivider = true;
//   } else {
//     firstPiece = [];
//     lastPiece = totalPaginationPiece.slice(-lastPieceSize);
//     showPaginationDivider = true;
//   }
// } else {
//   firstPiece = totalPaginationPiece;
// }

// {showPaginationDivider ? (
//   <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//     ...
//   </span>
// ) : null}

// {showPaginationDivider
//   ? lastPiece.map((e) => {
//       if (pageIndex + 1 === e)
//         return (
//           <button
//             key={"TablePagination" + keyId + e}
//             type="button"
//             aria-current="page"
//             className="relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
//             onClick={() => table.setPageIndex(e - 1)}
//           >
//             {e}
//           </button>
//         );
//       else
//         return (
//           <button
//             key={"TablePagination" + keyId + e}
//             type="button"
//             className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             onClick={() => table.setPageIndex(e - 1)}
//           >
//             {e}
//           </button>
//         );
//     })
//   : null}
