"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "@acme/api-client";
import { productTagCreateInput } from "@acme/api/src/inputs/product/product_tag";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";

type ProductTagCreateFormFields = RouterInputs["productTag"]["create"];

export const ProductTagCreateForm: FC = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.productTag.create.useMutation({
    async onSettled() {
      await utils.productTag.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductTagCreateFormFields>({
    resolver: zodResolver(productTagCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductTagCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
