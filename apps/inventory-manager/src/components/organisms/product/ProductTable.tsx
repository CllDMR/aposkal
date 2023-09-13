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
  title: string;
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
        header: "Title",
        cell: (row) => row.renderValue(),
        accessorKey: "title",
        footer: "Title",
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
