"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Table } from "@acme/ui/organisms";

interface TableItem {
  id: string;
  name: string;
  currency: string;
  unit: string;
  unitPrice: number;
  kdv: number;
  productsToCategories: RouterOutputs["product"]["list"]["products"][number]["productsToCategories"];
  productsToTags: RouterOutputs["product"]["list"]["products"][number]["productsToTags"];
}

interface ProductTableProps {
  products: RouterOutputs["product"]["list"]["products"];
  totalCount: RouterOutputs["product"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const ProductTable: FC<ProductTableProps> = ({
  products,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const utils = api.useUtils();
  const [result] = api.product.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { products, totalCount },
    },
  );

  const { mutateAsync } = api.product.deleteMany.useMutation({
    async onSettled() {
      await utils.product.list.invalidate();
      await utils.product.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
        cell({ getValue, row: { original: product } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/products/${product.id}`}
            >
              {getValue()}
            </Link>
          );
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
      data={result.products}
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
