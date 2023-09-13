"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productUpdateInput } from "@acme/api/src/inputs/product";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductEditFormFields = RouterInputs["product"]["update"];
type Product = NonNullable<RouterOutputs["product"]["get"]>;

export const ProductEditForm: FC<{ product: Product }> = ({
  product: initialProduct,
}) => {
  const context = api.useContext();
  const [product] = api.product.get.useSuspenseQuery(
    { id: initialProduct.id },
    { initialData: initialProduct },
  );

  const { mutateAsync } = api.product.update.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductEditFormFields>({
    resolver: zodResolver(productUpdateInput),
    defaultValues: productUpdateInput.parse(product),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductEditFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Update
      </Button>
    </Form>
  );
};
