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
  addressId: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date | null;
  companyId: string;
  currency: string;
  startDate: Date;
  endDate: Date;
  paymentEndDate: Date;
  no: number;
  company: RouterOutputs["saleOffer"]["list"]["saleOffers"][number]["company"];
  toAddress: RouterOutputs["saleOffer"]["list"]["saleOffers"][number]["toAddress"];
}

interface SaleOfferTableProps {
  saleOffers: RouterOutputs["saleOffer"]["list"]["saleOffers"];
  totalCount: RouterOutputs["saleOffer"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const SaleOfferTable: FC<SaleOfferTableProps> = ({
  saleOffers,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const context = api.useContext();
  const [result] = api.saleOffer.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { saleOffers, totalCount },
    },
  );

  const { mutateAsync } = api.saleOffer.deleteMany.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
      await context.saleOffer.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("no", {
        header: "No",
        cell({ getValue, row: { original: saleOffer } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/sale-offers/${saleOffer.id}`}
            >
              {getValue()}
            </Link>
          );
        },
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: ({ getValue }) =>
          getValue().toLocaleDateString("TR-tr", {
            hourCycle: "h23",
          }),
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("endDate", {
        header: "End Date",
        cell: ({ getValue }) =>
          getValue().toLocaleDateString("TR-tr", {
            hourCycle: "h23",
          }),
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
      data={result.saleOffers}
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
