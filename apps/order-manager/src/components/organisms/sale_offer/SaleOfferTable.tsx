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
  currency: string;
  startDate: Date;
  endDate: Date;
  paymentEndDate: Date;
  no: string;
  company: RouterOutputs["saleOffer"]["list"][number]["company"];
  toAddress: RouterOutputs["saleOffer"]["list"][number]["toAddress"];
}

interface SaleOfferTableProps {
  saleOffers: RouterOutputs["saleOffer"]["list"];
}

export const SaleOfferTable: FC<SaleOfferTableProps> = ({ saleOffers }) => {
  const context = api.useContext();
  const [data] = api.saleOffer.list.useSuspenseQuery(
    {},
    {
      initialData: saleOffers,
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
      columnHelper.group({
        id: "data",
        columns: [
          columnHelper.accessor("no", {
            header: "No",
            cell({ getValue, row: { original: saleOffer } }) {
              return (
                <Link href={`/sale-offers/${saleOffer.id}`}>{getValue()}</Link>
              );
            },
          }),
          columnHelper.accessor("startDate", {
            header: "Start Date",
          }),
          columnHelper.accessor("endDate", {
            header: "End Date",
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
