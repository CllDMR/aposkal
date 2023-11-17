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

interface AddressCompanyTableProps {
  addresses: RouterOutputs["addressCompany"]["list"];
}

export const AddressCompanyTable: FC<AddressCompanyTableProps> = ({
  addresses,
}) => {
  const context = api.useContext();
  const [data] = api.addressCompany.list.useSuspenseQuery(
    {},
    {
      initialData: addresses,
    },
  );

  const { mutateAsync, isLoading, variables } =
    api.addressCompany.delete.useMutation({
      async onSettled() {
        await context.addressCompany.list.invalidate();
        await context.addressCompany.get.invalidate();
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
        header: "City",
        cell: (row) => row.renderValue(),
        accessorKey: "city",
        footer: "City",
      },
      {
        header: "District",
        cell: (row) => row.renderValue(),
        accessorKey: "district",
        footer: "District",
      },
      {
        header: "Street",
        cell: (row) => row.renderValue(),
        accessorKey: "street",
        footer: "Street",
      },
      {
        header: "Country",
        cell: (row) => row.renderValue(),
        accessorKey: "country",
        footer: "Country",
      },
      {
        header: "State",
        cell: (row) => row.renderValue(),
        accessorKey: "state",
        footer: "State",
      },
      {
        header: "Description",
        cell: (row) => row.renderValue(),
        accessorKey: "description",
        footer: "Description",
      },
      {
        header: "LongAddressDescription",
        cell: (row) => row.renderValue(),
        accessorKey: "longAddressDescription",
        footer: "LongAddressDescription",
      },
      {
        header: "Actions",
        cell: ({ row: { original: address } }) => {
          return (
            <div>
              <LinkButton href={`/addresses/${address.id}`}>Go</LinkButton>
              <LinkButton href={`/addresses/${address.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(address.id)}
                disabled={isLoading && address.id === variables}
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
