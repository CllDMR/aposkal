"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postCreateInput } from "@acme/api/src/inputs/post";

import { Form } from "~/components/atoms/form/form";
import { FormCheckbox } from "~/components/molecules/form/form-checkbox";
import { FormDate } from "~/components/molecules/form/form-date";
import { FormInput } from "~/components/molecules/form/form-input";
import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type PostCreateFormFields = RouterInputs["post"]["create"];

export const PostCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.post.create.useMutation({
    async onSettled() {
      await context.post.all.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
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

      <FormDate<PostCreateFormFields>
        id="publishAt"
        label="Publish At"
        name="publishAt"
        control={control}
        errors={errors}
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Giriş
      </button>
    </Form>
  );
};
