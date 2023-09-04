"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "~/components/molecules/button";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { Table } from "../table";

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
              <Link href={`/users/${tenantUser.id}`}>
                <Button>Go</Button>
              </Link>
              <Button
                disabled={isLoading && tenantUser.id === variables?.userId}
                onClick={async () =>
                  await mutateAsync({ userId: tenantUser.id })
                }
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
