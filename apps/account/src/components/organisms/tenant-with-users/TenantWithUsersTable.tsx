"use client";

import type { FC } from "react";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
  users: RouterOutputs["tenant"]["getUsersOfTenant"]["users"];
  totalCount: RouterOutputs["tenant"]["getUsersOfTenant"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const TenantWithUsersTable: FC<TenantWithUsersTableProps> = ({
  users,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const utils = api.useUtils();
  const [result] = api.tenant.getUsersOfTenant.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { users, totalCount },
    },
  );

  const { mutateAsync } = api.tenant.removeUserMany.useMutation({
    async onSettled() {
      await utils.tenant.list.invalidate();
      await utils.tenant.getUsersOfTenant.invalidate();
    },
  });

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
      data={result.users}
      totalCount={result.totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
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
