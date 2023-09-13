"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface PostListProps {
  posts: RouterOutputs["post"]["list"];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  const context = api.useContext();
  const [data] = api.post.list.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  const { mutateAsync, isLoading } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
      await context.post.get.invalidate();
    },
  });

  return (
    <>
      {data.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>
          <LinkButton href={`/posts/${post.id}`}>Go</LinkButton>
          <LinkButton href={`/posts/${post.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(post.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
