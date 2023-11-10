"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button, LinkButton } from "@acme/ui/molecules";
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

  const { mutateAsync, isLoading, variables } = api.product.delete.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
        footer: "Name",
      },
      {
        header: "Currency",
        cell: (row) => row.renderValue(),
        accessorKey: "currency",
        footer: "Currency",
      },
      {
        header: "Unit",
        cell: (row) => row.renderValue(),
        accessorKey: "unit",
        footer: "Unit",
      },
      {
        header: "Unit Price",
        cell: (row) => row.renderValue(),
        accessorKey: "unitPrice",
        footer: "Unit Price",
      },
      {
        header: "KDV",
        cell: (row) => row.renderValue(),
        accessorKey: "kdv",
        footer: "KDV",
      },
      {
        header: "Categories",
        cell: (row) => row.renderValue(),
        accessorFn: (originalRow) =>
          originalRow?.productsToCategories
            ?.map((e) => e.productCategory.name)
            .join(" "),
        footer: "Categories",
      },
      {
        header: "Tags",
        cell: (row) => row.renderValue(),
        accessorFn: (originalRow) =>
          originalRow?.productsToTags
            ?.map((e) => e?.productTag?.name)
            .join(" "),
        footer: "Tags",
      },
      {
        header: "Actions",
        cell: ({ row: { original: product } }) => {
          return (
            <div>
              <LinkButton href={`/products/${product.id}`}>Go</LinkButton>
              <LinkButton href={`/products/${product.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(product.id)}
                disabled={isLoading && product.id === variables}
              >
                Delete
              </Button>
            </div>
          );
        },
        footer: "Actions",
      },
    ],
    [isLoading, variables, mutateAsync],
  );

  return (
    <Table
      columns={cols}
      data={data}
      showFooter
      showGlobalFilter
      showNavigation
    />
  );
};
