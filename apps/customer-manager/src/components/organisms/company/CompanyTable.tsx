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
  type: "personal" | "limited" | "anonim" | "other";
  email: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date | null;
  title: string;
  isForeign: boolean;
  taxNo: string;
  taxOffice: string;
  firmPhoneNumber: string;
  qualifiedPhoneNumber: string;
}

interface CompanyTableProps {
  companies: RouterOutputs["company"]["list"];
}

export const CompanyTable: FC<CompanyTableProps> = ({ companies }) => {
  const context = api.useContext();
  const [data] = api.company.list.useSuspenseQuery(
    {},
    {
      initialData: companies,
    },
  );

  const { mutateAsync, isLoading, variables } = api.company.delete.useMutation({
    async onSettled() {
      await context.company.list.invalidate();
      await context.company.get.invalidate();
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
        header: "Type",
        cell: (row) => row.renderValue(),
        accessorKey: "type",
        footer: "Type",
      },
      {
        header: "Is Foreign",
        cell: (row) => row.renderValue(),
        accessorKey: "isForeign",
        footer: "Is Foreign",
      },
      {
        header: "Tax No",
        cell: (row) => row.renderValue(),
        accessorKey: "taxNo",
        footer: "Tax No",
      },
      {
        header: "Tax Office",
        cell: (row) => row.renderValue(),
        accessorKey: "taxOffice",
        footer: "Tax Office",
      },
      {
        header: "Firm Phone Number",
        cell: (row) => row.renderValue(),
        accessorKey: "firmPhoneNumber",
        footer: "Firm Phone Number",
      },
      {
        header: "Qualified Phone Number",
        cell: (row) => row.renderValue(),
        accessorKey: "qualifiedPhoneNumber",
        footer: "Qualified Phone Number",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
        footer: "Email",
      },
      {
        header: "Actions",
        cell: ({ row: { original: company } }) => {
          return (
            <div>
              <LinkButton href={`/companies/${company.id}`}>Go</LinkButton>
              <LinkButton href={`/companies/${company.id}/edit`}>
                Edit
              </LinkButton>
              <Button
                onClick={async () => await mutateAsync(company.id)}
                disabled={isLoading && company.id === variables}
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
