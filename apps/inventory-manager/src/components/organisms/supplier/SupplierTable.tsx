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
  address: string;
  name: string;
}

interface SupplierTableProps {
  suppliers: RouterOutputs["supplier"]["list"];
}

export const SupplierTable: FC<SupplierTableProps> = ({ suppliers }) => {
  const context = api.useContext();
  const [data] = api.supplier.list.useSuspenseQuery(
    {},
    {
      initialData: suppliers,
    },
  );

  const { mutateAsync, isLoading, variables } = api.supplier.delete.useMutation(
    {
      async onSettled() {
        await context.supplier.list.invalidate();
        await context.supplier.get.invalidate();
      },
    },
  );

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Address",
        cell: (row) => row.renderValue(),
        accessorKey: "address",
        footer: "Address",
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
        footer: "Name",
      },
      {
        header: "Actions",
        cell: ({ row: { original: supplier } }) => {
          return (
            <div>
              <LinkButton href={`/suppliers/${supplier.id}`}>Go</LinkButton>
              <LinkButton href={`/suppliers/${supplier.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(supplier.id)}
                disabled={isLoading && supplier.id === variables}
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
