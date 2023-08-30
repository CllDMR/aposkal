"use client";

import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "~/components/molecules/button";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { Table } from "../table";

interface TableItem {
  id: string;
  title: string;
  content: string;
  isDraft: boolean;
  publishAt: Date;
}

interface PostTableProps {
  posts: RouterOutputs["post"]["all"];
}

export const PostTable: FC<PostTableProps> = ({ posts }) => {
  const context = api.useContext();
  const [data] = api.post.all.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  const { mutateAsync, isLoading, variables } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.all.invalidate();
      await context.post.byId.invalidate();
    },
  });

  const cols = useMemo<ColumnDef<TableItem>[]>(
    () => [
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
      {
        header: "Actions",
        cell: ({ row: { original: post } }) => {
          return (
            <div>
              <Link href={`/posts/${post.id}`}>
                <Button>Go</Button>
              </Link>
              <Link href={`/posts/${post.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Button
                disabled={isLoading && post.id === variables}
                onClick={async () => await mutateAsync(post.id)}
              >
                Delete
              </Button>
            </div>
          );
        },
        footer: "Actions",
      },
    ],
    [isLoading, variables, mutateAsync],
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