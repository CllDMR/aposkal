"use client";

import type { FC } from "react";
import Link from "next/link";

import { Button } from "~/components/molecules/button";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface PostListProps {
  posts: RouterOutputs["post"]["all"];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  const context = api.useContext();
  const [data] = api.post.all.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  const { mutateAsync } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.all.invalidate();
      await context.post.byId.invalidate();
    },
  });

  return (
    <>
      {data.map((post) => (
        <div key={post.id}>
          <span>{post.title}</span>
          <Link href={`/posts/${post.id}`}>
            <Button>Go</Button>
          </Link>
          <Link href={`/posts/${post.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={async () => await mutateAsync(post.id)}>
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
