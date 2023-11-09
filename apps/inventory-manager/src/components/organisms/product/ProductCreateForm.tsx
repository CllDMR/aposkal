"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { productCreateInput } from "@acme/api/src/inputs/product/product";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductCreateFormFields = RouterInputs["product"]["create"];

interface ProductCreateFormProps {
  productCategories: RouterOutputs["productCategory"]["list"];
  productTags: RouterOutputs["productTag"]["list"];
}

export const ProductCreateForm: FC<ProductCreateFormProps> = ({
  productCategories: initialProductCategories,
  productTags: initialProductTags,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.product.create.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
    },
  });

  const { data: productCategories } = api.productCategory.list.useQuery(
    {},
    {
      initialData: initialProductCategories,
    },
  );
  const { data: productTags } = api.productTag.list.useQuery(
    {},
    {
      initialData: initialProductTags,
    },
  );

  const formattedProductCategories =
    productCategories?.map((productCategory) => ({
      id: productCategory.id,
      label: productCategory.name,
      value: productCategory.id,
    })) ?? [];
  const formattedProductTags =
    productTags?.map((productTag) => ({
      id: productTag.id,
      label: productTag.name,
      value: productTag.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm<ProductCreateFormFields>({
    resolver: zodResolver(productCreateInput),
  });

  const { fields, append, remove } = useFieldArray({
    name: "productTagIds",
    control,
  });

  // const { productTagIds: _, ...restErrors } = errors;

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
        // errors={restErrors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="price"
        label="Price"
        name="price"
        type="number"
        autoComplete="price"
        // errors={restErrors}
        register={register}
        rules={{ valueAsNumber: true }}
      />
      <FormDropdownInput<ProductCreateFormFields>
        label="Product Category"
        name="productCategoryId"
        // errors={restErrors}
        control={control}
        options={formattedProductCategories}
      />
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="">
            <FormDropdownInput
              key={field.id}
              label="Product Tag"
              name={`productTagIds.${index}.id`}
              // errors={{ productTagIds }}
              control={control}
              options={formattedProductTags}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove Tag
            </Button>
          </div>
        );
      })}

      <Button type="button" onClick={() => append({ id: "" })}>
        Add Tag
      </Button>

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
