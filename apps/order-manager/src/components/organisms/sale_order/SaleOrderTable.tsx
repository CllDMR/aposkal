"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { useMemo } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";
import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;
  title: string;
}

interface SaleOrderTableProps {
  saleOrders: RouterOutputs["saleOrder"]["list"];
}

export const SaleOrderTable: FC<SaleOrderTableProps> = ({ saleOrders }) => {
  const context = api.useContext();
  const [data] = api.saleOrder.list.useSuspenseQuery(
    {},
    {
      initialData: saleOrders,
    },
  );

  const { mutateAsync, isLoading, variables } = api.saleOrder.delete.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
      await context.saleOrder.get.invalidate();
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
        cell: ({ row: { original: saleOrder } }) => {
          return (
            <div>
              <LinkButton href={`/sale-orders/${saleOrder.id}`}>Go</LinkButton>
              <LinkButton href={`/sale-orders/${saleOrder.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(saleOrder.id)}
                disabled={isLoading && saleOrder.id === variables}
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
