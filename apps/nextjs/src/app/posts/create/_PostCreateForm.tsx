"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { insertPostSchema } from "@acme/db/schema/post";

import { api } from "~/utils/api";

interface PostCreateFormProps {}

export const PostCreateForm: FC<PostCreateFormProps> = () => {
  const context = api.useContext();
  const { mutateAsync } = api.post.create.useMutation({
    async onSettled() {
      await context.post.all.invalidate();
    },
  });

  const { handleSubmit, register } = useForm<z.infer<typeof insertPostSchema>>({
    resolver: zodResolver(insertPostSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" {...register("title")} />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <input type="text" {...register("content")} />
      </div>

      <div>
        <label htmlFor="authorId">AuthorId</label>
        <input type="text" {...register("authorId")} />
      </div>

      <div>
        <label htmlFor="ownerId">OwnerId</label>
        <input type="text" {...register("ownerId")} />
      </div>

      <button type="submit">Send</button>
    </form>
  );
};
