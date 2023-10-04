"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productTagUpdateInput } from "@acme/api/src/inputs/product_tag";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductTagEditFormFields = RouterInputs["productTag"]["update"];
type ProductTag = NonNullable<RouterOutputs["productTag"]["get"]>;

export const ProductTagEditForm: FC<{ productTag: ProductTag }> = ({
  productTag: initialProductTag,
}) => {
  const context = api.useContext();
  const [productTag] = api.productTag.get.useSuspenseQuery(
    { id: initialProductTag.id },
    { initialData: initialProductTag },
  );

  const { mutateAsync } = api.productTag.update.useMutation({
    async onSettled() {
      await context.productTag.list.invalidate();
      await context.productTag.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductTagEditFormFields>({
    resolver: zodResolver(productTagUpdateInput),
    defaultValues: productTagUpdateInput.parse(productTag),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductTagEditFormFields>
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
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
