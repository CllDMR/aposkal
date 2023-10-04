"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postUpdateInput } from "@acme/api/src/inputs/post";
import { Form, FormBottom } from "@acme/ui/atoms";
import {
  Button,
  FormCheckbox,
  FormDateInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type PostEditFormFields = RouterInputs["post"]["update"];
type Post = NonNullable<RouterOutputs["post"]["get"]>;

export const PostEditForm: FC<{ post: Post }> = ({ post: initialPost }) => {
  const context = api.useContext();
  const [post] = api.post.get.useSuspenseQuery(
    { id: initialPost.id },
    { initialData: initialPost },
  );

  const { mutateAsync } = api.post.update.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
      await context.post.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PostEditFormFields>({
    resolver: zodResolver(postUpdateInput),
    defaultValues: postUpdateInput.parse(post),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<PostEditFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />

      <FormInput<PostEditFormFields>
        id="content"
        label="Content"
        name="content"
        type="text"
        autoComplete="content"
        errors={errors}
        register={register}
      />

      <FormCheckbox<PostEditFormFields>
        id="isDraft"
        label="Is Draft"
        name="isDraft"
        errors={errors}
        register={register}
      />

      <FormDateInput<PostEditFormFields>
        id="publishAt"
        label="Publish At"
        name="publishAt"
        control={control}
        errors={errors}
      />

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
