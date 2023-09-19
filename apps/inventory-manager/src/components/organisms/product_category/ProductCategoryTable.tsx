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

  const { mutateAsync, isLoading, variables } =
    api.productCategory.delete.useMutation({
      async onSettled() {
        await context.productCategory.list.invalidate();
        await context.productCategory.get.invalidate();
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
        header: "Actions",
        cell: ({ row: { original: productCategory } }) => {
          return (
            <div>
              <LinkButton href={`/product-categories/${productCategory.id}`}>
                Go
              </LinkButton>
              <LinkButton
                href={`/product-categories/${productCategory.id}/edit`}
              >
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(productCategory.id)}
                disabled={isLoading && productCategory.id === variables}
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
