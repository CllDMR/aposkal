"use client";

import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "@acme/ui/organisms";

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
  const utils = api.useUtils();
  const [result] = api.tenant.getWithUsers.useSuspenseQuery(undefined, {
    initialData: tenantWithUsers,
  });

  const { mutateAsync } = api.tenant.removeUserMany.useMutation({
    async onSettled() {
      await utils.tenant.list.invalidate();
      await utils.tenant.get.invalidate();
      await utils.tenant.getWithUsers.invalidate();
    },
  });

  // const cols = useMemo<ColumnDef<TableItem>[]>(
  //   () => [
  //     {
  //       header: "Name",
  //       cell: (row) => row.renderValue(),
  //       accessorKey: "name",
  //       footer: "Name",
  //     },
  //     {
  //       header: "Actions",
  //       cell: ({ row: { original: tenantUser } }) => {
  //         return (
  //           <div>
  //             <LinkButton href={`/users/${tenantUser.id}`}>Go</LinkButton>
  //             <Button
  //               onClick={async () =>
  //                 await mutateAsync({ userId: tenantUser.id })
  //               }
  //               disabled={isLoading && tenantUser.id === variables?.userId}
  //             >
  //               Remove
  //             </Button>
  //           </div>
  //         );
  //       },
  //       footer: "Actions",
  //     },
  //   ],
  //   [isLoading, variables, mutateAsync],
  // );

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
        meta: {
          maxWidth: 200,
        },
      }),
    ] as ColumnDef<TableItem, unknown>[];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={result.usersToTenants.flatMap((a) => a.user)}
      totalCount={result.usersToTenants.flatMap((a) => a.user).length}
      optionsMatrix={[
        [
          {
            icon: (
              <svg
                className="mr-2 h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 13V16H7L16 7L13 4L4 13Z"
                  fill="#8B5CF6"
                  stroke="#C4B5FD"
                  strokeWidth="2"
                />

                <path
                  className="ui-active:hidden"
                  d="M4 13V16H7L16 7L13 4L4 13Z"
                  fill="#EDE9FE"
                  stroke="#A78BFA"
                  strokeWidth="2"
                />
              </svg>
            ),
            label: "Delete All Selected",
            onClick: async (selectedOptions) => {
              await mutateAsync(
                selectedOptions.map((selectedOption) => selectedOption.id),
              );
            },
          },
        ],
      ]}
    />
  );
};
