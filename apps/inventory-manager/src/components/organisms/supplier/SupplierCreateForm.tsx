"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { supplierCreateInput } from "@acme/api/src/inputs/supplier";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";

type SupplierCreateFormFields = RouterInputs["supplier"]["create"];

interface SupplierCreateFormProps {
  products: RouterOutputs["product"]["list"]["products"];
}

export const SupplierCreateForm: FC<SupplierCreateFormProps> = ({
  products: initialProducts,
}) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.supplier.create.useMutation({
    async onSettled() {
      await utils.supplier.list.invalidate();
    },
  });

  const { data: products } = api.product.list.useQuery(
    {},
    {
      initialData: { products: initialProducts, totalCount: 0 },
    },
  );
  const formattedProducts =
    products?.products?.map((product) => ({
      id: product.id,
      label: product.name,
      value: product.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm<SupplierCreateFormFields>({
    resolver: zodResolver(supplierCreateInput),
  });

  const { fields, append, remove } = useFieldArray({
    name: "productIds",
    control,
  });

  // const { productIds: _, ...restErrors } = errors;

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<SupplierCreateFormFields>
        id="address"
        label="Address"
        name="address"
        type="text"
        autoComplete="address"
        // errors={restErrors}
        register={register}
      />
      <FormInput<SupplierCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        // errors={restErrors}
        register={register}
      />
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="">
            <FormDropdownInput
              label="Product"
              name={`productIds.${index}.id`}
              // errors={{ productTagIds }}
              control={control}
              options={formattedProducts}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove Product
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
