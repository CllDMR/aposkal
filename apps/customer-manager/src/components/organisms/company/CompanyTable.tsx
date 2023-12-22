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
  companies: RouterOutputs["company"]["list"]["companies"];
  totalCount: RouterOutputs["company"]["list"]["totalCount"];
  pageSize?: number;
  pageIndex?: number;
}

export const CompanyTable: FC<CompanyTableProps> = ({
  companies,
  totalCount,
  pageIndex: _pageIndex = 0,
  pageSize: _pageSize = 10,
}) => {
  const searchParams = useSearchParams()!;
  const pageIndex = +(searchParams.get("pi") ?? _pageIndex);
  const pageSize = +(searchParams.get("ps") ?? _pageSize);

  const context = api.useContext();
  const [result] = api.company.list.useSuspenseQuery(
    {
      offset: pageIndex * pageSize,
      limit: pageSize,
    },
    {
      initialData: { companies, totalCount },
    },
  );

  const { mutateAsync } = api.company.deleteMany.useMutation({
    async onSettled() {
      await context.company.list.invalidate();
      await context.company.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.accessor("title", {
        header: "Title",
        cell({ getValue, row: { original: company } }) {
          return (
            <Link
              className="underline hover:text-gray-500"
              href={`/companies/${company.id}`}
            >
              {getValue()}
            </Link>
          );
        },
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("type", {
        header: "Type",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("isForeign", {
        header: "Is Foreign",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("taxNo", {
        header: "Tax No",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("taxOffice", {
        header: "Tax Office",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("firmPhoneNumber", {
        header: "Firm Phone Number",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("qualifiedPhoneNumber", {
        header: "Qualified Phone Number",
        meta: {
          maxWidth: 200,
        },
      }),
      columnHelper.accessor("email", {
        header: "Email",
        meta: {
          maxWidth: 200,
        },
      }),
    ] as ColumnDef<TableItem, unknown>[];
  }, []);

  return (
    <Table<TableItem>
      columns={cols}
      data={result.companies}
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
