"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Table } from "@acme/ui/organisms";

interface TableItem {
  id: string;
  addressId: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date | null;
  companyId: string;
  priority: string;
  startdate: Date;
  enddate: Date;
  companyType: string;
  source: string;
  company: RouterOutputs["saleOrder"]["list"]["saleOrders"][number]["company"];
  toAddress: RouterOutputs["saleOrder"]["list"]["saleOrders"][number]["toAddress"];
}

interface SaleOrderTableProps {
  saleOrders: RouterOutputs["saleOrder"]["list"]["saleOrders"];
  totalCount: RouterOutputs["saleOrder"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const SaleOrderTable: FC<SaleOrderTableProps> = ({
  saleOrders,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const utils = api.useUtils();
  const [result] = api.saleOrder.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { saleOrders, totalCount },
    },
  );

  const { mutateAsync } = api.saleOrder.deleteMany.useMutation({
    async onSettled() {
      await utils.saleOrder.list.invalidate();
      await utils.saleOrder.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("id", {
        header: "Id",
        cell({ getValue, row: { original: saleOrder } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/sale-orders/${saleOrder.id}`}
            >
              {getValue()}
            </Link>
          );
        },
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("startdate", {
        header: "Start Date",
        cell: ({ getValue }) =>
          getValue().toLocaleDateString("TR-tr", {
            hourCycle: "h23",
          }),
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("enddate", {
        header: "End Date",
        cell: ({ getValue }) =>
          getValue().toLocaleDateString("TR-tr", {
            hourCycle: "h23",
          }),
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("companyType", {
        header: "Company Type",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("source", {
        header: "Source",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("toAddress.name", {
        header: "Address",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("company.title", {
        header: "Company",
        meta: {
          maxWidth: 200,
        },
      }),
    ] as ColumnDef<TableItem, unknown>[];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={result.saleOrders}
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
