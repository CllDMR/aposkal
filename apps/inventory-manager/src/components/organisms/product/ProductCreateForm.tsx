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
  productCategories: RouterOutputs["productCategory"]["list"]["productCategories"];
  productTags: RouterOutputs["productTag"]["list"]["productTags"];
}

export const ProductCreateForm: FC<ProductCreateFormProps> = ({
  productCategories: initialProductCategories,
  productTags: initialProductTags,
}) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.product.create.useMutation({
    async onSettled() {
      await utils.product.list.invalidate();
    },
  });

  const {
    data: { productCategories },
  } = api.productCategory.list.useQuery(
    {},
    {
      initialData: {
        productCategories: initialProductCategories,
        totalCount: 0,
      },
    },
  );
  const {
    data: { productTags },
  } = api.productTag.list.useQuery(
    {},
    {
      initialData: {
        productTags: initialProductTags,
        totalCount: 0,
      },
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
    formState: { errors, isSubmitting },
    control,
  } = useForm<ProductCreateFormFields>({
    resolver: zodResolver(productCreateInput),
  });

  const { fields, append, remove } = useFieldArray({
    name: "productTagIds",
    control,
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
        id="gtipNo"
        label="Gtip No"
        name="gtipNo"
        type="text"
        autoComplete="gtipNo"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="currency"
        label="Currency"
        name="currency"
        type="text"
        autoComplete="currency"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="unit"
        label="Unit"
        name="unit"
        type="text"
        autoComplete="unit"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
        id="imageURL"
        label="Image URL"
        name="imageURL"
        type="text"
        autoComplete="imageURL"
        errors={errors}
        register={register}
      />
      <FormInput<ProductCreateFormFields>
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
      <FormInput<ProductCreateFormFields>
        id="kdv"
        label="KDV"
        name="kdv"
        type="number"
        autoComplete="kdv"
        errors={errors}
        register={register}
        rules={{ valueAsNumber: true }}
      />
      <FormDropdownInput<ProductCreateFormFields>
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
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
