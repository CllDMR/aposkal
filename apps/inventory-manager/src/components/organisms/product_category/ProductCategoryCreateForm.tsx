"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { api } from "@acme/api-client";
import { productCategoryCreateInput } from "@acme/api/src/inputs/product/product_category";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

type ProductCategoryCreateFormFields =
  RouterInputs["productCategory"]["create"];

export const ProductCategoryCreateForm: FC = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.productCategory.create.useMutation({
    async onSettled() {
      await utils.productCategory.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductCategoryCreateFormFields>({
    resolver: zodResolver(productCategoryCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductCategoryCreateFormFields>
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
