"use client";

import type { FC } from "react";
import Link from "next/link";

import { Button } from "~/components/molecules/button";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface PostCardProps {
  initPost: RouterOutputs["post"]["get"];
  id: NonNullable<RouterOutputs["post"]["get"]>["id"];
}

export const PostCard: FC<PostCardProps> = ({ initPost, id }) => {
  const context = api.useContext();
  const [post] = api.post.get.useSuspenseQuery(
    { id },
    {
      initialData: initPost,
    },
  );

  const { mutateAsync } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
      await context.post.get.invalidate();
    },
  });

  return (
    <div>
      <span>{post.title}</span>
      <Link href={`/posts/${post.id}/edit`}>
        <Button>Edit</Button>
      </Link>
      <Button onClick={async () => await mutateAsync(post.id)}>Delete</Button>
    </div>
  );
};
