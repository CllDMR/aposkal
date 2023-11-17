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

interface ProductTagTableProps {
  productTags: RouterOutputs["productTag"]["list"];
}

export const ProductTagTable: FC<ProductTagTableProps> = ({ productTags }) => {
  const context = api.useContext();
  const [data] = api.productTag.list.useSuspenseQuery(
    {},
    {
      initialData: productTags,
    },
  );

  const { mutateAsync, isLoading, variables } =
    api.productTag.delete.useMutation({
      async onSettled() {
        await context.productTag.list.invalidate();
        await context.productTag.get.invalidate();
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
        cell: ({ row: { original: productTag } }) => {
          return (
            <div>
              <LinkButton href={`/product-tags/${productTag.id}`}>
                Go
              </LinkButton>
              <LinkButton href={`/product-tags/${productTag.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(productTag.id)}
                disabled={isLoading && productTag.id === variables}
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

  return <Table columns={cols} data={data} />;
};
