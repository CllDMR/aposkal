"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { postCreateInput } from "@acme/api/src/inputs/post";
import { Form } from "@acme/ui/atoms";
import {
    Button,
    FormCheckbox,
    FormDateInput,
    FormInput,
} from "@acme/ui/molecules";

import { api } from "@acme/api-client";
import type { RouterInputs } from "~/utils/api";

type PostCreateFormFields = RouterInputs["post"]["create"];

export const PostCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.post.create.useMutation({
    async onSettled() {
      await context.post.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PostCreateFormFields>({
    resolver: zodResolver(postCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<PostCreateFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />

      <FormInput<PostCreateFormFields>
        id="content"
        label="Content"
        name="content"
        type="text"
        autoComplete="content"
        errors={errors}
        register={register}
      />

      <FormCheckbox<PostCreateFormFields>
        id="isDraft"
        label="Is Draft"
        name="isDraft"
        errors={errors}
        register={register}
      />

      <FormDateInput<PostCreateFormFields>
        id="publishAt"
        label="Publish At"
        name="publishAt"
        control={control}
        errors={errors}
      />

      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
};
