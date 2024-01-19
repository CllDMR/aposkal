"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { api } from "@acme/api-client";
import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";

interface TableItem {
  id: string;
  name: string;
}

interface ProductCategoryTableProps {
  productCategories: RouterOutputs["productCategory"]["list"]["productCategories"];
  totalCount: RouterOutputs["productCategory"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const ProductCategoryTable: FC<ProductCategoryTableProps> = ({
  productCategories,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const utils = api.useUtils();
  const [result] = api.productCategory.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { productCategories, totalCount },
    },
  );

  const { mutateAsync } = api.productCategory.deleteMany.useMutation({
    async onSettled() {
      await utils.productCategory.list.invalidate();
      await utils.productCategory.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
        cell({ getValue, row: { original: productCategory } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/product-categories/${productCategory.id}`}
            >
              {getValue()}
            </Link>
          );
        },
        meta: {
          maxWidth: 200,
        },
      }),
    ] as ColumnDef<TableItem, unknown>[];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={result.productCategories}
      totalCount={result.totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      optionsMatrix={[
        [
          {
            icon: (
              <svg
                className="mr-2 h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 13V16H7L16 7L13 4L4 13Z"
                  fill="#8B5CF6"
                  stroke="#C4B5FD"
                  strokeWidth="2"
                />

                <path
                  className="ui-active:hidden"
                  d="M4 13V16H7L16 7L13 4L4 13Z"
                  fill="#EDE9FE"
                  stroke="#A78BFA"
                  strokeWidth="2"
                />
              </svg>
            ),
            label: "Delete All Selected",
            onClick: async (selectedOptions) => {
              await mutateAsync(
                selectedOptions.map((selectedOption) => selectedOption.id),
              );
            },
          },
        ],
      ]}
    />
  );
};
