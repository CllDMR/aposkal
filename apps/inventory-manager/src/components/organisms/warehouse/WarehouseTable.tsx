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
  title: string;
}

interface WarehouseTableProps {
  warehouses: RouterOutputs["warehouse"]["list"];
}

export const WarehouseTable: FC<WarehouseTableProps> = ({ warehouses }) => {
  const context = api.useContext();
  const [data] = api.warehouse.list.useSuspenseQuery(
    {},
    {
      initialData: warehouses,
    },
  );

  const { mutateAsync } = api.warehouse.deleteMany.useMutation({
    async onSettled() {
      await context.warehouse.list.invalidate();
      await context.warehouse.get.invalidate();
    },
  });

  const cols = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();

    return [
      columnHelper.group({
        id: "data",
        columns: [
          columnHelper.accessor("title", {
            header: "Title",
            cell({ getValue, row: { original: warehouse } }) {
              return (
                <Link href={`/warehouses/${warehouse.id}`}>{getValue()}</Link>
              );
            },
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
