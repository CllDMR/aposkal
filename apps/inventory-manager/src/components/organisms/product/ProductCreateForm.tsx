"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productCreateInput } from "@acme/api/src/inputs/product";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductCreateFormFields = RouterInputs["product"]["create"];

export const ProductCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.product.create.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreateFormFields>({
    resolver: zodResolver(productCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="price"
        label="Price"
        name="price"
        type="number"
        autoComplete="price"
        errors={errors}
        register={register}
        rules={{ valueAsNumber: true }}
      />

      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
};
