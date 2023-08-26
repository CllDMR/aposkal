"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postCreateInput } from "@acme/api/src/inputs/post";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

export const PostCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.post.create.useMutation({
    async onSettled() {
      await context.post.all.invalidate();
    },
  });

  const { handleSubmit, register } = useForm<RouterInputs["post"]["create"]>({
    resolver: zodResolver(postCreateInput),
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

      <button type="submit">Send</button>
    </form>
  );
};
