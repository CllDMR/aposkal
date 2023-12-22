"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface TableItem {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date | null;
  city: string;
  district: string;
  street: string;
  country: string;
  state: string | null;
  longAddressDescription: string | null;
}

interface AddressTenantTableProps {
  addressTenants: RouterOutputs["addressTenant"]["list"]["addressTenants"];
  totalCount: RouterOutputs["addressTenant"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const AddressTenantTable: FC<AddressTenantTableProps> = ({
  addressTenants,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const context = api.useContext();
  const [result] = api.addressTenant.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { addressTenants, totalCount },
    },
  );

  const { mutateAsync } = api.addressTenant.deleteMany.useMutation({
    async onSettled() {
      await context.addressTenant.list.invalidate();
      await context.addressTenant.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
        cell({ getValue, row: { original: address } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/address-tenants/${address.id}`}
            >
              {getValue()}
            </Link>
          );
        },
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("city", {
        header: "City",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("district", {
        header: "District",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("street", {
        header: "Street",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("country", {
        header: "Country",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("state", {
        header: "State",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("description", {
        header: "Description",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("longAddressDescription", {
        header: "LongAddressDescription",
        meta: {
          maxWidth: 200,
        },
      }),
    ] as ColumnDef<TableItem, unknown>[];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={result.addressTenants}
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
