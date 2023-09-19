"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { supplierCreateInput } from "@acme/api/src/inputs/supplier";
import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type SupplierCreateFormFields = RouterInputs["supplier"]["create"];

export const SupplierCreateForm: FC = () => {
  const context = api.useContext();
  const { mutateAsync } = api.supplier.create.useMutation({
    async onSettled() {
      await context.supplier.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SupplierCreateFormFields>({
    resolver: zodResolver(supplierCreateInput),
  });

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
        errors={errors}
        register={register}
      />
      <FormInput<SupplierCreateFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />

      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
};
