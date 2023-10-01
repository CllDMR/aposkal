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
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  birthdate: Date;
  source: string;
  profileImage: string;
}

interface CustomerTableProps {
  customers: RouterOutputs["customer"]["list"];
}

export const CustomerTable: FC<CustomerTableProps> = ({ customers }) => {
  const context = api.useContext();
  const [data] = api.customer.list.useSuspenseQuery(
    {},
    {
      initialData: customers,
    },
  );

  const { mutateAsync, isLoading, variables } = api.customer.delete.useMutation(
    {
      async onSettled() {
        await context.customer.list.invalidate();
        await context.customer.get.invalidate();
      },
    },
  );

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
      {
        header: "Firstname",
        cell: (row) => row.renderValue(),
        accessorKey: "firstname",
        footer: "Firstname",
      },
      {
        header: "Lastname",
        cell: (row) => row.renderValue(),
        accessorKey: "lastname",
        footer: "Lastname",
      },
      {
        header: "Middlename",
        cell: (row) => row.renderValue(),
        accessorKey: "middlename",
        footer: "Middlename",
      },
      {
        header: "Gender",
        cell: (row) => row.renderValue(),
        accessorKey: "gender",
        footer: "Gender",
      },
      {
        header: "Birth Date",
        cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
        accessorKey: "birthdate",
        footer: "Birth Date",
      },
      {
        header: "Source",
        cell: (row) => row.renderValue(),
        accessorKey: "source",
        footer: "Source",
      },
      {
        header: "ProfileImage",
        cell: (row) => row.renderValue(),
        accessorKey: "profileImage",
        footer: "ProfileImage",
      },
      {
        header: "Actions",
        cell: ({ row: { original: customer } }) => {
          return (
            <div>
              <LinkButton href={`/customers/${customer.id}`}>Go</LinkButton>
              <LinkButton href={`/customers/${customer.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(customer.id)}
                disabled={isLoading && customer.id === variables}
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
