"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import { api } from "@acme/api-client";
import type { RouterOutputs } from "@acme/api";

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

  const { mutateAsync, isLoading } = api.post.delete.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
      await context.post.get.invalidate();
    },
  });

  return (
    <div>
      <span>{post.title}</span>
      <LinkButton href={`/posts/${post.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(post.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
