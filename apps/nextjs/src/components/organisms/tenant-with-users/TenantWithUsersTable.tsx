"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button, LinkButton, Table } from "@acme/ui";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
}

interface TenantWithUsersTableProps {
  tenantWithUsers: RouterOutputs["tenant"]["getWithUsers"];
}

export const TenantWithUsersTable: FC<TenantWithUsersTableProps> = ({
  tenantWithUsers,
}) => {
  const context = api.useContext();
  const [data] = api.tenant.getWithUsers.useSuspenseQuery(undefined, {
    initialData: tenantWithUsers,
  });

  const { mutateAsync, isLoading, variables } =
    api.tenant.removeUser.useMutation({
      async onSettled() {
        await context.tenant.list.invalidate();
        await context.tenant.get.invalidate();
        await context.tenant.getWithUsers.invalidate();
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
        cell: ({ row: { original: tenantUser } }) => {
          return (
            <div>
              <LinkButton href={`/users/${tenantUser.id}`}>Go</LinkButton>
              <Button
                onClick={async () =>
                  await mutateAsync({ userId: tenantUser.id })
                }
                disabled={isLoading && tenantUser.id === variables?.userId}
              >
                Remove
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
      data={data.usersToTenants.flatMap((a) => a.user)}
      showFooter
      showGlobalFilter
      showNavigation
    />
  );
};
