"use client";

import type { FC } from "react";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface PostListProps {
  posts: RouterOutputs["post"]["all"];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  const [data] = api.post.all.useSuspenseQuery(
    {},
    {
      initialData: posts,
    },
  );

  return (
    <>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
};
