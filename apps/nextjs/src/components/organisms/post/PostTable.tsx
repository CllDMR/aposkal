"use client";

import type { FC } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { Table } from "../table";

interface TableItem {
  title: string;
  content: string;
  isDraft: boolean;
  publishAt: Date;
}

interface PostTableProps {
  posts: RouterOutputs["post"]["all"];
}

const cols: ColumnDef<TableItem>[] = [
  {
    header: "Title",
    cell: (row) => row.renderValue(),
    accessorKey: "title",
    footer: "Title",
  },
  {
    header: "Content",
    cell: (row) => row.renderValue(),
    accessorKey: "content",
    footer: "Content",
  },
  {
    header: "IsDraft",
    cell: (row) => String(row.renderValue() as boolean),
    accessorKey: "isDraft",
    footer: "IsDraft",
  },
  {
    header: "PublishAt",
    cell: (row) => (row.renderValue() as Date).toLocaleDateString(),
    accessorKey: "publishAt",
    footer: "PublishAt",
  },
];

export const PostTable: FC<PostTableProps> = ({ posts }) => {
  const [data] = api.post.all.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  return (
    <Table
      columns={cols}
      data={data}
      showFooter
      showGlobalFilter
      showNavigation
    />
  );
};
