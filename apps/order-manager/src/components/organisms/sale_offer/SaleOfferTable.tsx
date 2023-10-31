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

  startDate: Date;
  endDate: Date;
  paymentEndDate: Date;
  no: string;
  currency: string;

  customer: RouterOutputs["saleOffer"]["list"][number]["customer"];
  toAddress: RouterOutputs["saleOffer"]["list"][number]["toAddress"];

  addressId: string;
  customerId: string;
}

interface SaleOfferTableProps {
  saleOffers: RouterOutputs["saleOffer"]["list"];
}

export const SaleOfferTable: FC<SaleOfferTableProps> = ({ saleOffers }) => {
  const context = api.useContext();
  const [data] = api.saleOffer.list.useSuspenseQuery(
    {},
    {
      initialData: saleOffers,
    },
  );

  const { mutateAsync, isLoading, variables } =
    api.saleOffer.delete.useMutation({
      async onSettled() {
        await context.saleOffer.list.invalidate();
        await context.saleOffer.get.invalidate();
      },
    });

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Start Date",
        cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
        accessorKey: "startDate",
        footer: "Start Date",
      },
      {
        header: "End Date",
        cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
        accessorKey: "endDate",
        footer: "End Date",
      },
      {
        header: "Address",
        cell: (row) => row.renderValue(),
        accessorKey: "toAddress.name",
        footer: "Address",
      },
      {
        header: "Customer",
        cell: (row) => {
          const customer = row.getValue() as TableItem["customer"];

          return `${customer.firstname} ${customer.middlename} ${customer.lastname}`;
        },
        accessorKey: "customer",
        footer: "Customer",
      },
      {
        header: "Actions",
        cell: ({ row: { original: saleOffer } }) => {
          return (
            <div>
              <LinkButton href={`/sale-offers/${saleOffer.id}`}>Go</LinkButton>
              <LinkButton href={`/sale-offers/${saleOffer.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(saleOffer.id)}
                disabled={isLoading && saleOffer.id === variables}
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
