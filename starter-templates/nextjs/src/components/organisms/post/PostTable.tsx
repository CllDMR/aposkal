"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { useMemo } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";
import { Table } from "@acme/ui/organisms";

import { api } from "@acme/api-client";
import type { RouterOutputs } from "~/utils/api";

interface TableItem {
  id: string;
  title: string;
  content: string;
  isDraft: boolean;
  publishAt: Date;
}

interface PostTableProps {
  posts: RouterOutputs["post"]["list"];
}

export const PostTable: FC<PostTableProps> = ({ posts }) => {
  const context = api.useContext();
  const [data] = api.post.list.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  const { mutateAsync, isLoading, variables } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
      await context.post.get.invalidate();
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
              <LinkButton href={`/posts/${post.id}`}>Go</LinkButton>
              <LinkButton href={`/posts/${post.id}/edit`}>Edit</LinkButton>
              <Button
                onClick={async () => await mutateAsync(post.id)}
                disabled={isLoading && post.id === variables}
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

  return <Table columns={cols} data={data} />;
};
