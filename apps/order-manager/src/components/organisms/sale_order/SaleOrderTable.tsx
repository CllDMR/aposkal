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

  priority: string;
  startdate: Date;
  enddate: Date;
  companyType: string;
  source: string;

  company: RouterOutputs["saleOrder"]["list"][number]["company"];
  toAddress: RouterOutputs["saleOrder"]["list"][number]["toAddress"];

  addressId: string;
  companyId: string;
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

  const { mutateAsync, isLoading, variables } =
    api.saleOrder.delete.useMutation({
      async onSettled() {
        await context.saleOrder.list.invalidate();
        await context.saleOrder.get.invalidate();
      },
    });

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Priority",
        cell: (row) => row.renderValue(),
        accessorKey: "priority",
        footer: "Priority",
      },
      {
        header: "Start Date",
        cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
        accessorKey: "startdate",
        footer: "Start Date",
      },
      {
        header: "End Date",
        cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
        accessorKey: "enddate",
        footer: "End Date",
      },
      {
        header: "Company Type",
        cell: (row) => row.renderValue(),
        accessorKey: "companyType",
        footer: "Company Type",
      },
      {
        header: "Source",
        cell: (row) => row.renderValue(),
        accessorKey: "source",
        footer: "Source",
      },
      {
        header: "Address",
        cell: (row) => row.renderValue(),
        accessorKey: "toAddress.name",
        footer: "Address",
      },
      {
        header: "Company",
        cell: (row) => {
          const company = row.getValue() as TableItem["company"];

          return company.title;
        },
        accessorKey: "company",
        footer: "Company",
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
