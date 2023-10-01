"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postUpdateInput } from "@acme/api/src/inputs/post";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

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
  } = useForm<PostEditFormFields>({
    resolver: zodResolver(postUpdateInput),
    defaultValues: postUpdateInput.parse(post),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<AddressEditFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="city"
        label="City"
        name="city"
        type="text"
        autoComplete="city"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="district"
        label="District"
        name="district"
        type="text"
        autoComplete="district"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="street"
        label="Street"
        name="street"
        type="text"
        autoComplete="street"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="country"
        label="Country"
        name="country"
        type="text"
        autoComplete="country"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="state"
        label="State"
        name="state"
        type="text"
        autoComplete="state"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<AddressEditFormFields>
        id="longAddressDescription"
        label="LongAddressDescription"
        name="longAddressDescription"
        type="text"
        autoComplete="longAddressDescription"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Update
      </Button>
    </Form>
  );
};
