"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { supplierUpdateInput } from "@acme/api/src/inputs/supplier";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormDropdownInput, FormInput } from "@acme/ui/molecules";

type SupplierEditFormFields = RouterInputs["supplier"]["update"];
type Supplier = NonNullable<RouterOutputs["supplier"]["get"]>;

export const SupplierEditForm: FC<{ supplier: Supplier }> = ({
  supplier: initialSupplier,
}) => {
  const utils = api.useUtils();
  const [supplier] = api.supplier.get.useSuspenseQuery(
    { id: initialSupplier.id },
    { initialData: initialSupplier },
  );

  const { mutateAsync } = api.supplier.update.useMutation({
    async onSettled() {
      await utils.supplier.list.invalidate();
      await utils.supplier.get.invalidate();
    },
  });

  const { data: products } = api.product.list.useQuery({});
  const formattedProducts =
    products?.products?.map((product) => ({
      id: product.id,
      label: product.name,
      value: product.id,
    })) ?? [];

  const { productsToSuppliers, ...restSupplier } = supplier;
  const productIds_ = productsToSuppliers.map((productsToSupplier) => ({
    id: productsToSupplier.productId,
  }));

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm<SupplierEditFormFields>({
    resolver: zodResolver(supplierUpdateInput),
    defaultValues: supplierUpdateInput.parse({
      ...restSupplier,
      productIds: productIds_,
    }),
  });

  const { fields, append, remove } = useFieldArray({
    name: "productIds",
    control,
  });

  // const { productIds: _, ...restErrors } = errors;

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<SupplierEditFormFields>
        id="address"
        label="Address"
        name="address"
        type="text"
        autoComplete="address"
        // errors={restErrors}
        register={register}
      />
      <FormInput<SupplierEditFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
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
        Add Product
      </Button>

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};
