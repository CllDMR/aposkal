"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productCategoryUpdateInput } from "@acme/api/src/inputs/product/product_category";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductCategoryEditFormFields = RouterInputs["productCategory"]["update"];
type ProductCategory = NonNullable<RouterOutputs["productCategory"]["get"]>;

export const ProductCategoryEditForm: FC<{
  productCategory: ProductCategory;
}> = ({ productCategory: initialProductCategory }) => {
  const utils = api.useUtils();
  const [productCategory] = api.productCategory.get.useSuspenseQuery(
    { id: initialProductCategory.id },
    { initialData: initialProductCategory },
  );

  const { mutateAsync } = api.productCategory.update.useMutation({
    async onSettled() {
      await utils.productCategory.list.invalidate();
      await utils.productCategory.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductCategoryEditFormFields>({
    resolver: zodResolver(productCategoryUpdateInput),
    defaultValues: productCategoryUpdateInput.parse(productCategory),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductCategoryEditFormFields>
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
