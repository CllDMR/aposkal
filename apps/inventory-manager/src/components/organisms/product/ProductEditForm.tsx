"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { productUpdateInput } from "@acme/api/src/inputs/product/product";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";

type ProductEditFormFields = RouterInputs["product"]["update"];

interface ProductEditFormProps {
  productCategories: RouterOutputs["productCategory"]["list"]["productCategories"];
  productTags: RouterOutputs["productTag"]["list"]["productTags"];
  product: NonNullable<RouterOutputs["product"]["get"]>;
}

export const ProductEditForm: FC<ProductEditFormProps> = ({
  productCategories: initialProductCategories,
  productTags: initialProductTags,
  product: initialProduct,
}) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.product.update.useMutation({
    async onSettled() {
      await utils.product.list.invalidate();
      await utils.product.get.invalidate();
    },
  });

  const [product] = api.product.get.useSuspenseQuery(
    { id: initialProduct.id },
    { initialData: initialProduct },
  );

  const { data: productCategories } = api.productCategory.list.useQuery(
    {},
    {
      initialData: {
        productCategories: initialProductCategories,
        totalCount: 0,
      },
    },
  );
  const { data: productTags } = api.productTag.list.useQuery(
    {},
    {
      initialData: { productTags: initialProductTags, totalCount: 0 },
    },
  );

  const formattedProductCategories =
    productCategories?.productCategories?.map((productCategory) => ({
      id: productCategory.id,
      label: productCategory.name,
      value: productCategory.id,
    })) ?? [];
  const formattedProductTags =
    productTags?.productTags?.map((productTag) => ({
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
    formState: { errors, isSubmitting },
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
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="gtipNo"
        label="Gtip No"
        name="gtipNo"
        type="text"
        autoComplete="gtipNo"
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="currency"
        label="Currency"
        name="currency"
        type="text"
        autoComplete="currency"
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="unit"
        label="Unit"
        name="unit"
        type="text"
        autoComplete="unit"
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="imageURL"
        label="Image URL"
        name="imageURL"
        type="text"
        autoComplete="imageURL"
        errors={errors}
        register={register}
      />
      <FormInput<ProductEditFormFields>
        id="unitPrice"
        label="Unit Price"
        name="unitPrice"
        type="number"
        step="0.001"
        autoComplete="unitPrice"
        errors={errors}
        register={register}
        rules={{ valueAsNumber: true }}
      />
      <FormInput<ProductEditFormFields>
        id="kdv"
        label="KDV"
        name="kdv"
        type="number"
        autoComplete="kdv"
        errors={errors}
        register={register}
        rules={{ valueAsNumber: true }}
      />
      <FormDropdownInput<ProductEditFormFields>
        label="Product Category"
        name="productCategoryId"
        errors={errors}
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
              errors={errors}
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
