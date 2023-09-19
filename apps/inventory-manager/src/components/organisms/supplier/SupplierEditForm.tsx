"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { supplierUpdateInput } from "@acme/api/src/inputs/supplier";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SupplierEditFormFields = RouterInputs["supplier"]["update"];
type Supplier = NonNullable<RouterOutputs["supplier"]["get"]>;

export const SupplierEditForm: FC<{ supplier: Supplier }> = ({
  supplier: initialSupplier,
}) => {
  const context = api.useContext();
  const [supplier] = api.supplier.get.useSuspenseQuery(
    { id: initialSupplier.id },
    { initialData: initialSupplier },
  );

  const { mutateAsync } = api.supplier.update.useMutation({
    async onSettled() {
      await context.supplier.list.invalidate();
      await context.supplier.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SupplierEditFormFields>({
    resolver: zodResolver(supplierUpdateInput),
    defaultValues: supplierUpdateInput.parse(supplier),
  });

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
        errors={errors}
        register={register}
      />
      <FormInput<SupplierEditFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Update
      </Button>
    </Form>
  );
};
