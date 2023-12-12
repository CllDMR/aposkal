"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;
  name: string;
  currency: string;
  unit: string;
  unitPrice: number;
  kdv: number;
  productsToCategories: RouterOutputs["product"]["list"][number]["productsToCategories"];
  productsToTags: RouterOutputs["product"]["list"][number]["productsToTags"];
}

interface ProductTableProps {
  products: RouterOutputs["product"]["list"];
}

export const ProductTable: FC<ProductTableProps> = ({ products }) => {
  const context = api.useContext();
  const [data] = api.product.list.useSuspenseQuery(
    {},
    {
      initialData: products,
    },
  );

  const { mutateAsync } = api.product.deleteMany.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
        cell({ getValue, row: { original: product } }) {
          return <Link href={`/products/${product.id}`}>{getValue()}</Link>;
        },
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("currency", {
        header: "Currency",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("unit", {
        header: "Unit",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("unitPrice", {
        header: "Unit Price",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("kdv", {
        header: "KDV",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor(
        (product) =>
          product?.productsToCategories
            ?.map((e) => e.productCategory.name)
            .join(" "),
        {
          header: "Categories",
          meta: {
            maxWidth: 200,
          },
        },
      ),
      columnHelper.accessor(
        (product) =>
          product?.productsToTags?.map((e) => e.productTag.name).join(" "),
        {
          header: "Tags",
        },
      ),
    ] as ColumnDef<TableItem, unknown>[];
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
