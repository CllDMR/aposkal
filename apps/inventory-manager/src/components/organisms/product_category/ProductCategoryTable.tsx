"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;
  name: string;
}

interface ProductCategoryTableProps {
  productCategories: RouterOutputs["productCategory"]["list"];
}

export const ProductCategoryTable: FC<ProductCategoryTableProps> = ({
  productCategories,
}) => {
  const context = api.useContext();
  const [data] = api.productCategory.list.useSuspenseQuery(
    {},
    {
      initialData: productCategories,
    },
  );

  const { mutateAsync } = api.productCategory.deleteMany.useMutation({
    async onSettled() {
      await context.productCategory.list.invalidate();
      await context.productCategory.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.group({
        id: "data",
        columns: [
          columnHelper.accessor("name", {
            header: "Name",
            cell({ getValue, row: { original: productCategory } }) {
              return (
                <Link href={`/product-categories/${productCategory.id}`}>
                  {getValue()}
                </Link>
              );
            },
          }),
        ],
      }),
    ];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={data}
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
