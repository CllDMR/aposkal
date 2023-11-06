"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { productUpdateInput } from "@acme/api/src/inputs/product";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ProductEditFormFields = RouterInputs["product"]["update"];

interface ProductEditFormProps {
  productCategories: RouterOutputs["productCategory"]["list"];
  productTags: RouterOutputs["productTag"]["list"];
  product: NonNullable<RouterOutputs["product"]["get"]>;
}

export const ProductEditForm: FC<ProductEditFormProps> = ({
  productCategories: initialProductCategories,
  productTags: initialProductTags,
  product: initialProduct,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.product.update.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  const [product] = api.product.get.useSuspenseQuery(
    { id: initialProduct.id },
    { initialData: initialProduct },
  );

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

  const { productsToCategories, productsToTags, ...restProduct } = product;
  const productTagIds_ = productsToTags.map((productsToTag) => ({
    id: productsToTag.product_tagId,
  }));
  const productCategoryIds_ = productsToCategories.map(
    (productsToCategory) => ({
      id: productsToCategory.product_categoryId,
    }),
  );

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm<ProductEditFormFields>({
    resolver: zodResolver(productUpdateInput),
    defaultValues: productUpdateInput.parse({
      ...restProduct,
      productCategoryId: productCategoryIds_[0]!.id,
      productTagIds: productTagIds_,
    }),
  });

  const { fields, append, remove } = useFieldArray({
    name: "productTagIds",
    control,
  });

  // const { productCategoryId: _, productTagIds: __, ...restErrors } = errors;

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<ProductEditFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        // errors={restErrors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="price"
        label="Price"
        name="price"
        type="text"
        autoComplete="price"
        // errors={restErrors}
        register={register}
        rules={{ valueAsNumber: true }}
      />
      <FormDropdownInput<ProductEditFormFields>
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
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
