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

interface WarehouseTableProps {
  warehouses: RouterOutputs["warehouse"]["list"];
}

export const WarehouseTable: FC<WarehouseTableProps> = ({ warehouses }) => {
  const context = api.useContext();
  const [data] = api.warehouse.list.useSuspenseQuery(
    {},
    {
      initialData: warehouses,
    },
  );

  const { mutateAsync, isLoading, variables } =
    api.warehouse.delete.useMutation({
      async onSettled() {
        await context.warehouse.list.invalidate();
        await context.warehouse.get.invalidate();
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
        cell: ({ row: { original: warehouse } }) => {
          return (
            <div>
              <LinkButton href={`/warehouses/${warehouse.id}`}>Go</LinkButton>
              <LinkButton href={`/warehouses/${warehouse.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(warehouse.id)}
                disabled={isLoading && warehouse.id === variables}
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
