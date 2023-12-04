"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "@acme/ui/organisms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

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
  company: RouterOutputs["saleOrder"]["list"][number]["company"];
  toAddress: RouterOutputs["saleOrder"]["list"][number]["toAddress"];
}

interface SaleOrderTableProps {
  saleOrders: RouterOutputs["saleOrder"]["list"];
}

export const SaleOrderTable: FC<SaleOrderTableProps> = ({ saleOrders }) => {
  const context = api.useContext();
  const [data] = api.saleOrder.list.useSuspenseQuery(
    {},
    {
      initialData: saleOrders,
    },
  );

  const { mutateAsync } = api.saleOrder.deleteMany.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
      await context.saleOrder.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.group({
        id: "data",
        columns: [
          columnHelper.accessor("id", {
            header: "Id",
            cell({ getValue, row: { original: saleOrder } }) {
              return (
                <Link href={`/sale-orders/${saleOrder.id}`}>{getValue()}</Link>
              );
            },
          }),
          columnHelper.accessor("priority", {
            header: "Priority",
          }),
          columnHelper.accessor("startdate", {
            header: "Start Date",
          }),
          columnHelper.accessor("enddate", {
            header: "End Date",
          }),
          columnHelper.accessor("companyType", {
            header: "Company Type",
          }),
          columnHelper.accessor("source", {
            header: "Source",
          }),
          columnHelper.accessor("toAddress.name", {
            header: "Address",
          }),
          columnHelper.accessor("company.title", {
            header: "Company",
          }),
        ],
      }),
    ];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={data}
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
